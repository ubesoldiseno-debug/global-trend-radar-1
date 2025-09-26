import React from 'react'
import { LayoutGrid, List as ListIcon } from 'lucide-react'
import { TAGS, TAG_LABELS } from '../constants'
import type { Tag } from '../types'
import { classNames } from '../utils'

export default function Toolbar(props: {
  activeTags: Tag[]
  onToggle: (t: Tag) => void
  onReset: () => void
  layout: 'grid' | 'list'
  setLayout: (v: 'grid' | 'list') => void
  sortDesc: boolean
  setSortDesc: (v: boolean) => void
}) {
  const { activeTags, onToggle, onReset, layout, setLayout, sortDesc, setSortDesc } = props
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap -mx-2 px-2 sm:mx-0 sm:px-0 snap-x">
          {TAGS.map((t) => (
            <button key={t} onClick={() => onToggle(t)}
              aria-pressed={activeTags.includes(t)}
              className={classNames('px-3 py-1.5 rounded-2xl text-sm border shadow-sm min-w-fit snap-start',
                activeTags.includes(t) ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-900 border-neutral-200')}>
              {TAG_LABELS[t] || t}
            </button>
          ))}
        </div>
        <button onClick={onReset} className="rounded-2xl px-3 py-1.5 text-sm bg-white border border-neutral-200 shadow">Reset</button>
      </div>
      <div className="lg:col-span-4 flex items-center justify-end gap-2">
        <div className="flex items-center gap-1 ml-2">
          <button onClick={() => setLayout('grid')}
            className={classNames('p-2 rounded-xl border', layout==='grid' ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white border-neutral-200')}>
            <LayoutGrid size={16} />
          </button>
          <button onClick={() => setLayout('list')}
            className={classNames('p-2 rounded-xl border', layout==='list' ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white border-neutral-200')}>
            <ListIcon size={16} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-neutral-600 hidden sm:inline">Fecha</span>
          <button onClick={() => setSortDesc(!sortDesc)} className="rounded-xl px-2 py-1 text-sm bg-white border border-neutral-200 shadow">
            {sortDesc ? '↓' : '↑'}
          </button>
        </div>
      </div>
    </div>
  )
}
