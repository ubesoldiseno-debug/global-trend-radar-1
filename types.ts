export type Item = {
  category: 'Destacados' | 'Novedades' | 'Watchlist';
  title: string;
  source: string;
  date: string; // YYYY-MM-DD
  url: string;  // direct article link
  image?: string;
};
