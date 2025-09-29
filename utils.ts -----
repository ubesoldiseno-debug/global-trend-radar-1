export const MONTHS_ES = [
  "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"
] as const;

export function formatDateEs(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = MONTHS_ES[d.getMonth()];
  const yyyy = d.getFullYear();
  return `${dd} ${mm} ${yyyy}`;
}

export function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}