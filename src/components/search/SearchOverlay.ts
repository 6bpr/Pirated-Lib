import { el, qs } from '../../utils/dom'
import { icon } from '../../utils/icons'
import { Tag } from '../ui/Tag'
import { search, highlightMatches, type MatchData } from '../../utils/search'
import { navigate } from '../../utils/router'
import { cleanUrl } from '../../utils/format'
import type { Site } from '../../types'

export function SearchOverlay(
  sites: Site[],
  recentSearches: string[],
  onClose: () => void,
  onSearch: (query: string) => void,
): HTMLElement {
  const overlay = el('div', { class: 'search-overlay', role: 'dialog', 'aria-label': 'Search sites' })
  const modal = el('div', { class: 'search-modal' })

  const inputWrap = el('div', { class: 'search-input-wrap' })
  inputWrap.innerHTML = icon('search')
  const input = el('input', {
    class: 'search-input',
    type: 'text',
    name: 'search-overlay',
    placeholder: 'Search sites, categories, tags…',
    autofocus: '',
  }) as HTMLInputElement
  inputWrap.appendChild(input)
  inputWrap.appendChild(el('span', { class: 'search-shortcut' }, 'Esc'))
  modal.appendChild(inputWrap)

  const resultsContainer = el('div', { class: 'search-results' })
  modal.appendChild(resultsContainer)

  const footer = el('div', { class: 'search-footer' })
  footer.innerHTML = `
    <span class="search-footer-hint"><kbd>↑↓</kbd> navigate</span>
    <span class="search-footer-hint"><kbd>Enter</kbd> select</span>
    <span class="search-footer-hint"><kbd>Esc</kbd> close</span>
  `
  modal.appendChild(footer)

  let focusedIdx = -1

  function renderRecent() {
    resultsContainer.innerHTML = ''
    if (recentSearches.length > 0) {
      const recentDiv = el('div', { class: 'search-recent' })
      recentDiv.appendChild(el('div', { style: 'font-size:var(--text-xs);color:var(--text-muted);margin-bottom:var(--space-2);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;' }, 'Recent Searches'))
      recentSearches.forEach(s => {
        const item = el('div', { class: 'recent-search-item' })
        item.innerHTML = `${icon('clock')} ${s}`
        item.addEventListener('click', () => {
          input.value = s
          renderResults(s)
        })
        recentDiv.appendChild(item)
      })
      resultsContainer.appendChild(recentDiv)
    } else {
      resultsContainer.innerHTML = '<div class="search-empty">Type to search across 134+ sites</div>'
    }
  }

  function renderResults(query: string) {
    const results = search(query)
    onSearch(query)

    if (results.length === 0) {
      resultsContainer.innerHTML = `<div class="search-empty">No results for "${query}"</div>`
      focusedIdx = -1
      return
    }

    resultsContainer.innerHTML = ''
    focusedIdx = -1

    const groups: Record<string, Array<{ item: Site; result: typeof results[0] }>> = {}
    results.forEach(r => {
      const cat = r.item.category
      if (!groups[cat]) groups[cat] = []
      groups[cat].push({ item: r.item, result: r })
    })

    let globalIdx = 0
    Object.entries(groups).forEach(([cat, items]) => {
      const label = el('div', { class: 'search-group-label' }, `${cat} (${items.length})`)
      resultsContainer.appendChild(label)

      items.forEach(({ item, result }) => {
        const row = el('div', { class: 'search-result-item', 'data-index': String(globalIdx) })

        const resultIcon = el('div', { class: 'search-result-icon' })
        resultIcon.innerHTML = icon('search')
        row.appendChild(resultIcon)

        const info = el('div', { class: 'search-result-info' })
        const nameHtml = highlightMatches(item.name, result.matches?.filter((m: MatchData) => m.key === 'name'))
        info.innerHTML = `<div class="search-result-name">${nameHtml}</div>`

        const descMatches = result.matches?.filter((m: MatchData) => m.key === 'description')
        const descHtml = highlightMatches(item.shortDescription, descMatches)
        info.innerHTML += `<div class="search-result-desc">${descHtml}</div>`
        row.appendChild(info)

        const meta = el('div', { class: 'search-result-meta' })
        meta.appendChild(Tag(cat))
        row.appendChild(meta)

        row.addEventListener('click', () => {
          onClose()
          navigate(`/site?id=${item.id}`)
        })

        resultsContainer.appendChild(row)
        globalIdx++
      })
    })
  }

  input.addEventListener('input', () => {
    const val = input.value.trim()
    if (val) renderResults(val)
    else renderRecent()
  })

  input.addEventListener('keydown', (e) => {
    const items = resultsContainer.querySelectorAll('.search-result-item')
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      focusedIdx = Math.min(focusedIdx + 1, items.length - 1)
      items.forEach((el, i) => el.classList.toggle('focused', i === focusedIdx))
      items[focusedIdx]?.scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      focusedIdx = Math.max(focusedIdx - 1, 0)
      items.forEach((el, i) => el.classList.toggle('focused', i === focusedIdx))
      items[focusedIdx]?.scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'Enter' && focusedIdx >= 0 && items[focusedIdx]) {
      (items[focusedIdx] as HTMLElement).click()
    } else if (e.key === 'Escape') {
      onClose()
    }
  })

  renderRecent()

  setTimeout(() => input.focus(), 50)

  overlay.appendChild(modal)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) onClose()
  })

  return overlay
}
