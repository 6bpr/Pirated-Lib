import { el } from '../../utils/dom'
import { navigate, basePath } from '../../utils/router'

interface Crumb { label: string; href?: string; onClick?: () => void }

export function Breadcrumbs(crumbs: Crumb[]): HTMLElement {
  const container = el('nav', { class: 'breadcrumbs', 'aria-label': 'Breadcrumb' })
  crumbs.forEach((crumb, i) => {
    if (i > 0) container.appendChild(el('span', { class: 'breadcrumb-sep', 'aria-hidden': 'true' }, '/'))
    const resolvedHref = crumb.href ? basePath(crumb.href) : '#'
    const item = el('a', {
      class: `breadcrumb-item${i === crumbs.length - 1 ? ' current' : ''}`,
      href: resolvedHref,
      'aria-current': i === crumbs.length - 1 ? 'page' : undefined,
    }, crumb.label)
    const clickHandler = crumb.onClick || (crumb.href ? () => navigate(crumb.href!) : undefined)
    if (clickHandler) {
      item.addEventListener('click', (e) => { e.preventDefault(); clickHandler() })
    }
    container.appendChild(item)
  })
  return container
}
