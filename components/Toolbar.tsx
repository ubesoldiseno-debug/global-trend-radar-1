import React from "react";
import type { Filters } from "../types";

type Props = {
  pills: string[];
  sections: string[];
  filters: Filters;
  setSearch: (v: string) => void;
  setPill: (v: string | null) => void;
  setSection: (v: string | null) => void;
  total: number;
};

export function Toolbar({
  pills, sections, filters, setSearch, setPill, setSection, total
}: Props) {
  return (
    <div className="mb-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <input
          value={filters.search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por título o fuente"
          className="w-full max-w-xs rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/40"
        />
        <select
          value={filters.section ?? ""}
          onChange={e => setSection(e.target.value || null)}
          className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
        >
          <option value="">Todas las secciones</option>
          {sections.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={filters.pill ?? ""}
          onChange={e => setPill(e.target.value || null)}
          className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
        >
          <option value="">Todas las pills</option>
          {pills.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {(filters.search || filters.section || filters.pill) && (
          <button
            onClick={() => { setSearch(""); setSection(null); setPill(null); }}
            className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:border-lime-400/70 hover:bg-lime-400/10"
          >
            Limpiar
          </button>
        )}
      </div>
      <div className="text-sm font-medium text-slate-300/80">{total} noticias</div>
    </div>
  );
}