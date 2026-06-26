import { el } from '../../utils/dom'

export function Footer(siteCount: number): HTMLElement {
  const footer = el('footer', { class: 'footer' })
  const left = el('span', {}, `Piralib · ${siteCount} curated sites`)
  const links = el('div', { class: 'footer-links' })
  const linkData = [
    { label: 'GitHub', href: 'https://github.com/6bpr/Pirated-Lib' },
  ]
  linkData.forEach(l => {
    const a = el('a', { href: l.href, target: '_blank', rel: 'noopener' }, l.label)
    links.appendChild(a)
  })
  footer.appendChild(left)
  footer.appendChild(links)
  return footer
}
