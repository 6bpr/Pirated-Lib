import { el } from '../utils/dom'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import type { Site, Category } from '../types'

export function AboutPage(sites: Site[], categories: Category[]): HTMLElement {
  const page = el('div', {})

  page.appendChild(Breadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'About' },
  ]))

  const content = el('div', { class: 'about-content' })

  content.appendChild(el('h1', { style: 'font-size:var(--text-2xl);font-weight:700;margin-bottom:var(--space-4);' }, 'About Piralib'))

  const sections = [
    {
      title: 'What is this?',
      body: `Piralib is a curated index of the best anime resources on the internet. Every site is hand-picked, reviewed, and maintained by enthusiasts. Think of it as an archive and discovery hub — not a search engine, but a vetted collection.`,
    },
    {
      title: 'How are sites curated?',
      body: `Every site is manually reviewed before listing. Criteria include: reliable uptime, active maintenance, genuine utility, and community reputation. Sites that go permanently offline or degrade significantly are removed.`,
    },
    {
      title: 'Technical details',
      body: [
        `Built with Vite + TypeScript. All data is static JSON. No backend, no database, no authentication, no user accounts.`,
        `Search powered by Fuse.js (client-side fuzzy search).`,
        `User preferences (favorites, history, notes) stored in localStorage — never sent to any server.`,
        `Hosted on GitHub Pages.`,
      ].join('\n'),
    },
    {
      title: 'Current status',
      body: `${sites.length} curated sites across ${categories.length} categories. Maintained by a single developer.`,
    },
    {
      title: 'Contributing',
      body: `To suggest a site, report a broken link, or contribute: open an issue or pull request on GitHub.`,
    },
  ]

  sections.forEach(s => {
    const section = el('div', { style: 'margin-bottom:var(--space-6);' })
    section.appendChild(el('h2', { style: 'font-size:var(--text-lg);font-weight:600;margin-bottom:var(--space-2);' }, s.title))
    const p = el('p', { style: 'color:var(--text-secondary);line-height:1.6;white-space:pre-line;' }, s.body)
    section.appendChild(p)
    content.appendChild(section)
  })

  page.appendChild(content)
  return page
}
