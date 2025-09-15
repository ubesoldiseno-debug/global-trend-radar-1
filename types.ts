export type Item = {
  id: string
  title: string
  summary: string
  why: string
  tag: 'PACKAGING' | 'GRÁFICO' | 'BEAUTY' | 'TRANSVERSAL'
  sector: string
  date: string
  url: string
  image: string | null
}
