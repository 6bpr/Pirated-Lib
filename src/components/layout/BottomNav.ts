import { el } from '../../utils/dom'
import { navigate } from '../../utils/router'
import { icon } from '../../utils/icons'
import type { PageName } from '../../types'

export function BottomNav(currentPage: PageName): HTMLElement {
  const nav = el('nav', { class: 'bottom-nav', role: 'navigation' })

  const items: Array<{ id: PageName; icon: string; label: string; path: string }> = [
    { id: 'home', icon: icon('home'), label: 'Home', path: '/' },
    { id: 'browse', icon: icon('search'), label: 'Browse', path: '/browse' },
    { id: 'favorites', icon: icon('star'), label: 'Favs', path: '/favorites' },
    { id: 'dashboard', icon: icon('barChart3'), label: 'Stats', path: '/dashboard' },
    { id: 'about', icon: icon('info'), label: 'About', path: '/about' },
  ]

  items.forEach(item => {
    const a = el('a', {
      class: `bottom-nav-link${currentPage === item.id ? ' active' : ''}`,
      href: item.path,
    })
    a.innerHTML = `<span class="icon">${item.icon}</span>${item.label}`
    a.addEventListener('click', (e) => { e.preventDefault(); navigate(item.path) })
    nav.appendChild(a)
  })

  return nav
}
