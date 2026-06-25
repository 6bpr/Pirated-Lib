export function relativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = Date.now()
  const diff = now - date.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 30) return `${days}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function cleanUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export function domainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? `1 ${singular}` : `${count} ${plural || singular + 's'}`
}

export function shortDesc(desc: string, maxLen = 120): string {
  if (desc.length <= maxLen) return desc
  return desc.slice(0, maxLen).replace(/\s+\S*$/, '') + '…'
}

export function faviconUrl(url: string): string {
  const domain = domainFromUrl(url)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

export function preloadFavicons(urls: string[]) {
  const fn = () => {
    for (let i = 0; i < urls.length; i += 10) {
      setTimeout(() => {
        const batch = urls.slice(i, i + 10)
        batch.forEach(url => {
          const img = new Image()
          img.src = faviconUrl(url)
        })
      }, i * 50)
    }
  }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(fn)
  } else {
    setTimeout(fn, 500)
  }
}
