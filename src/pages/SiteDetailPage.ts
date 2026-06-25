import { SiteDetail } from '../components/site/SiteDetail'
import type { Site, Category } from '../types'

export function SiteDetailPage(
  site: Site,
  isFav: boolean,
  note: string,
  onToggleFav: (id: string) => void,
  onSaveNote: (id: string, note: string) => void,
  categories: Category[] = [],
): HTMLElement {
  return SiteDetail(site, isFav, note, onToggleFav, onSaveNote, categories)
}
