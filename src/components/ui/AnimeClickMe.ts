import { el } from '../../utils/dom'
import { icon } from '../../utils/icons'

interface Slide {
  img: string
  title: string
  github: string
  website: string
}

const slides: Slide[] = [
  {
    img: '/anime-wiki.png',
    title: 'Anime Wiki',
    github: 'https://github.com/Prawaldev/anime-wiki',
    website: 'https://Prawaldev.github.io/anime-wiki',
  },
  {
    img: '/portfolio.png',
    title: 'Portfolio',
    github: 'https://github.com/Prawaldev/Portfolio',
    website: 'https://Prawaldev.github.io/Portfolio/',
  },
]

function createPopup(): HTMLElement {
  const overlay = el('div', { class: 'anime-popup-overlay' })
  let currentSlide = 0

  const modal = el('div', { class: 'anime-popup animate-scale-in' })

  const closeBtn = el('button', { class: 'anime-popup-close', title: 'Close' })
  closeBtn.innerHTML = icon('x', 20)
  closeBtn.addEventListener('click', () => {
    overlay.remove()
    document.body.style.overflow = ''
  })
  modal.appendChild(closeBtn)

  const header = el('h2', { class: 'anime-popup-header' })
  header.innerHTML = '🌸 Check out my other sites!'
  modal.appendChild(header)

  const imageWrap = el('div', { class: 'anime-popup-image-wrap' })
  const img = el('img', { class: 'anime-popup-image', src: slides[0].img, alt: slides[0].title }) as HTMLImageElement
  imageWrap.appendChild(img)

  const prevBtn = el('button', { class: 'anime-popup-nav-btn nav-prev' })
  prevBtn.innerHTML = icon('arrowLeft', 22)
  const nextBtn = el('button', { class: 'anime-popup-nav-btn nav-next' })
  nextBtn.innerHTML = icon('arrowRight', 22)
  imageWrap.appendChild(prevBtn)
  imageWrap.appendChild(nextBtn)
  modal.appendChild(imageWrap)

  const dots = el('div', { class: 'anime-popup-dots' })
  slides.forEach((_, i) => {
    const dot = el('button', { class: `anime-popup-dot${i === 0 ? ' active' : ''}` })
    dot.addEventListener('click', () => goToSlide(i))
    dots.appendChild(dot)
  })
  modal.appendChild(dots)

  const actions = el('div', { class: 'anime-popup-actions' })
  const githubBtn = el('a', { class: 'btn btn-secondary', href: slides[0].github, target: '_blank', rel: 'noopener' })
  githubBtn.innerHTML = `${icon('github', 16)} View GitHub`
  const websiteBtn = el('a', { class: 'btn btn-primary', href: slides[0].website, target: '_blank', rel: 'noopener' })
  websiteBtn.innerHTML = `${icon('externalLink', 16)} View Website`
  actions.appendChild(githubBtn)
  actions.appendChild(websiteBtn)
  modal.appendChild(actions)

  function updateSlide(index: number) {
    currentSlide = index
    img.src = slides[index].img
    img.alt = slides[index].title
    githubBtn.href = slides[index].github
    websiteBtn.href = slides[index].website

    const allDots = dots.querySelectorAll('.anime-popup-dot')
    allDots.forEach((d, i) => d.classList.toggle('active', i === index))
  }

  function goToSlide(index: number) {
    if (index < 0) index = slides.length - 1
    if (index >= slides.length) index = 0
    updateSlide(index)
  }

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1))
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1))

  overlay.appendChild(modal)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove()
      document.body.style.overflow = ''
    }
  })

  document.addEventListener('keydown', function handler(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      overlay.remove()
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handler)
    }
  })

  return overlay
}

export function AnimeClickMe(): HTMLElement {
  const box = el('div', { class: 'anime-clickme-box animate-fade-in' })
  box.innerHTML = `
    <span class="anime-clickme-icon">🎀</span>
    <span class="anime-clickme-text">Click Me!</span>
    <span class="anime-clickme-sparkle">✨</span>
  `
  box.addEventListener('click', () => {
    const popup = createPopup()
    document.body.appendChild(popup)
    document.body.style.overflow = 'hidden'
  })
  return box
}
