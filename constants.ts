export const SITE_TITLE = "Radar Global de Tendencias 1";
export const SITE_DATE = "(22.9.25)";

export type Tag = 'PACKAGING' | 'GRÁFICO' | 'BEAUTY' | 'TRANSVERSAL';

export const TAGS: Tag[] = ['PACKAGING','GRÁFICO','BEAUTY','TRANSVERSAL'];
export const TAG_LABELS: Record<Tag, string> = {
  PACKAGING: 'Packaging',
  'GRÁFICO': 'Gráfico',
  BEAUTY: 'Beauty',
  TRANSVERSAL: 'Transversal'
};

export const TOP_ACTIONS = [
  {
    "text": "Gallus y HEIDELBERG presentan nuevas prensas digital e híbrida (Labelexpo)",
    "url": "https://whattheythink.com/news/127624-labelexpo-2025-europe-gallus-heidelberg-unveil-new-digital-hybrid-solutions-meet-rising-demand-across-label-market/"
  },
  {
    "text": "Figma (sep‑18): Sites ampliado, Code Connect y fuentes personalizadas",
    "url": "https://www.figma.com/release-notes/"
  },
  {
    "text": "London Design Festival 2025: highlights y seguimiento en vivo (Wallpaper*)",
    "url": "https://www.wallpaper.com/design-interiors/live/london-design-festival-2025"
  },
  {
    "text": "Meta Connect 2025: anuncios clave (IA/AR/VR, smart glasses)",
    "url": "https://www.theverge.com/news/777572/meta-connect-2025-news-announcements-mark-zuckerberg-smart-glasses"
  }
] as const;

