import React from 'react'

export default function Toolbar({ view, setView, tags, setFilter }:
 { view:'grid'|'list', setView:(v:'grid'|'list')=>void, tags:string[], setFilter:(t:string)=>void }){
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2">
        <button onClick={()=>setView('grid')} className={`px-3 py-1 rounded-full text-sm ${view==='grid'?'bg-black text-white':'bg-gray-100'}`}>Grid</button>
        <button onClick={()=>setView('list')} className={`px-3 py-1 rounded-full text-sm ${view==='list'?'bg-black text-white':'bg-gray-100'}`}>Lista</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(t => (
          <button key={t} onClick={()=>setFilter(t)} className="px-3 py-1 rounded-full text-sm bg-gray-100">{t}</button>
        ))}
      </div>
    </div>
  )
}
