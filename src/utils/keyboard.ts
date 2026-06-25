type KeyHandler = (e: KeyboardEvent) => void

const handlers: Array<{ keys: string; handler: KeyHandler; global: boolean }> = []

export function onKey(keys: string, handler: KeyHandler, global = true) {
  handlers.push({ keys, handler, global })
}

export function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    const key = [
      e.ctrlKey || e.metaKey ? 'Ctrl' : '',
      e.shiftKey ? 'Shift' : '',
      e.altKey ? 'Alt' : '',
      e.key,
    ].filter(Boolean).join('+')

    for (const h of handlers) {
      if (h.keys === key) {
        h.handler(e)
        return
      }
    }
  })
}
