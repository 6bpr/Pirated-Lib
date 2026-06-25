export interface Site {
  id: string
  name: string
  description: string
  shortDescription: string
  url: string
  category: string
  subcategory: string
  tags: string[]
  status: SiteStatus
  language: string
  requires: string
  curatorNote: string
  addedAt: string
  updatedAt: string
}

export type SiteStatus = 'online' | 'partial' | 'down' | 'unknown'

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
}

export interface AppState {
  theme: 'dark' | 'light'
  view: 'grid' | 'list' | 'compact'
  filters: FilterState
  favorites: string[]
  history: HistoryEntry[]
  recentSearches: string[]
  siteNotes: Record<string, string>
  healthCache: Record<string, HealthEntry>
  sidebarOpen: boolean
  accentColor: string
  blurEnabled: boolean
  parallaxEnabled: boolean
}

export interface FilterState {
  category: string | null
  subcategory: string | null
  tags: string[]
  status: SiteStatus | 'all'
  sort: SortOption
  query: string
}

export type SortOption = 'name-asc' | 'name-desc' | 'added' | 'updated' | 'status'

export interface HistoryEntry {
  siteId: string
  visitedAt: number
  count: number
}

export interface HealthEntry {
  status: SiteStatus
  checkedAt: number
}

export type PageName = 'home' | 'browse' | 'site' | 'favorites' | 'history' | 'dashboard' | 'about'
