import React, { useMemo, useState } from 'react'
import type { Item } from '../types'
import { classNames, getMshot, svgFallback } from '../utils'

export default function TrendCard({ it }: { it: Item }) {
  const [srcIdx, setSrcIdx] = useState(0)
  const sources = useMemo(() => {
    const arr = []
    if (it.image && /^https?:\/\//.test(it.image)) arr.push(it.image)
    const m = getMshot(it.url)
    if (m) arr.push(m)
    arr.push(svgFallback(it.title))
    return arr
  }, [it.image, it.url, it.title])

  return (
    <div className="group rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-md">
      <div className="aspect-[16/9] bg-neutral-100 relative">
        <img
          src={sources[srcIdx]}
          onError={() => setSrcIdx(i => Math.min(i+1, sources.length-1))}
          alt={it.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <span className={classNames('text-[11px] tracking-wide px-2 py-0.5 rounded-full border',
            it.tag==='PACKAGING' ? 'bg-neutral-900 text-white border-neutral-900'
              : it.tag==='GRÁFICO' ? 'bg-neutral-800 text-white border-neutral-800'
              : it.tag==='BEAUTY' ? 'bg-neutral-700 text-white border-neutral-700'
              : 'bg-neutral-600 text-white border-neutral-600'
          )}>{it.tag}</span>
          <span className="text-xs text-neutral-500">{it.date || '—'}</span>
        </div>
        <a href={it.url} target="_blank" rel="noreferrer" className="mt-2 block text-lg font-bold leading-snug hover:underline">
          {it.title}
        </a>
        {it.why && <p className="mt-1 text-sm text-neutral-700 font-light">{it.why}</p>}
      </div>
    </div>
  )
}
