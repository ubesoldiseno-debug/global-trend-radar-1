export type Tag = "PACKAGING" | "GRÁFICO" | "BEAUTY" | "TRANSVERSAL";
export interface Meta {
  sourceDomain: string;
  category: "Diseño/Creatividad" | "Packaging" | "Beauty" | "Consumo/Retail" | "Tech/IA" | "Sostenibilidad/Regulación" | "Mercados";
  region: "Global" | "ES" | "EU" | "US" | "APAC";
  paywall: boolean;
}
export interface Item {
  id: string; title: string; summary: string; why: string; tag: Tag; sector: string; date: string; url: string; image: string; meta: Meta;
}
