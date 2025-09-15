import React from 'react';
import { FEATURED, NEWS, WATCHLIST } from './constants';
import { cx, formatDate } from './utils';

function TagChip({ tag }:{ tag: 'PACKAGING'|'GRÁFICO'|'BEAUTY'|'TRANSVERSAL' }){
  const m:any={PACKAGING:'bg-emerald-100 text-emerald-800', 'GRÁFICO':'bg-indigo-100 text-indigo-800', BEAUTY:'bg-rose-100 text-rose-800', TRANSVERSAL:'bg-slate-100 text-slate-800'};
  return <span className={cx('px-2 py-1 rounded-full text-xs font-medium', m[tag])}>{tag}</span>;
}
function Card({item}:{item:any}){
  return <a href={item.url} target="_blank" rel="noreferrer" className="block group rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
    <div className="aspect-[16/9] bg-slate-100 overflow-hidden"><img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition" loading="lazy"/></div>
    <div className="p-4 space-y-2">
      <div className="flex items-center gap-2">
        <TagChip tag={item.tag}/><span className="text-xs text-slate-500">{formatDate(item.date)}</span><span className="text-xs text-slate-500">· {item.meta.sourceDomain}</span>
      </div>
      <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
      <p className="text-sm text-slate-700 line-clamp-3">{item.summary}</p>
    </div>
  </a>;
}

export default function App(){
  return <div className="min-h-screen bg-white">
    <header className="px-4 md:px-8 py-6 border-b">
      <h1 className="text-2xl font-semibold">Global Trend Radar</h1>
      <p className="text-sm text-slate-600">Semana 2025-09-08..2025-09-14 · Sin buscador · Diseño fijo</p>
    </header>
    <main className="px-4 md:px-8 py-8 space-y-10">
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold">Destacados ({FEATURED.length}/4)</h2>
          <div className="text-xs text-slate-500">Etiquetas: Packaging · Gráfico · Beauty · Transversal</div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED.map((it:any)=> <Card key={it.id} item={it}/>)}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Novedades ({NEWS.length}/10)</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {NEWS.map((it:any)=> <Card key={it.id} item={it}/>)}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Watchlist ({WATCHLIST.length}/3)</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {WATCHLIST.map((it:any)=> <Card key={it.id} item={it}/>)}
        </div>
      </section>
    </main>
    <footer className="px-4 md:px-8 py-8 border-t text-xs text-slate-500">Estructura fija · Sin buscador · © 2025</footer>
  </div>;
}
