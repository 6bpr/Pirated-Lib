import { el } from '../../utils/dom'
import { icon } from '../../utils/icons'
import { Tag } from '../ui/Tag'
import { shortDesc, faviconUrl } from '../../utils/format'
import { navigate } from '../../utils/router'
import type { Site } from '../../types'

export function SiteCard(site: Site, isFav: boolean): HTMLElement {
  const card = el('article', { class: 'site-card', role: 'article' })

  const logo = el('img', { class: 'site-card-logo', src: faviconUrl(site.url), alt: '', width: '40', height: '40', loading: 'lazy' })

  const body = el('div', { class: 'site-card-body' })

  const header = el('div', { class: 'site-card-header' })
  header.appendChild(logo)
  const name = el('span', { class: 'site-card-name' }, site.name)
  header.appendChild(name)
  if (isFav) {
    const starEl = el('span', { style: 'color:var(--accent);display:inline-flex;' })
    starEl.innerHTML = icon('starFilled')
    header.appendChild(starEl)
  }
  body.appendChild(header)

  const desc = el('p', { class: 'site-card-desc' }, shortDesc(site.description))
  body.appendChild(desc)

  const tags = el('div', { class: 'site-card-tags' })
  site.tags.slice(0, 4).forEach(t => tags.appendChild(Tag(t)))
  if (site.tags.length > 4) {
    tags.appendChild(Tag(`+${site.tags.length - 4}`, false))
  }
  body.appendChild(tags)

  card.appendChild(body)

  card.addEventListener('click', () => navigate(`/site?id=${site.id}`))
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') navigate(`/site?id=${site.id}`)
  })
  card.setAttribute('tabindex', '0')
  card.setAttribute('aria-label', `View details for ${site.name}`)

  return card
}
