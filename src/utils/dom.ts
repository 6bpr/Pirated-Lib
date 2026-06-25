export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Record<string, string | boolean | number | undefined>,
  ...children: (string | Node)[]
): HTMLElementTagNameMap[K] {
  const elem = document.createElement(tag)
  if (attrs) {
    for (const [key, val] of Object.entries(attrs)) {
      if (val === undefined || val === false) continue
      if (typeof val === 'boolean') {
        if (val) elem.setAttribute(key, '')
      } else {
        elem.setAttribute(key, String(val))
      }
    }
  }
  for (const child of children) {
    if (typeof child === 'string') {
      elem.appendChild(document.createTextNode(child))
    } else {
      elem.appendChild(child)
    }
  }
  return elem
}

export function render(container: HTMLElement, ...nodes: (Node | HTMLElement)[]) {
  container.replaceChildren(...nodes)
}

export function qs<K extends keyof HTMLElementTagNameMap>(sel: string, parent?: ParentNode): HTMLElementTagNameMap[K] | null {
  return (parent || document).querySelector(sel) as HTMLElementTagNameMap[K] | null
}

export function qsa<K extends keyof HTMLElementTagNameMap>(sel: string, parent?: ParentNode): NodeListOf<HTMLElementTagNameMap[K]> {
  return (parent || document).querySelectorAll(sel) as NodeListOf<HTMLElementTagNameMap[K]>
}
