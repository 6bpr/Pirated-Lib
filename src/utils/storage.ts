import type { AppState, FilterState, HistoryEntry, HealthEntry, SortOption, SiteStatus } from '../types'

const PREFIX = 'piralib-'

function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function set(key: string, value: unknown) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {}
}

export const DEFAULT_FILTERS: FilterState = {
  category: null,
  subcategory: null,
  tags: [],
  status: 'all',
  sort: 'name-asc',
  query: '',
}

export const DEFAULT_STATE: AppState = {
  theme: 'dark',
  view: 'grid',
  filters: { ...DEFAULT_FILTERS },
  favorites: [],
  history: [],
  recentSearches: [],
  siteNotes: {},
  healthCache: {},
  sidebarOpen: true,
  accentColor: 'amber',
  blurEnabled: true,
  parallaxEnabled: true,
}

export function loadState(): AppState {
  return {
    theme: get<'dark' | 'light'>('theme', DEFAULT_STATE.theme),
    view: get<'grid' | 'list' | 'compact'>('view', DEFAULT_STATE.view),
    filters: { ...DEFAULT_FILTERS },
    favorites: get<string[]>('favorites', []),
    history: get<HistoryEntry[]>('history', []),
    recentSearches: get<string[]>('recent-searches', []),
    siteNotes: get<Record<string, string>>('site-notes', {}),
    healthCache: get<Record<string, HealthEntry>>('health-cache', {}),
    sidebarOpen: get<boolean>('sidebar-open', true),
    accentColor: get<string>('accent-color', 'amber'),
    blurEnabled: get<boolean>('blur-enabled', true),
    parallaxEnabled: get<boolean>('parallax-enabled', true),
  }
}

export function saveTheme(theme: 'dark' | 'light') {
  set('theme', theme)
}

export function saveView(view: 'grid' | 'list' | 'compact') {
  set('view', view)
}

export function saveFavorites(ids: string[]) {
  set('favorites', ids)
}

export function saveHistory(entries: HistoryEntry[]) {
  set('history', entries)
}

export function saveRecentSearches(searches: string[]) {
  set('recent-searches', searches)
}

export function saveSiteNotes(notes: Record<string, string>) {
  set('site-notes', notes)
}

export function saveHealthCache(cache: Record<string, HealthEntry>) {
  set('health-cache', cache)
}

export function saveSidebarOpen(open: boolean) {
  set('sidebar-open', open)
}

export function saveAccentColor(color: string) {
  set('accent-color', color)
}

export function saveBlurEnabled(enabled: boolean) {
  set('blur-enabled', enabled)
}

export function saveParallaxEnabled(enabled: boolean) {
  set('parallax-enabled', enabled)
}