export const ITEMS = [
  {
    "id": "rotary-g2-magnet-roller",
    "title": "Rotary presenta el rodillo magnético G2 para troquelado de alta precisión",
    "summary": "Nueva generación de tooling para mayor registro y durabilidad en etiquetas.",
    "why": "La mejora en la precisión de troquelado reduce mermas y elevan la consistencia en series cortas con embellecimiento complejo. Para categorías de belleza y cuidado personal, habilita tiradas cápsula sin sacrificar calidad y con mejores tiempos de cambio.",
    "tag": "PACKAGING",
    "sector": "Troquelado & tooling",
    "date": "2025-09-18",
    "url": "https://www.labelsandlabeling.com/news/dies-tooling/rotary-debuts-g2-magnetic-roller-labelexpo",
    "image": null
  },
  {
    "id": "xeikon-finishing-integration",
    "title": "Xeikon integra acabado con su PX3300HD (flujo inline/offline flexible)",
    "summary": "Integración de converting con digital para etiquetas de alto valor.",
    "why": "Un flujo impresión+converting integrado reduce pasos, cambios y coste por lanzamiento. Es clave para acelerar time‑to‑market en cosmética e higiene con variantes frecuentes y personalización.",
    "tag": "PACKAGING",
    "sector": "Digital + acabado",
    "date": "2025-09-18",
    "url": "https://www.labelsandlabeling.com/news/digital-printing/xeikon-introduces-finishing-integration-labelexpo",
    "image": null
  },
  {
    "id": "labelexpo-day2",
    "title": "Labelexpo 2025: lo mejor del Día 2 (automatización y sostenibilidad)",
    "summary": "Recap editorial con demos, flujos y equipos clave de la feria.",
    "why": "Referencia ágil para mapear proveedores y tecnologías con impacto en 12–24 meses (curing LED, workflows DFE, automatización de cambios, reducción de residuos).",
    "tag": "PACKAGING",
    "sector": "Tendencias de feria",
    "date": "2025-09-19",
    "url": "https://www.labelsandlabeling.com/video/associations-events-awards/labelexpo-europe-2025-day-2-highlights",
    "image": null
  },
  {
    "id": "gip-digital-sales",
    "title": "GIP cierra dos ventas de prensas digitales en Labelexpo",
    "summary": "Entrada fuerte del fabricante con operaciones en España e Italia.",
    "why": "Señal de adopción real de digital: mayor disponibilidad para tiradas cortas, versionado y datos variables sin cuellos de botella en converting.",
    "tag": "PACKAGING",
    "sector": "Mercado & adopción",
    "date": "2025-09-19",
    "url": "https://www.labelsandlabeling.com/news/digital-printing/gip-secures-two-digital-press-sales-labelexpo-europe-2025",
    "image": null
  },
  {
    "id": "sapa-5-orders",
    "title": "SAPA asegura 5 pedidos de su DMS 330WFR (embellecimiento digital)",
    "summary": "Un sistema todo‑en‑uno con barniz, foil, semirrotativa y troquelado.",
    "why": "Permite acabados premium con menos pasos y personalización, ideal para marcas que buscan mayor valor percibido con eficiencia.",
    "tag": "PACKAGING",
    "sector": "Acabado & converting",
    "date": "2025-09-19",
    "url": "https://www.labelsandlabeling.com/news/finishing-embellishment/sapa-secures-5-orders-labelexpo-europe-2025",
    "image": null
  },
  {
    "id": "durst-tau-g3",
    "title": "Durst desvela la plataforma Tau G3 (nueva generación inkjet)",
    "summary": "Foco en fiabilidad, simplicidad y rendimiento para etiquetas.",
    "why": "Menos paradas y mayor rango de aplicaciones premium; fortalece propuestas para series cortas/medias con calidad consistente.",
    "tag": "PACKAGING",
    "sector": "Digital inkjet",
    "date": "2025-09-17",
    "url": "https://whattheythink.com/news/127628-durst-group-unveils-new-tau-g3-platform-labelexpo-europe-2025/",
    "image": null
  },
  {
    "id": "neiman-marcus-dallas",
    "title": "Neiman Marcus cerrará su tienda de Dallas el próximo año",
    "summary": "Saks Global reconfigura red física y activos clave del lujo.",
    "why": "Cambio estratégico que presiona a diferenciar la experiencia en tienda y a optimizar el **visual merchandising** y el **secondary packaging** para omnicanal.",
    "tag": "TRANSVERSAL",
    "sector": "Retail lujo/operaciones",
    "date": "2025-09-18",
    "url": "https://www.retaildive.com/news/saks-global-closing-dallas-neiman-marcus-store-next-year/760521/",
    "image": null
  },
  {
    "id": "forever21-strategy",
    "title": "Forever 21 replantea su regreso: sin nuevas tiendas en EE. UU.",
    "summary": "Apuesta por e‑commerce y acuerdos mayoristas bajo ABG.",
    "why": "Implica ajustes en go‑to‑market, creatividad y **packaging** orientado a terceros minoristas y marketplaces.",
    "tag": "TRANSVERSAL",
    "sector": "Fast fashion / estrategia",
    "date": "2025-09-18",
    "url": "https://www.retaildive.com/news/forever-21s-comeback-plan-no-stores/760478/",
    "image": null
  },
  {
    "id": "pinterest-where-to-buy",
    "title": "Pinterest añade enlaces ‘where‑to‑buy’ en anuncios de imagen",
    "summary": "Anuncios con rutas directas a compra; mejoras de engagement.",
    "why": "Nuevos flujos de conversión para beauty y lifestyle; condiciona la jerarquía gráfica en creatividades y fichas de producto.",
    "tag": "TRANSVERSAL",
    "sector": "Ads & e‑commerce",
    "date": "2025-09-17",
    "url": "https://www.retaildive.com/news/pinterest-where-to-buy-links-image-ads/760259/",
    "image": null
  },
  {
    "id": "verge-chatgpt-usage",
    "title": "Quién usa ChatGPT y para qué: claves del informe de OpenAI",
    "summary": "La mayoría de mensajes no son laborales; patrones útiles para producto.",
    "why": "Orienta prioridades de experiencias IA en descubrimiento, atención y contenido: insights aplicables a diseño de **servicios** y **comunicación** en retail/beauty.",
    "tag": "TRANSVERSAL",
    "sector": "IA & adopción",
    "date": "2025-09-17",
    "url": "https://www.theverge.com/news/779793/openai-chatgpt-user-report",
    "image": null
  }
] as const;

export const WATCHLIST = [
  {
    "text": "EMF: ‘Circular Snapshots’ (política UE, EPR, plásticos)",
    "url": "https://www.ellenmacarthurfoundation.org/podcasts/ep-195-circular-snapshots-eu-policy-breakthrough"
  },
  {
    "text": "London Design Festival: selección en vivo (materialidad/instalaciones)",
    "url": "https://www.wallpaper.com/design-interiors/live/london-design-festival-2025"
  },
  {
    "text": "Aalto: ‘Designs for a Cooler Planet’ (Helsinki)",
    "url": "https://www.wallpaper.com/architecture/architecture-events/designs-for-a-cooler-planet-exhibition-review-helsinki-finland"
  }
] as const;
