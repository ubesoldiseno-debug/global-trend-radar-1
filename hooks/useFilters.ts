import { useMemo, useState } from 'react'
import type { TrendItem } from '../types'

export function useFilters(items: TrendItem[]) {
  const [view, setView] = useState<'grid'|'list'>('grid')
  const [activeTags, setActiveTags] = useState<string[]>([])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    items.forEach(i => i.tags.forEach(t => set.add(t)))
    return Array.from(set).sort()
  }, [items])

  const filtered = useMemo(() => {
    if (activeTags.length === 0) return items
    return items.filter(i => activeTags.every(t => i.tags.includes(t)))
  }, [items, activeTags])

  return { view, setView, activeTags, setActiveTags, allTags, filtered }
}
