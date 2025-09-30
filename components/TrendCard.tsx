import React from "react";
import type { NewsItem } from "../types";
import { formatDateEs } from "../utils";

export function TrendCard({ item }: { item: NewsItem }) {
  return (
    <article className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="h-36 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-[12px] select-none">
        Vista previa
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block text-[10px] px-2.5 py-1 rounded-full bg-black text-white uppercase tracking-wide font-semibold">
            {item.pill}
          </span>
          <span className="text-[12px] text-slate-500">{formatDateEs(item.dateISO)}</span>
        </div>
        <h3 className="text-[16px] leading-snug font-semibold mb-2">{item.title}</h3>
        <div className="text-[12px] text-slate-500 dark:text-slate-400 mb-3">{item.source}</div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener"
          className="text-[13px] text-brand-600 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 rounded"
        >
          Abrir enlace ↗
        </a>
      </div>
    </article>
  );
}
