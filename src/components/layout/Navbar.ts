import { el } from '../../utils/dom'
import { navigate, basePath } from '../../utils/router'
import { icon } from '../../utils/icons'
import type { PageName } from '../../types'

export interface NavbarCallbacks {
  onSearchOpen: () => void
  onThemeToggle: () => void
  onSettingsOpen?: () => void
  onSidebarToggle?: () => void
}

export function Navbar(currentPage: PageName, theme: 'dark' | 'light', callbacks: NavbarCallbacks): HTMLElement {
  const nav = el('nav', { class: 'navbar', role: 'navigation' })

  const logo = el('span', { class: 'navbar-logo' })
  const favImg = el('img', { src: basePath('/favicon_io/favicon.svg'), class: 'navbar-favicon', alt: '', width: '24', height: '24' })
  logo.appendChild(favImg)
  logo.appendChild(document.createTextNode(' Piralib'))
  const tag = el('span', { class: 'navbar-tag' }, 'v2')
  logo.appendChild(tag)
  logo.addEventListener('click', () => navigate('/'))
  nav.appendChild(logo)

  const links = el('div', { class: 'navbar-links' })
  const navPages: Array<{ id: PageName; label: string; icon: string; path: string }> = [
    { id: 'home', label: 'Home', icon: icon('home'), path: '/' },
    { id: 'browse', label: 'Browse', icon: icon('search'), path: '/browse' },
    { id: 'dashboard', label: 'Dashboard', icon: icon('barChart3'), path: '/dashboard' },
    { id: 'about', label: 'About', icon: icon('info'), path: '/about' },
  ]
  navPages.forEach(p => {
    const a = el('a', {
      class: `navbar-link${currentPage === p.id ? ' active' : ''}`,
      href: basePath(p.path),
    })
    a.innerHTML = `<span class="icon">${p.icon}</span> ${p.label}`
    a.addEventListener('click', (e) => {
      e.preventDefault()
      navigate(p.path)
    })
    links.appendChild(a)
  })
  nav.appendChild(links)

  const navMenu = el('div', { class: 'navbar-menu hide-desktop' })

  const burgerBtn = el('button', { class: 'navbar-hamburger', 'aria-label': 'Navigation menu', 'aria-expanded': 'false' })
  burgerBtn.innerHTML = `<span class="hamburger-container"><span class="hamburger-top"></span><span class="hamburger-middle"></span><span class="hamburger-bottom"></span></span>`

  const dropdown = el('div', { class: 'navbar-dropdown' })
  const statusItems: Array<{ label: string; status: string; icon: string }> = [
    { label: 'Online', status: 'online', icon: icon('circle', 12) },
    { label: 'Offline', status: 'offline', icon: icon('circle', 12) },
  ]
  statusItems.forEach(s => {
    const a = el('a', {
      class: 'navbar-dropdown-link',
      href: basePath(`/browse?status=${s.status}`),
    })
    a.innerHTML = `<span class="icon">${s.icon}</span>${s.label}`
    a.addEventListener('click', (e) => {
      e.preventDefault()
      navigate(`/browse?status=${s.status}`)
      burgerBtn.classList.remove('active')
      burgerBtn.setAttribute('aria-expanded', 'false')
      dropdown.classList.remove('open')
    })
    dropdown.appendChild(a)
  })

  burgerBtn.addEventListener('click', () => {
    const isOpen = dropdown.classList.toggle('open')
    burgerBtn.classList.toggle('active', isOpen)
    burgerBtn.setAttribute('aria-expanded', String(isOpen))
  })

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target as Node)) {
      dropdown.classList.remove('open')
      burgerBtn.classList.remove('active')
      burgerBtn.setAttribute('aria-expanded', 'false')
    }
  }, { capture: true })

  navMenu.appendChild(burgerBtn)
  navMenu.appendChild(dropdown)
  nav.appendChild(navMenu)

  nav.appendChild(el('div', { class: 'navbar-spacer' }))

  const actions = el('div', { class: 'navbar-actions' })

  const searchBtn = el('button', { class: 'navbar-search-btn' })
  searchBtn.innerHTML = `${icon('search')} Search`
  searchBtn.appendChild(el('kbd', {}, 'Ctrl+K'))
  searchBtn.addEventListener('click', () => callbacks.onSearchOpen())
  actions.appendChild(searchBtn)

  const themeBtn = el('button', { class: 'navbar-btn-icon', title: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` })
  themeBtn.innerHTML = theme === 'dark' ? icon('sun') : icon('moon')
  themeBtn.addEventListener('click', () => callbacks.onThemeToggle())
  actions.appendChild(themeBtn)

  const settingsBtn = el('button', { class: 'navbar-btn-icon', title: 'Settings' })
  settingsBtn.innerHTML = icon('settings')
  settingsBtn.addEventListener('click', () => callbacks.onSettingsOpen?.())
  actions.appendChild(settingsBtn)

  const githubBtn = el('a', { class: 'navbar-btn-icon', href: 'https://github.com/6bpr/Pirated-Lib', target: '_blank', rel: 'noopener', title: 'GitHub' })
  githubBtn.innerHTML = icon('github')
  actions.appendChild(githubBtn)

  const favBtn = el('button', { class: 'navbar-btn-icon', title: 'Favorites' })
  favBtn.innerHTML = icon('star')
  favBtn.addEventListener('click', () => navigate('/favorites'))
  actions.appendChild(favBtn)

  if (callbacks.onSidebarToggle) {
    const sidebarBtn = el('button', { class: 'navbar-btn-icon hide-desktop', title: 'Toggle sidebar' })
    sidebarBtn.innerHTML = icon('menu')
    sidebarBtn.addEventListener('click', () => callbacks.onSidebarToggle!())
    nav.insertBefore(sidebarBtn, logo)
  }

  nav.appendChild(actions)
  return nav
}
