import React from 'react'

export default function Toolbar({ view, setView, activeTags, setActiveTags, allTags }:
  { view: 'grid'|'list', setView: (v:'grid'|'list')=>void, activeTags: string[], setActiveTags: (t:string[])=>void, allTags: string[] }) {
  const toggleTag = (t: string) => {
    setActiveTags(activeTags.includes(t) ? activeTags.filter(x=>x!==t) : [...activeTags, t])
  }
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2">
        <button onClick={()=>setView('grid')} className={`px-3 py-1 rounded-full text-sm ${view==='grid'?'bg-black text-white':'bg-gray-100'}`}>Grid</button>
        <button onClick={()=>setView('list')} className={`px-3 py-1 rounded-full text-sm ${view==='list'?'bg-black text-white':'bg-gray-100'}`}>Lista</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map(t => (
          <button key={t} onClick={()=>toggleTag(t)} className={`px-3 py-1 rounded-full text-sm ${activeTags.includes(t)?'bg-blue-600 text-white':'bg-gray-100'}`}>{t}</button>
        ))}
      </div>
    </div>
  )
}
