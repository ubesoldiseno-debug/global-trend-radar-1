import React, { useEffect, useMemo } from "react";
import metadata from "./metadata.json";
import { NEWS } from "./constants";
import type { NewsItem } from "./types";
import { useFilters } from "./hooks/useFilters";
import { TrendCard } from "./components/TrendCard";
import { formatDateEs } from "./utils";
import { Toolbar } from "./components/Toolbar";

const DOCUMENT_TITLE = `Global Trend Radar · ${metadata.period}`;

export default function App() {
  useEffect(() => {
    document.title = DOCUMENT_TITLE;
  }, []);

  const allSections = metadata.sections.map(s => s.title);
  const pills = useMemo(() => Array.from(new Set(NEWS.map(n => n.pill))).sort(), []);
  const { filtered, filters, setSearch, setPill, setSection } = useFilters(NEWS);

  const stats = useMemo(() => {
    const total = NEWS.length;
    const sources = Array.from(new Set(NEWS.map(item => item.source))).length;
    return {
      total,
      sources,
      pills: pills.length,
    };
  }, [pills.length]);

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
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_55%)]" />

      <section className="mx-auto max-w-[1040px] px-5 pb-16 pt-10">
        <header className="mb-8 rounded-3xl border border-white/10 bg-white/5 px-6 py-7 shadow-[0_25px_60px_-25px_rgba(15,23,42,0.6)] backdrop-blur">
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.22em] text-lime-300/80">Global Trend Radar</p>
          <h1 className="text-[32px] font-semibold leading-[1.1] text-white">{DOCUMENT_TITLE}</h1>
          <p className="mt-3 max-w-2xl text-[15px] text-slate-200/85">{metadata.subtitle}</p>

          <dl className="mt-6 grid gap-4 text-slate-200/85 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-slate-300/60">Noticias</dt>
              <dd className="text-2xl font-semibold text-white">{stats.total}</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-slate-300/60">Pills temáticas</dt>
              <dd className="text-2xl font-semibold text-white">{stats.pills}</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-slate-300/60">Fuentes</dt>
              <dd className="text-2xl font-semibold text-white">{stats.sources}</dd>
            </div>
          </dl>
        </header>

        <div className="sticky top-4 z-10 mb-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-4 backdrop-blur">
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
          <section className="mb-10">
            <h2 className="mt-2 mb-4 text-xl font-semibold text-white">Destacados</h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))" }}>
              <article className="col-span-full overflow-hidden rounded-3xl border border-white/10 bg-white text-slate-900 shadow-xl">
                {hero.image ? (
                  <img
                    src={hero.image}
                    alt={hero.title}
                    className="h-64 w-full object-cover md:h-80"
                    loading="eager"
                  />
                ) : null}
                <div className="p-5 md:p-6">
                  <span className="mb-3 inline-block rounded-full bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                    {hero.pill}
                  </span>
                  <h3 className="mb-3 text-[21px] font-semibold leading-snug text-slate-900">{hero.title}</h3>
                  <div className="mb-4 text-[12px] font-medium text-slate-600">
                    {formatDateEs(hero.dateISO)} · {hero.source}
                  </div>
                  <a
                    href={hero.url}
                    target="_blank"
                    rel="noopener"
                    className="text-[13px] font-semibold text-slate-900 underline-offset-4 transition hover:underline"
                  >
                    Leer más →
                  </a>
                </div>
              </article>

              {restDestacados.slice(0, 3).map((item, i) => (
                <TrendCard key={`${item.url}-${i}`} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Resto de secciones, excepto Destacados ya renderizado arriba */}
        {allSections.filter(s => s !== "Destacados").map(sectionTitle => {
          const items = grouped.get(sectionTitle) || [];
          if (!items.length) return null;
          return (
            <div key={sectionTitle} className="mt-10">
              <h2 className="mb-4 text-xl font-semibold text-white">{sectionTitle}</h2>
              <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))" }}>
                {items.map((item, i) => (
                  <TrendCard key={`${item.url}-${i}`} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
