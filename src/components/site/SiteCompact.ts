import { el } from '../../utils/dom'
import { Tag } from '../ui/Tag'
import { navigate } from '../../utils/router'
import { faviconUrl } from '../../utils/format'
import type { Site } from '../../types'

export function SiteCompact(site: Site): HTMLElement {
  const row = el('div', { class: 'site-compact', tabindex: '0', role: 'button', style: 'cursor:pointer' })

  const logo = el('img', { class: 'site-compact-logo', src: faviconUrl(site.url), alt: '', width: '32', height: '32', loading: 'lazy' })
  row.appendChild(logo)
  row.appendChild(el('span', { class: 'site-compact-name' }, site.name))

  const tags = el('span', { class: 'site-compact-tags' })
  site.tags.slice(0, 5).forEach(t => tags.appendChild(Tag(t)))
  row.appendChild(tags)

  row.addEventListener('click', () => navigate(`/site?id=${site.id}`))
  row.addEventListener('keydown', (e) => { if (e.key === 'Enter') navigate(`/site?id=${site.id}`) })

  return row
}
