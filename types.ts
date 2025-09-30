export type Section = { title: string };
export type Metadata = {
  period: string;
  subtitle: string;
  sections: Section[];
  generatedAt: string;
  locale?: string;
};
export type NewsItem = {
  pill: string;
  title: string; // titular conciso (≤~100c)
  dateISO: string; // YYYY-MM-DD
  source: string;
  url: string;
  image?: string; // opcional: para hero del titular principal
  imageAlt?: string;
  section: string; // debe existir en metadata.sections
};
export type Filters = {
  search: string;
  pill: string | null;
  section: string | null;
};