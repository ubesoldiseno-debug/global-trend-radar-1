export type Tag = 'PACKAGING'|'GRÁFICO'|'BEAUTY'|'TRANSVERSAL';
export interface NewsItem {
  id: string;
  title: string;
  url: string;
  why: string;
  tag: Tag;
  sector?: string;
  image?: string|null;
  date?: string;
}
