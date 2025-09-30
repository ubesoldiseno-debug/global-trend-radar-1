import React, { useEffect, useMemo } from "react";
import metadata from "./metadata.json";
import { NEWS } from "./constants";
import type { NewsItem } from "./types";
import { useFilters } from "./hooks/useFilters";
import { TrendCard } from "./components/TrendCard";
import { Toolbar } from "./components/Toolbar";

export default function App() {
  useEffect(() => {
    document.title = `Global Trend Radar · ${metadata.period}`;
  }, []);

  const allSections = metadata.sections.map(s => s.title);
  const pills = useMemo(() => Array.from(new Set(NEWS.map(n => n.pill))).sort(), []);
  const { filtered, filters, setSearch, setPill, setSection } = useFilters(NEWS);

  const grouped = useMemo(() => {
    const map = new Map<string, NewsItem[]>();
    for (const s of allSections) map.set(s, []);
    for (const item of filtered) {
      if (!map.has(item.section)) map.set(item.section, []);
      map.get(item.section)!.push(item);
    }
    return map;
  }, [filtered, allSections]);

  return (
    <section className="max-w-[980px] mx-auto p-5 text-slate-900 dark:text-slate-100">
      <header className="mb-4">
        <h1 className="text-[28px] font-extrabold leading-tight">Global Trend Radar · {metadata.period}</h1>
        <p className="m-0 text-slate-600 dark:text-slate-400">{metadata.subtitle}</p>
      </header>

      <Toolbar
        pills={pills}
        sections={allSections}
        filters={filters}
        setSearch={setSearch}
        setPill={setPill}
        setSection={setSection}
        total={filtered.length}
      />


      {/* Renderizado personalizado de "Destacados" con HERO */}
      {(() => {
        const destacadosAll = NEWS.filter(n => n.section === "Destacados").sort((a, b) => b.dateISO.localeCompare(a.dateISO));
        const heroItem = destacadosAll.find(n => n.image) ?? destacadosAll[0];
        const restTop = destacadosAll.filter(i => i !== heroItem).slice(0, 3);

        return (
          <div>
            <h2 className="mt-2 mb-2 text-xl font-semibold">Destacados</h2>

            {/* HERO */}
            {heroItem && (
              <a href={heroItem.url} target="_blank" rel="noopener" className="block mb-4 group">
                <article className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  {heroItem.image && (
                    <div className="aspect-[16/9] bg-black">
                      <img src={heroItem.image} alt={heroItem.imageAlt || heroItem.title}
                           className="w-full h-full object-cover" loading="eager" />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="inline-block text-[11px] px-2.5 py-1 rounded-full bg-black text-white uppercase tracking-wide mb-2">{heroItem.pill}</span>
                    <h3 className="text-[20px] leading-snug font-semibold mb-2 text-black dark:text-white">{heroItem.title}</h3>
                    <div className="text-[12px] text-slate-600 dark:text-slate-300">{formatDateEs(heroItem.dateISO)} · {heroItem.source}</div>
                  </div>
                </article>
              </a>
            )}

            {/* Los otros 3 titulares debajo, sin imagen */}
            <div className="grid gap-[14px]" style={{gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))"}}>
              {restTop.map((item, i) => (
                <TrendCard key={`${item.url}-rest-${i}`} item={item as NewsItem} />
              ))}
            </div>
          </div>
        );
      })()}

      {/* Renderizar el resto de secciones (excluyendo Destacados) con tarjetas sin imagen */}
      {allSections.filter(s => s !== "Destacados").map((sectionTitle, idx) => {
        const items = (grouped.get(sectionTitle) || []).filter(Boolean);
        if (!items.length) return null;
        return (
          <div key={sectionTitle} className="mt-7">
            <h2 className="mt-2 mb-2 text-xl font-semibold">{sectionTitle}</h2>
            <div className="grid gap-[14px]" style={{gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))"}}>
              {items.map((item, i) => (
                <TrendCard key={`${item.url}-${i}`} item={item as NewsItem} />
              ))}
            </div>
          </div>
        );
      })}

    </section>
  );
}