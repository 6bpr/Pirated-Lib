import Fuse, { type FuseResult } from 'fuse.js'
import type { Site } from '../types'

let fuse: Fuse<Site> | null = null

export function initSearch(sites: Site[]) {
  fuse = new Fuse(sites, {
    keys: [
      { name: 'name', weight: 3 },
      { name: 'description', weight: 1 },
      { name: 'tags', weight: 2 },
      { name: 'category', weight: 1.5 },
      { name: 'subcategory', weight: 1.5 },
    ],
    threshold: 0.4,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
  })
}

export function search(query: string, limit = 20): FuseResult<Site>[] {
  if (!fuse || !query.trim()) return []
  return fuse.search(query, { limit })
}

export interface MatchData {
  indices: ReadonlyArray<[number, number]>
  key?: string
}

export function highlightMatches(text: string, matches?: ReadonlyArray<MatchData>): string {
  if (!matches || !matches.length) return escapeHtml(text)

  const allIndices: Array<[number, number]> = []
  matches.forEach(m => {
    m.indices.forEach(idx => {
      if (!allIndices.some(ex => ex[0] <= idx[0] && ex[1] >= idx[1])) {
        allIndices.push([...idx])
      }
    })
  })

  allIndices.sort((a, b) => a[0] - b[0])

  let result = ''
  let lastEnd = 0
  const escaped = escapeHtml(text)

  for (const [start, end] of allIndices) {
    result += escaped.slice(lastEnd, start)
    result += '<mark>' + escaped.slice(start, end + 1) + '</mark>'
    lastEnd = end + 1
  }
  result += escaped.slice(lastEnd)
  return result
}

function escapeHtml(str: string): string {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}
