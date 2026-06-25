import { el } from '../../utils/dom'

export function Tag(text: string, accent = false): HTMLElement {
  return el('span', { class: `tag${accent ? ' accent' : ''}` }, text)
}
