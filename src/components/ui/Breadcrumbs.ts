import { el } from '../../utils/dom'
import { navigate } from '../../utils/router'

interface Crumb { label: string; href?: string; onClick?: () => void }

export function Breadcrumbs(crumbs: Crumb[]): HTMLElement {
  const container = el('nav', { class: 'breadcrumbs', 'aria-label': 'Breadcrumb' })
  crumbs.forEach((crumb, i) => {
    if (i > 0) container.appendChild(el('span', { class: 'breadcrumb-sep', 'aria-hidden': 'true' }, '/'))
    const item = el('a', {
      class: `breadcrumb-item${i === crumbs.length - 1 ? ' current' : ''}`,
      href: crumb.href || '#',
      'aria-current': i === crumbs.length - 1 ? 'page' : undefined,
    }, crumb.label)
    if (crumb.onClick) {
      item.addEventListener('click', (e) => { e.preventDefault(); crumb.onClick!() })
    }
    container.appendChild(item)
  })
  return container
}
