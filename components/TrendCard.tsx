import React from 'react'
import { TrendItem } from '../types'
import { formatDate } from '../utils'

export default function TrendCard({ item }: { item: TrendItem }) {
  return (
    <a href={item.url} target="_blank" rel="noreferrer"
       className="block rounded-2xl p-5 bg-white shadow hover:shadow-lg transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{item.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-xs rounded-full bg-gray-100">{tag}</span>
            ))}
          </div>
        </div>
        {item.image ? (
          <img src={item.image} alt="" className="w-24 h-24 object-cover rounded-xl hidden sm:block"/>
        ) : (
          <svg viewBox="0 0 48 48" className="w-24 h-24 hidden sm:block">
            <rect x="2" y="2" width="44" height="44" rx="10" fill="#f3f4f6"/>
            <path d="M12 32l6-8 6 6 6-10 6 12" stroke="#9ca3af" strokeWidth="2" fill="none"/>
          </svg>
        )}
      </div>
      <div className="mt-4 text-xs text-gray-500">{item.source} • {formatDate(item.dateISO)}</div>
    </a>
  )
}
