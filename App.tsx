import React from 'react'
import TrendCard from './components/TrendCard'
import Toolbar from './components/Toolbar'
import { items, week } from './constants'
import { useFilters } from './hooks/useFilters'

export default function App() {
  const { view, setView, activeTags, setActiveTags, allTags, filtered } = useFilters(items)

  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Global Trend Radar — Semana {week.start} → {week.end}</h1>
        <p className="text-sm text-gray-600 mt-1">Prueba de workflow (estructura vercel-fixed). 20 items, sin buscador, chips y grid/list.</p>
      </header>
      <Toolbar view={view} setView={setView} activeTags={activeTags} setActiveTags={setActiveTags} allTags={allTags} />
      <section className={view==='grid' ? 'mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'mt-6 flex flex-col gap-3'}>
        {filtered.map(item => (
          <TrendCard key={item.id} item={item} />
        ))}
      </section>
    </main>
  )
}
