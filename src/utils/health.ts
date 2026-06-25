import type { SiteStatus } from '../types'
import { DEFAULT_STATE, loadState, saveHealthCache } from './storage'

const HEALTH_TTL = 30 * 60 * 1000
const CONCURRENCY = 6

async function probe(url: string, { timeoutMs = 4000, maxRetries = 2 } = {}): Promise<SiteStatus> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 800 * attempt))
    const controller = new AbortController()
    const tid = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, {
        method: 'HEAD',
        mode: 'cors',
        signal: controller.signal,
        cache: 'no-store',
        redirect: 'follow',
      })
      if (res.status >= 200 && res.status < 400) return 'online'
      try {
        await fetch(url, { method: 'HEAD', mode: 'no-cors', signal: controller.signal, cache: 'no-store', redirect: 'follow' })
        return 'online'
      } catch {}
    } catch {
      try {
        await fetch(url, { method: 'HEAD', mode: 'no-cors', signal: controller.signal, cache: 'no-store', redirect: 'follow' })
        return 'online'
      } catch {}
    } finally {
      clearTimeout(tid)
    }
  }
  return 'down'
}

export function runHealth(urls: string[], onUpdate: (url: string, status: SiteStatus) => void) {
  const cache = loadState().healthCache
  const now = Date.now()
  const pending: string[] = []

  urls.forEach(url => {
    const cached = cache[url]
    if (cached && now - cached.checkedAt < HEALTH_TTL) {
      onUpdate(url, cached.status)
    } else {
      pending.push(url)
    }
  })

  if (pending.length === 0) return

  let idx = 0
  function runNext(): Promise<void> {
    if (idx >= pending.length) return Promise.resolve()
    const url = pending[idx++]
    return probe(url).then(result => {
      cache[url] = { status: result, checkedAt: Date.now() }
      onUpdate(url, result)
    }).catch(() => {
      cache[url] = { status: 'down', checkedAt: Date.now() }
      onUpdate(url, 'down')
    }).then(runNext)
  }

  const workers = Array.from({ length: Math.min(CONCURRENCY, pending.length) }, () => runNext())
  Promise.allSettled(workers).then(() => {
    saveHealthCache(cache)
  })
}
