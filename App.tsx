import React from 'react'
import { Download, Link as LinkIcon, Sparkles, Calendar } from 'lucide-react'
import { SITE_TITLE, SITE_DATE, TOP_ACTIONS, ITEMS, WATCHLIST } from './constants'
import { useFilters } from './hooks/useFilters'
import TrendCard from './components/TrendCard'
import Toolbar from './components/Toolbar'

export default function App(){
  const { activeTags, toggle, reset, layout, setLayout, sortDesc, setSortDesc, filtered } = useFilters(ITEMS as any)

  const exportJSON = () => {
    const data = JSON.stringify({ topActions: TOP_ACTIONS, items: ITEMS, watchlist: WATCHLIST }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'radar_tendencias.json'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{SITE_TITLE}</h1>
            <p className="text-xs sm:text-sm text-neutral-500">{SITE_DATE}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportJSON} className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-white text-neutral-900 border border-neutral-200 text-sm shadow">
              <Download size={16}/><span>Exportar</span>
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <Toolbar
            activeTags={activeTags as any}
            onToggle={toggle as any}
            onReset={reset}
            layout={layout}
            setLayout={setLayout}
            sortDesc={sortDesc}
            setSortDesc={setSortDesc}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Destacados */}
        <section className="my-6">
          <div className="rounded-3xl p-5 bg-white border border-neutral-200 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2"><Sparkles size={18} /> Destacados</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {(TOP_ACTIONS as any).slice(0,4).map((a: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white text-xs font-semibold">{i + 1}</span>
                  <a href={a.url || '#'} target="_blank" rel="noreferrer" className="group flex-1">
                    <p className="font-semibold leading-snug group-hover:underline">{a.text}</p>
                    {a.url && <div className="text-xs text-neutral-500 inline-flex items-center gap-1 mt-1"><LinkIcon size={14} /> {a.url}</div>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Novedades */}
        <section className="my-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg sm:text-xl font-semibold">
              Novedades <span className="text-neutral-500 font-normal">({Math.min(filtered.length, 10)})</span>
            </h3>
          </div>

          {layout === 'grid' ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.slice(0,10).map((it: any) => (
                <TrendCard key={it.id} it={it} />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-neutral-200 rounded-3xl border border-neutral-200 bg-white shadow-sm">
              {filtered.slice(0,10).map((it: any) => (
                <div key={it.id} className="p-4 hover:bg-neutral-50">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] tracking-wide px-2 py-0.5 rounded-full border bg-neutral-900 text-white border-neutral-900">{it.tag}</span>
                      <span className="text-xs text-neutral-500 inline-flex items-center gap-1">
                        <Calendar size={14} /> {it.date || '—'}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500 truncate max-w-[50%]">{it.url}</div>
                  </div>
                  <a href={it.url} target="_blank" rel="noreferrer" className="mt-1 block text-lg font-bold leading-snug hover:underline">{it.title}</a>
                  {it.why && <p className="mt-1 text-sm text-neutral-700 font-light">{it.why}</p>}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Watchlist */}
        <section className="mt-10 mb-16">
          <div className="rounded-3xl p-5 bg-white border border-neutral-200 shadow-sm">
            <h4 className="text-lg sm:text-xl font-semibold">Watchlist</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {(WATCHLIST as any).slice(0,3).map((w: any, i: number) => (
                <a key={i} href={w.url || '#'} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-2xl bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 inline-flex items-center gap-2">
                  <span>✦</span><span className="text-sm">{w.text}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-neutral-500">
          Radar Global de Tendencias 2025 · Grupo Ubesol
        </div>
      </footer>
    </div>
  )
}
