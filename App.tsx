import React, { useEffect, useMemo } from "react";
import metadata from "./metadata.json";
import { NEWS } from "./constants";
import type { NewsItem } from "./types";
import { useFilters } from "./hooks/useFilters";
import { TrendCard } from "./components/TrendCard";
import { formatDateEs } from "./utils";
import { Toolbar } from "./components/Toolbar";

export default function App() {
  useEffect(() => {
    document.title = "Global Trend Radar · 29 sep – 3 oct 2025";
  }, []);

  const allSections = metadata.sections.map(s => s.title);
  const pills = useMemo(() => Array.from(new Set(NEWS.map(n => n.pill))).sort(), []);
  const { filtered, filters, setSearch, setPill, setSection } = useFilters(NEWS);

  // Agrupar por sección
  const grouped = useMemo(() => {
    const map = new Map<string, NewsItem[]>();
    for (const s of allSections) map.set(s, []);
    for (const item of filtered) {
      if (!map.has(item.section)) map.set(item.section, []);
      map.get(item.section)!.push(item);
    }
    return map;
  }, [filtered, allSections]);

  // Seleccionar hero: primer item de Destacados con image, si no existe, el primero de Destacados
  const destacados = grouped.get("Destacados") || [];
  const hero = destacados.find(i => !!i.image) || destacados[0];
  const restDestacados = destacados.filter(i => i !== hero);

  return (
    <section className="max-w-[980px] mx-auto p-5 text-slate-900">
      <header className="mb-4 rounded-2xl px-4 py-3 bg-white/90 backdrop-blur border border-slate-200 shadow-sm">
        <h1 className="text-[28px] font-bold leading-tight tracking-tight">Global Trend Radar · 29 sep – 3 oct 2025</h1>
        <p className="m-0 text-slate-600">{metadata.subtitle}</p>
      </header>

      <div className="sticky top-0 z-10 mb-4">
        <div className="rounded-2xl border border-slate-200 bg-white/85 backdrop-blur px-3 py-3">
          <Toolbar
            pills={pills}
            sections={allSections}
            filters={filters}
            setSearch={setSearch}
            setPill={setPill}
            setSection={setSection}
            total={filtered.length}
          />
        </div>
      </div>

      {/* Destacados con HERO */}
      {!!hero && (
        <section className="mb-7">
          {/* ⬇️ Cambio: títulos de sección en blanco */}
          <h2 className="mt-2 mb-2 text-xl font-semibold text-white">Destacados</h2>
          <div className="grid gap-4" style={{gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))"}}>
            {/* HERO ocupa 100% de ancho */}
            <article className="col-span-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {hero.image ? (
                <img
                  src={hero.image}
                  alt={hero.title}
                  className="w-full h-64 md:h-80 object-cover"
                  loading="eager"
                />
              ) : null}
              <div className="p-4">
                <span className="inline-block text-[11px] px-2.5 py-1 rounded-full bg-black text-white tracking-wide uppercase mb-2">{hero.pill}</span>
                <h3 className="text-[18px] leading-snug font-semibold mb-2">{hero.title}</h3>
                <div className="text-[12px] text-slate-600 mb-3">
                  {formatDateEs(hero.dateISO)} · {hero.source}
                </div>
                <a href={hero.url} target="_blank" rel="noopener" className="text-[13px] text-black hover:underline">Leer más →</a>
              </div>
            </article>

            {/* Los otros tres titulares, sin imagen */}
            {restDestacados.slice(0,3).map((item, i) => (
              <TrendCard key={`${item.url}-${i}`} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Resto de secciones, excepto Destacados ya renderizado arriba */}
      {allSections.filter(s => s !== "Destacados").map((sectionTitle, idx) => {
        const items = grouped.get(sectionTitle) || [];
        if (!items.length) return null;
        return (
          <div key={sectionTitle} className="mt-7">
            {/* ⬇️ Cambio: títulos de sección en blanco */}
            <h2 className="mt-2 mb-2 text-xl font-semibold text-white">{sectionTitle}</h2>
            <div className="grid gap-[14px]" style={{gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))"}}>
              {items.map((item, i) => (
                <TrendCard key={`${item.url}-${i}`} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
