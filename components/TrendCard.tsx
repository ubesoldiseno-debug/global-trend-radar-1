import React from "react";
import type { NewsItem } from "../types";
import { formatDateEs } from "../utils";

export function TrendCard({ item }: { item: NewsItem }) {
  return (
    <article className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm">
      <span className="inline-block text-[11px] px-2.5 py-1 rounded-full bg-black text-white tracking-wide uppercase mb-2">
        {item.pill}
      </span>
      <h3 className="text-[16px] leading-snug font-semibold mb-2">{item.title}</h3>
      <div className="text-[12px] text-slate-600 mb-3">
        {formatDateEs(item.dateISO)} · {item.source}
      </div>
      <a
        href={item.url}
        target="_blank"
        rel="noopener"
        className="text-[13px] text-black hover:underline"
      >
        Leer más →
      </a>
    </article>
  );
}