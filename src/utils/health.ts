import type { SiteStatus } from '../types'



const CONCURRENCY = 20
const PROBE_TIMEOUT = 10000
const MAX_RETRIES = 1

async function probe(url: string): Promise<SiteStatus> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 1000))

    const methods: RequestInit['method'][] = ['HEAD', 'GET']
    for (const method of methods) {
      const c = new AbortController()
      const t = setTimeout(() => c.abort(), PROBE_TIMEOUT)
      try {
        await fetch(url, {
          method,
          mode: 'no-cors',
          signal: c.signal,
          cache: 'no-store',
          redirect: 'follow',
        })
        clearTimeout(t)
        return 'online'
      } catch {
        clearTimeout(t)
      }
    }
  }
  return 'offline'
}

export interface HealthResult {
  url: string
  status: SiteStatus
}

export function checkAllSites(
  urls: string[],
  onProgress: (checked: number, total: number, result: HealthResult) => void,
  onComplete: (results: HealthResult[]) => void,
): void {
  const total = urls.length
  const results: HealthResult[] = []
  let checked = 0
  let idx = 0

  function runNext(): Promise<void> {
    if (idx >= total) return Promise.resolve()
    const url = urls[idx++]
    return probe(url).then(status => {
      const r: HealthResult = { url, status }
      results.push(r)
      checked++
      onProgress(checked, total, r)
      if (checked % 10 === 0) {
        return new Promise(r => setTimeout(r, 0))
      }
    }).catch(() => {
      const r: HealthResult = { url, status: 'offline' }
      results.push(r)
      checked++
      onProgress(checked, total, r)
    }).then(runNext)
  }

  const workers = Array.from({ length: Math.min(CONCURRENCY, total) }, () => runNext())
  Promise.allSettled(workers).then(() => onComplete(results))
}
