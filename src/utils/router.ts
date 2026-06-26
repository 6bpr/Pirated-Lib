import type { PageName } from '../types'

type RouteHandler = (params: Record<string, string>) => void

const BASE = import.meta.env.BASE_URL

const routes: Array<{ pattern: RegExp; handler: RouteHandler }> = []

let currentPage: PageName = 'home'
let currentParams: Record<string, string> = {}

export function basePath(path: string): string {
  const base = BASE.replace(/\/$/, '')
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`
}

export function stripBase(fullPath: string): string {
  const base = BASE.replace(/\/$/, '')
  if (fullPath.startsWith(base)) {
    return fullPath.slice(base.length) || '/'
  }
  return fullPath
}

export function registerRoute(pattern: RegExp, handler: RouteHandler) {
  routes.push({ pattern, handler })
}

export function navigate(path: string) {
  const full = basePath(path)
  history.pushState(null, '', full)
  resolve(full)
}

export function resolve(rawPath?: string) {
  const full = rawPath || window.location.pathname + window.location.search
  const stripped = stripBase(full)
  const query = full.includes('?') ? '?' + full.split('?')[1] : ''

  for (const route of routes) {
    const match = stripped.match(route.pattern)
    if (match) {
      const params: Record<string, string> = {}
      if (match.groups) {
        Object.assign(params, match.groups)
      }
      if (query) {
        const usp = new URLSearchParams(query)
        usp.forEach((val, key) => { params[key] = val })
      }
      currentParams = params
      route.handler(params)
      return
    }
  }
  routes[0]?.handler({})
}

export function getCurrentPage(): PageName {
  return currentPage
}

export function setCurrentPage(page: PageName) {
  currentPage = page
}

export function getParams(): Record<string, string> {
  return currentParams
}

export function initRouter() {
  const redirect = sessionStorage.getItem('redirect')
  if (redirect) {
    sessionStorage.removeItem('redirect')
    window.addEventListener('popstate', () => resolve())
    navigate(redirect)
    return
  }
  window.addEventListener('popstate', () => resolve())
  resolve()
}
