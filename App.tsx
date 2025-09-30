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
  const showHero = !filters.search && !filters.section && !filters.pill;
  const top4Urls = useMemo(() => {
    if (!showHero) return new Set<string>();
    const dest = NEWS.filter(n => n.section === "Destacados").slice().sort((a,b)=> b.dateISO.localeCompare(a.dateISO));
    return new Set(dest.slice(0,4).map(n => n.url));
  }, [showHero]);

    const grouped = useMemo(() => {
    const map = new Map<string, NewsItem[]>();
    for (const s of allSections) map.set(s, []);
    for (const item of filtered) {
      if (showHero && item.section === "Destacados" && top4Urls.has(item.url)) continue;
      if (!map.has(item.section)) map.set(item.section, []);
      map.get(item.section)!.push(item);
    }
    return map;
  }, [filtered, allSections, showHero, top4Urls]);
return (
    <section className="max-w-[980px] mx-auto p-5 text-slate-900 dark:text-slate-100">
      <header className="mb-4">
        <h1 className="text-[28px] font-bold leading-tight">Global Trend Radar · {metadata.period}</h1>
        <p className="m-0 text-slate-600 dark:text-slate-400">{metadata.subtitle}</p>
      </header>


      {/* Hero de Destacados: solo si no hay filtros activos */}
      {(!filters.search && !filters.section && !filters.pill) && (() => {
        const destacados = NEWS.filter(n => n.section === "Destacados").slice().sort((a,b)=> b.dateISO.localeCompare(a.dateISO));
        const top4 = destacados.slice(0, 4);
        if (!top4.length) return null;
        const hero = top4[0];
        const three = top4.slice(1);

        const isValidImage = (u?: string) => !!u && /^https?:\/\//i.test(u);

        return (
          <div className="mt-4">
            {/* HERO */}
            <article className="relative w-full rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm">
              <div className="relative w-full h-[220px] md:h-[360px] bg-black">
                {isValidImage(hero.image) ? (
                  <img src={hero.image!} alt={hero.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-white/80">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="opacity-70">
                      <rect x="3" y="3" width="18" height="14" rx="2" strokeWidth="1.5"/><circle cx="9" cy="9" r="2" strokeWidth="1.5"/><path d="M3 14l4-3 5 4 3-2 6 5" strokeWidth="1.5"/>
                    </svg>
                    <span className="sr-only">Imagen de cabecera no disponible</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="inline-block text-[11px] px-2.5 py-1 rounded-full bg-black text-white uppercase tracking-wide">{hero.pill}</span>
                  <h3 className="text-white text-[18px] md:text-[22px] leading-snug font-semibold mt-2">{hero.title}</h3>
                  <div className="text-[12px] text-white/80 mt-1">{new Date(hero.dateISO).toLocaleDateString('es-ES', {day:'2-digit', month:'short', year:'numeric'})} · {hero.source}</div>
                  <a href={hero.url} target="_blank" rel="noopener" className="inline-block mt-2 text-[13px] text-white underline">Leer más →</a>
                </div>
              </div>
            </article>

            {/* Los otros 3 titulares */}
            {three.length > 0 && (
              <div className="grid gap-3 md:gap-4 mt-4 md:grid-cols-3">
                {three.map((item, i) => (
                  <TrendCard key={`${item.url}-${i}`} item={item} />
                ))}
              </div>
            )}
          </div>
        );
      })()}


      <Toolbar
        pills={pills}
        sections={allSections}
        filters={filters}
        setSearch={setSearch}
        setPill={setPill}
        setSection={setSection}
        total={filtered.length}
      />

      {allSections.map((sectionTitle, idx) => {
        const items = grouped.get(sectionTitle) || [];
        if (!items.length) return null;
        return (
          <div key={sectionTitle} className={idx === 0 ? "" : "mt-7"}>
            <h2 className="mt-2 mb-2 text-xl font-semibold">{sectionTitle}</h2>
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