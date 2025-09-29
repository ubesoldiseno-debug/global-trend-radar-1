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
    <section className="max-w-[980px] mx-auto p-5 text-slate-900 dark:text-slate-100">
      <header className="mb-4">
        <h1 className="text-[28px] font-bold leading-tight">Minisite semanal · {metadata.period}</h1>
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