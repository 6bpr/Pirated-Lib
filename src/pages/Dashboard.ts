import { el } from '../utils/dom'
import { icon } from '../utils/icons'
import { StatCard } from '../components/stats/StatCard'
import { TagCloud } from '../components/stats/TagCloud'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { pluralize, relativeTime } from '../utils/format'
import type { Site, Category } from '../types'

export function DashboardPage(sites: Site[], categories: Category[], recentIds?: Set<string>): HTMLElement {
  const page = el('div', {})

  page.appendChild(Breadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'Dashboard' },
  ]))

  const pageTitle = el('h1', { style: 'font-size:var(--text-2xl);font-weight:700;margin-bottom:var(--space-6);' })
  pageTitle.innerHTML = `${icon('barChart3', 24)} Dashboard`
  page.appendChild(pageTitle)

  const online = sites.filter(s => s.status === 'online').length
  const offline = sites.filter(s => s.status === 'offline').length
  const uniqueTags = new Set(sites.flatMap(s => s.tags)).size
  const totalPct = sites.length > 0 ? Math.round((online / sites.length) * 100) : 0

  const stats = el('div', { class: 'stats-grid' })
  stats.appendChild(StatCard(sites.length, 'Total Sites'))
  stats.appendChild(StatCard(categories.length, 'Categories'))
  stats.appendChild(StatCard(uniqueTags, 'Unique Tags'))
  stats.appendChild(StatCard(`${totalPct}%`, 'Sites Online'))
  page.appendChild(stats)

  const healthSection = el('div', { class: 'dashboard-section' })
  healthSection.appendChild(el('h2', { class: 'dashboard-section-title' }, 'Health Overview'))
  const healthChart = el('div', { class: 'bar-chart' })
  const maxHealth = Math.max(online, offline, 1)
  const healthData = [
    { label: 'Online', count: online, color: 'var(--success)' },
    { label: 'Offline', count: offline, color: 'var(--danger)' },
  ]
  healthData.forEach(d => {
    const row = el('div', { class: 'bar-row' })
    const label = el('span', { class: 'bar-label' })
    label.innerHTML = `${icon('circle', 10)} ${d.label}`
    row.appendChild(label)
    const track = el('div', { class: 'bar-track' })
    const fill = el('div', { class: 'bar-fill', style: `width:${(d.count / maxHealth) * 100}%;background:${d.color};` })
    track.appendChild(fill)
    row.appendChild(track)
    row.appendChild(el('span', { class: 'bar-value' }, String(d.count)))
    healthChart.appendChild(row)
  })
  healthSection.appendChild(healthChart)
  page.appendChild(healthSection)

  const catSection = el('div', { class: 'dashboard-section' })
  catSection.appendChild(el('h2', { class: 'dashboard-section-title' }, 'Sites per Category'))
  const catChart = el('div', { class: 'bar-chart' })
  const maxCat = Math.max(...categories.map(c => sites.filter(s => s.category === c.id).length), 1)
  categories.forEach(cat => {
    const count = sites.filter(s => s.category === cat.id).length
    const row = el('div', { class: 'bar-row' })
    row.appendChild(el('span', { class: 'bar-label' }, cat.name))
    const track = el('div', { class: 'bar-track' })
    const fill = el('div', { class: 'bar-fill', style: `width:${(count / maxCat) * 100}%;background:var(--accent);` })
    track.appendChild(fill)
    row.appendChild(track)
    row.appendChild(el('span', { class: 'bar-value' }, String(count)))
    catChart.appendChild(row)
  })
  catSection.appendChild(catChart)
  page.appendChild(catSection)

  const tagSection = el('div', { class: 'dashboard-section' })
  tagSection.appendChild(el('h2', { class: 'dashboard-section-title' }, 'Tag Cloud'))
  tagSection.appendChild(TagCloud(sites))
  page.appendChild(tagSection)

  const recentSection = el('div', { class: 'dashboard-section' })
  recentSection.appendChild(el('h2', { class: 'dashboard-section-title' }, 'Recently Updated'))
  const recent = [...sites].sort((a, b) => {
    const aChanged = recentIds?.has(a.id) ?? false
    const bChanged = recentIds?.has(b.id) ?? false
    if (aChanged !== bChanged) return aChanged ? -1 : 1
    return b.updatedAt.localeCompare(a.updatedAt)
  }).slice(0, 5)
  const recentList = el('div', { style: 'display:flex;flex-direction:column;gap:var(--space-2);' })
  recent.forEach(s => {
    recentList.appendChild(el('div', { style: 'font-size:var(--text-sm);display:flex;justify-content:space-between;gap:var(--space-2);flex-wrap:wrap;' },
      el('span', { style: 'font-weight:500;word-break:break-word;overflow-wrap:break-word;' }, s.name),
      el('span', { style: 'color:var(--text-muted);flex-shrink:0;' }, relativeTime(s.updatedAt)),
    ))
  })
  recentSection.appendChild(recentList)
  page.appendChild(recentSection)

  return page
}
