import { el } from '../../utils/dom'
import type { Site } from '../../types'

interface TagCount { tag: string; count: number }

export function TagCloud(sites: Site[], maxTags = 30): HTMLElement {
  const counts = new Map<string, number>()
  sites.forEach(s => s.tags.forEach(t => counts.set(t, (counts.get(t) || 0) + 1)))
  const sorted = Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, maxTags)

  const maxCount = sorted[0]?.count || 1

  const cloud = el('div', { class: 'tag-cloud' })
  sorted.forEach(({ tag, count }) => {
    const size = 0.8 + (count / maxCount) * 0.7
    const item = el('span', {
      class: 'tag tag-cloud-item',
      style: `font-size:${size}rem;`,
      title: `${tag} (${count} sites)`,
    }, `${tag} (${count})`)
    cloud.appendChild(item)
  })

  return cloud
}
