import { el } from '../utils/dom'
import { icon } from '../utils/icons'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { navigate } from '../utils/router'
import type { Site, HistoryEntry } from '../types'

export function HistoryPage(
  sites: Site[],
  history: HistoryEntry[],
  onClear: () => void,
): HTMLElement {
  const page = el('div', {})

  page.appendChild(Breadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'History' },
  ]))

  const header = el('div', { class: 'favorites-header' })
  header.appendChild(el('h1', { style: 'font-size:var(--text-2xl);font-weight:700;' }, 'Recently Visited'))
  if (history.length > 0) {
    const clearBtn = el('button', { class: 'btn btn-secondary' }, 'Clear All')
    clearBtn.addEventListener('click', onClear)
    header.appendChild(clearBtn)
  }
  page.appendChild(header)

  if (history.length === 0) {
    const empty = el('div', { class: 'empty-state' })
    empty.innerHTML = `<div class="icon">${icon('clock', 32)}</div>`
    empty.appendChild(el('div', { class: 'empty-state-title' }, 'No browsing history'))
    empty.appendChild(el('div', { class: 'empty-state-desc' }, 'Sites you visit will appear here. History is stored locally and never sent anywhere.'))
    page.appendChild(empty)
    return page
  }

  const sorted = [...history].sort((a, b) => b.visitedAt - a.visitedAt)

  const now = Date.now()
  const groups: Record<string, HistoryEntry[]> = { Today: [], Yesterday: [], 'This Week': [], Earlier: [] }

  sorted.forEach(entry => {
    const diff = now - entry.visitedAt
    if (diff < 86400000) groups['Today'].push(entry)
    else if (diff < 172800000) groups['Yesterday'].push(entry)
    else if (diff < 604800000) groups['This Week'].push(entry)
    else groups['Earlier'].push(entry)
  })

  Object.entries(groups).forEach(([label, entries]) => {
    if (entries.length === 0) return
    const section = el('div', { class: 'history-group' })
    section.appendChild(el('div', { class: 'history-group-title' }, `${label} (${entries.length})`))

    const list = el('div', { class: 'site-list' })
    entries.forEach(entry => {
      const site = sites.find(s => s.id === entry.siteId)
      if (!site) return
      const item = el('div', { class: 'site-list-item', tabindex: '0', role: 'button' })
      const info = el('div', { class: 'site-list-info' })
      info.appendChild(el('div', { class: 'site-list-name' }, site.name))
      const timeAgo = formatTimeAgo(entry.visitedAt)
      info.appendChild(el('div', { class: 'site-list-desc' }, `${timeAgo} · ${entry.count} visit${entry.count !== 1 ? 's' : ''}`))
      item.appendChild(info)
      item.addEventListener('click', () => navigate(`/site?id=${site.id}`))
      list.appendChild(item)
    })
    section.appendChild(list)
    page.appendChild(section)
  })

  return page
}

function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}
