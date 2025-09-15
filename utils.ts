export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');
export const formatDate = (iso: string) => new Date(iso + 'T00:00:00').toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit' });
