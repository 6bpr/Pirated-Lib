import { el, render } from '../../utils/dom'
import { navigate } from '../../utils/router'
import { icon } from '../../utils/icons'
import type { Category, Site, FilterState } from '../../types'

export function Sidebar(
  categories: Category[],
  sites: Site[],
  filters: FilterState,
  onFilterChange: (filters: FilterState) => void,
  onClose?: () => void,
): HTMLElement {
  const aside = el('aside', { class: 'sidebar', role: 'complementary' })

  const allSection = el('div', { class: 'sidebar-section' })
  const allBtn = el('button', {
    class: `sidebar-item${!filters.category ? ' active' : ''}`,
  })
  allBtn.innerHTML = `${icon('folder')} <span>All Sites</span>`
  const allCount = el('span', { class: 'sidebar-count' }, String(sites.length))
  allBtn.appendChild(allCount)
  allBtn.addEventListener('click', () => {
    onFilterChange({ ...filters, category: null, subcategory: null })
    onClose?.()
  })
  allSection.appendChild(allBtn)

  const browseLabel = el('span', { class: 'sidebar-label' }, 'Categories')
  allSection.insertBefore(browseLabel, allBtn)
  aside.appendChild(allSection)

  categories.forEach(cat => {
    const section = el('div', { class: 'sidebar-section' })
    const catBtn = el('button', {
      class: `sidebar-item${filters.category === cat.id ? ' active' : ''}`,
    })
    catBtn.innerHTML = `${icon('chevronRight')} <span>${cat.name}</span>`
    const count = sites.filter(s => s.category === cat.id).length
    catBtn.appendChild(el('span', { class: 'sidebar-count' }, String(count)))
    catBtn.addEventListener('click', () => {
      onFilterChange({ ...filters, category: cat.id, subcategory: null })
      onClose?.()
    })
    section.appendChild(catBtn)

    if (filters.category === cat.id) {
      cat.subcategories.forEach(sub => {
        const subBtn = el('button', {
          class: `sidebar-item${filters.subcategory === sub.id ? ' active' : ''}`,
          style: 'padding-left: 36px; font-size: var(--text-xs);',
        })
        subBtn.innerHTML = `<span>${sub.name}</span>`
        const subCount = sites.filter(s => s.subcategory === sub.id).length
        subBtn.appendChild(el('span', { class: 'sidebar-count' }, String(subCount)))
        subBtn.addEventListener('click', () => {
          onFilterChange({ ...filters, subcategory: sub.id })
          onClose?.()
        })
        section.appendChild(subBtn)
      })
    }

    aside.appendChild(section)
  })

  return aside
}
