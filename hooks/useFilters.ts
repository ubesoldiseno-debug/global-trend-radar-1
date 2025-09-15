import { useMemo, useState } from 'react'
import type { Item } from '../types'

export function useFilters(blocks: { destacados: Item[]; novedades: Item[]; watchlist: Item[] }){
  const [view, setView] = useState<'grid'|'list'>('grid')
  const [filter, setFilter] = useState<string>('')

  const all = useMemo(()=>[...blocks.destacados, ...blocks.novedades, ...blocks.watchlist], [blocks])
  const tags = useMemo(()=>Array.from(new Set(all.map(i=>i.tag))), [all])

  const filterItems = (arr: Item[]) => filter ? arr.filter(i=>i.tag===filter) : arr

  return { view, setView, filter, setFilter, tags, filterItems }
}
