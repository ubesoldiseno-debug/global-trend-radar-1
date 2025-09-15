import React from 'react'
import TrendCard from './components/TrendCard'
import Toolbar from './components/Toolbar'
import { data, week } from './constants'
import { useFilters } from './hooks/useFilters'

export default function App(){
  const { view, setView, filter, setFilter, tags, filterItems } = useFilters(data)
  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Global Trend Radar — Semana {week.start} → {week.end}</h1>
        <p className="text-sm text-gray-600 mt-1">4 Destacados • 10 Novedades • 3 Watchlist — sin buscador, con chips y grid/list.</p>
      </header>
      <Toolbar view={view} setView={setView} tags={tags} setFilter={setFilter} />
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Destacados</h2>
        <div className={view==='grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-3'}>
          {filterItems(data.destacados).map(i => <TrendCard key={i.id} item={i} />)}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Novedades</h2>
        <div className={view==='grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-3'}>
          {filterItems(data.novedades).map(i => <TrendCard key={i.id} item={i} />)}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Watchlist</h2>
        <div className={view==='grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-3'}>
          {filterItems(data.watchlist).map(i => <TrendCard key={i.id} item={i} />)}
        </div>
      </section>
    </main>
  )
}
