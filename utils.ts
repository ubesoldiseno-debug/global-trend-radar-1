export function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit' })
}
