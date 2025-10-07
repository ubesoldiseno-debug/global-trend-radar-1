import React from "react";
import type { NewsItem } from "../types";
import { formatDateEs } from "../utils";

export function TrendCard({ item }: { item: NewsItem }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/95 p-5 text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
      <span className="mb-2 inline-block rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
        {item.pill}
      </span>
      <h3 className="mb-3 text-[17px] font-semibold leading-snug text-slate-900 transition group-hover:text-slate-700">{item.title}</h3>
      <div className="mb-4 text-[12px] text-slate-600">
        {formatDateEs(item.dateISO)} · {item.source}
      </div>
      <a
        href={item.url}
        target="_blank"
        rel="noopener"
        className="text-[13px] font-semibold text-slate-900 underline-offset-4 transition group-hover:underline"
      >
        Leer más →
      </a>
    </article>
  );
}