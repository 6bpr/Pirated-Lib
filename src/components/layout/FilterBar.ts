import { el } from '../../utils/dom'
import { icon } from '../../utils/icons'
import type { FilterState, SortOption, SiteStatus, Category } from '../../types'

export function FilterBar(
  filters: FilterState,
  onFilterChange: (filters: FilterState) => void,
  onViewChange: (view: 'grid' | 'list' | 'compact') => void,
  currentView: 'grid' | 'list' | 'compact',
  categories: Category[] = [],
): HTMLElement {
  const bar = el('div', { class: 'filter-bar' })

  const catMap = new Map(categories.map(c => [c.id, c.name]))
  const subcatMap = new Map(categories.flatMap(c => c.subcategories.map(s => [s.id, s.name])))

  const viewBtns = el('div', { class: 'filter-bar-group', style: 'display:flex;gap:var(--space-1);' })
  const views: Array<{ id: 'grid' | 'list' | 'compact'; label: string }> = [
    { id: 'grid', label: icon('grid3x3') },
    { id: 'list', label: icon('list') },
    { id: 'compact', label: icon('columns') },
  ]
  views.forEach(v => {
    const btn = el('button', {
      class: `filter-pill${currentView === v.id ? ' active' : ''}`,
      title: `${v.id} view`,
    })
    btn.innerHTML = v.label
    btn.addEventListener('click', () => onViewChange(v.id))
    viewBtns.appendChild(btn)
  })
  bar.appendChild(viewBtns)

  const sortSelect = el('select', { class: 'filter-select' }) as HTMLSelectElement
  const sortOptions: Array<{ value: SortOption; label: string }> = [
    { value: 'name-asc', label: 'Name ↑' },
    { value: 'name-desc', label: 'Name ↓' },
    { value: 'added', label: 'Recently Added' },
    { value: 'updated', label: 'Recently Updated' },
    { value: 'status', label: 'Status' },
  ]
  sortOptions.forEach(opt => {
    const option = el('option', { value: opt.value }, opt.label) as HTMLOptionElement
    if (opt.value === filters.sort) option.selected = true
    sortSelect.appendChild(option)
  })
  sortSelect.addEventListener('change', () => {
    onFilterChange({ ...filters, sort: sortSelect.value as SortOption })
  })
  bar.appendChild(sortSelect)

  if (filters.status !== 'all') {
    const pill = el('span', { class: 'filter-pill active' })
    pill.innerHTML = `${statusLabel(filters.status)} ${icon('x')}`
    pill.addEventListener('click', () => onFilterChange({ ...filters, status: 'all' }))
    bar.appendChild(pill)
  }

  if (filters.subcategory) {
    const subName = subcatMap.get(filters.subcategory) || filters.subcategory
    const pill = el('span', { class: 'filter-pill active' })
    pill.innerHTML = `${subName} ${icon('x')}`
    pill.addEventListener('click', () => onFilterChange({ ...filters, category: null, subcategory: null }))
    bar.appendChild(pill)
  } else if (filters.category) {
    const pill = el('span', { class: 'filter-pill active' })
    pill.innerHTML = `${catMap.get(filters.category) || filters.category} ${icon('x')}`
    pill.addEventListener('click', () => onFilterChange({ ...filters, category: null, subcategory: null }))
    bar.appendChild(pill)
  }

  return bar
}

function statusLabel(s: SiteStatus | 'all'): string {
  const map: Record<string, string> = { all: 'All', online: 'Online', offline: 'Offline' }
  return map[s] || s
}
