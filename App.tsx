import React, { useEffect, useMemo } from "react";
import metadata from "./metadata.json";
import { NEWS } from "./constants";
import type { NewsItem } from "./types";
import { useFilters } from "./hooks/useFilters";
import { TrendCard } from "./components/TrendCard";
import { Toolbar } from "./components/Toolbar";

export default function App() {
  useEffect(() => {
    document.title = `Minisite semanal · ${metadata.period}`;
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
    <section className="max-w-[1100px] mx-auto px-5 md:px-6 pb-10">
      <header className="sticky top-0 z-20 -mx-5 md:-mx-6 px-5 md:px-6 py-4 mb-5 bg-white/80 dark:bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-xs">
        <h1 className="text-[28px] md:text-[40px] font-extrabold leading-tight tracking-tight">Radar Global de Tendencias</h1>
        <p className="m-0 text-slate-600 dark:text-slate-400 text-sm md:text-base">
          {`Radar Global de tendencias · ${metadata.period}`}
        </p>
        <p className="m-0 text-slate-500 dark:text-slate-400 text-sm">{metadata.subtitle}</p>
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

      {allSections.map((sectionTitle, idx) => {
        const items = grouped.get(sectionTitle) || [];
        if (!items.length) return null;
        return (
          <div key={sectionTitle} className={idx === 0 ? "" : "mt-10"}>
            <div className="flex items-end justify-between mb-3">
              <h2 className="text-2xl font-semibold">{sectionTitle}</h2>
              <span className="text-sm text-slate-500">{items.length} ítems</span>
            </div>
            <div className="grid gap-5" style={{gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))"}}>
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
