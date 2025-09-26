export type Tag = 'PACKAGING' | 'GRÁFICO' | 'BEAUTY' | 'TRANSVERSAL';

export interface TopAction { text: string; url: string; }
export interface Item {
  id: string;
  title: string;
  summary?: string;
  why?: string;
  tag: Tag;
  sector?: string;
  date?: string; // YYYY-MM-DD
  url: string;
  image?: string | null;
}
