import { useMemo, useState } from "react";
import type { Filters, NewsItem } from "../types";

export function useFilters(items: NewsItem[]) {
  const [search, setSearch] = useState("");
  const [pill, setPill] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let out = items.slice();
    if (section) out = out.filter(i => i.section === section);
    if (pill) out = out.filter(i => i.pill === pill);
    if (q) {
      out = out.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.source.toLowerCase().includes(q)
      );
    }
    out.sort((a, b) => b.dateISO.localeCompare(a.dateISO)); // desc
    return out;
  }, [items, search, pill, section]);

  const filters: Filters = { search, pill, section };
  return { filtered, filters, setSearch, setPill, setSection };
}