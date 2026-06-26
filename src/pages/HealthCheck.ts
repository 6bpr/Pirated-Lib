import { el } from '../utils/dom'

export function HealthCheckPage(
  online: number,
  offline: number,
  checked: number,
  total: number,
  onSkip?: () => void,
): HTMLElement {
  const page = el('div', { class: 'healthcheck-page', style: `
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    min-height:70vh;padding:2rem;text-align:center;
  ` })

  const pct = total > 0 ? Math.round((checked / total) * 100) : 0

  const title = el('h2', { style: 'font-size:var(--text-xl);font-weight:700;margin-bottom:0.5rem;' },
    checked < total ? 'Checking listed websites health…' : 'Health check complete!'
  )
  page.appendChild(title)

  const sub = el('p', { style: 'color:var(--text-dim);margin-bottom:1.5rem;' },
    checked < total
      ? `Checking ${total} sites for availability…`
      : `All ${total} sites have been checked.`
  )
  page.appendChild(sub)

  const barOuter = el('div', { style: `
    width:100%;max-width:400px;height:8px;border-radius:4px;
    background:var(--border);overflow:hidden;margin-bottom:1rem;
  ` })
  const barInner = el('div', { style: `
    width:${pct}%;height:100%;border-radius:4px;
    background:var(--accent);transition:width 0.3s ease;
  ` })
  barOuter.appendChild(barInner)
  page.appendChild(barOuter)

  const countText = el('div', { style: 'font-size:var(--text-sm);color:var(--text-dim);margin-bottom:1rem;' },
    `${checked} / ${total} checked`
  )
  page.appendChild(countText)

  const statusRow = el('div', { style: `
    display:flex;gap:2rem;justify-content:center;font-size:var(--text-base);font-weight:600;
  ` })
  statusRow.appendChild(el('span', { style: 'color:#56d364;' }, `Online: ${online}`))
  statusRow.appendChild(el('span', { style: 'color:#f4717e;' }, `Offline: ${offline}`))
  page.appendChild(statusRow)

  const infoBox = el('div', { style: `
    margin-top:2rem;max-width:480px;padding:1rem 1.25rem;
    background:var(--surface);border:1px solid var(--border);
    border-radius:var(--radius-lg);font-size:var(--text-sm);
    color:var(--text-dim);line-height:1.6;
  ` })
  infoBox.innerHTML = `
    <strong style="color:var(--text);">Why is this needed?</strong><br>
    Each listed website is probed to determine whether it is currently reachable.
    Without this check, the online / offline indicators shown throughout the site
    may be inaccurate or stale.
  `
  page.appendChild(infoBox)

  if (onSkip && checked < total) {
    const skipBtn = el('button', {
      style: `
        margin-top:1.25rem;padding:0.5rem 1.5rem;cursor:pointer;
        background:transparent;border:1px solid var(--border);
        border-radius:var(--radius);color:var(--text-dim);
        font-size:var(--text-sm);transition:all 0.15s;
      `,
      class: 'healthcheck-skip',
    }, 'Skip health check & proceed')
    skipBtn.addEventListener('mouseenter', () => { skipBtn.style.borderColor = 'var(--text-dim)'; skipBtn.style.color = 'var(--text)' })
    skipBtn.addEventListener('mouseleave', () => { skipBtn.style.borderColor = 'var(--border)'; skipBtn.style.color = 'var(--text-dim)' })
    skipBtn.addEventListener('click', () => onSkip())
    page.appendChild(skipBtn)
  }

  return page
}
