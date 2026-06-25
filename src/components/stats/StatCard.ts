import { el } from '../../utils/dom'

export function StatCard(value: string | number, label: string): HTMLElement {
  const card = el('div', { class: 'stat-card' })
  card.appendChild(el('div', { class: 'stat-value' }, String(value)))
  card.appendChild(el('div', { class: 'stat-label' }, label))
  return card
}
