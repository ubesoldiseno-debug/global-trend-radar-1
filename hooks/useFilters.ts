import { useEffect, useMemo, useState } from 'react'
import type { Tag, Item } from '../types'
import { TAGS } from '../constants'

function useLocalStorage<T>(key: string, initial: T){
  const [state, setState] = useState<T>(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : initial } catch { return initial }
  })
  useEffect(()=>{ try { localStorage.setItem(key, JSON.stringify(state)) } catch {} }, [key, state])
  return [state, setState] as const
}

export function useFilters(items: Item[]){
  const [activeTags, setActiveTags] = useLocalStorage<Tag[]>('radar.filters', TAGS.slice())
  const [layout, setLayout] = useLocalStorage<'grid'|'list'>('radar.layout', 'grid')
  const [sortDesc, setSortDesc] = useLocalStorage<boolean>('radar.sortDesc', true)

  useEffect(()=>{ if(!activeTags || activeTags.length===0) setActiveTags(TAGS.slice()) }, [activeTags])

  const toggle = (t: Tag) => setActiveTags(prev => prev.includes(t) ? prev.filter(x => x!==t) : [...prev, t])
  const reset = () => setActiveTags(TAGS.slice())

  const filtered = useMemo(()=>{
    const pool = items.filter(it => activeTags.includes(it.tag))
    const sorted = [...pool].sort((a,b)=>{
      const da = new Date(a.date||0).getTime(), db = new Date(b.date||0).getTime()
      return sortDesc ? db-da : da-db
    })
    return sorted
  }, [items, activeTags, sortDesc])

  return { activeTags, toggle, reset, layout, setLayout, sortDesc, setSortDesc, filtered }
}
