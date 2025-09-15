import React, { useEffect, useMemo, useState } from 'react'
import { Download, Link as LinkIcon, LayoutGrid, List as ListIcon, Calendar, Sparkles } from 'lucide-react'
import { classNames, getImageSrc } from './utils'

/**
 * Minisite: Radar Global de Tendencias
 * Versión estable y optimizada (estructura PLANA, sin /src).
 * Mantiene el mismo diseño exigido: 4 Destacados, 10 Novedades, 3 Watchlist.
 */

const seedTopActions = [
  { text: 'Sappi lanza papeles monomaterial con alta barrera reciclables (Guard Pro OHS/OMH)', url: 'https://packagingeurope.com/news/sappi-introduces-recyclable-high-barrier-mono-material-papers/13313.article' },
  { text: 'Bertolli introduce botella 100% rPET para aceite de oliva', url: 'https://packagingeurope.com/news/bertolli-unveils-100-rpet-bottle/13312.article' },
  { text: 'Metsä Group: piloto de captura de CO₂ en fábrica de pulpa (primero en la industria)', url: 'https://packagingeurope.com/news/industry-first-carbon-capture-pilot-plant-launches-at-mets%C3%A4-group-mill/13322.article' },
  { text: 'Xampla capta 14 M$ para sustituir plásticos de un solo uso', url: 'https://www.thetimes.co.uk/article/packaging-firm-xampla-raises-14m-to-replace-single-use-plastics-q8xk7drrr' }
]

const seedWatchlist = [
  { text: 'Domino presentará la prensa digital N410 en Labelexpo Barcelona', url: 'https://packagingeurope.com/article/1013.type' },
  { text: 'Strongbow prueba códigos NaviLens para accesibilidad', url: 'https://packagingeurope.com/news/strongbow-and-navilens-seek-to-improve-drinks-accessibility-with-qr-codes/13329.article' },
  { text: 'UPM & Royal Vassen: papeles barrera de fibra reciclables', url: 'https://packagingeurope.com/news/upm-and-royal-vassen-develop-recyclable-fibre-based-barrier-papers/13320.article' }
]

const seedData = [
  { id: 'sappi-guard-pro', title: 'Sappi presenta papeles monomaterial con alta barrera reciclables', url: 'https://packagingeurope.com/news/sappi-introduces-recyclable-high-barrier-mono-material-papers/13313.article', why: 'Guard Pro OHS/OMH permite sustituir laminados plásticos/aluminio con papel reciclable...', tag: 'PACKAGING', sector: 'Materiales & barreras', image: null, date: '2025-09-02' },
  { id: 'bertolli-rpet', title: 'Bertolli lanza botella 100% rPET para aceite de oliva', url: 'https://packagingeurope.com/news/bertolli-unveils-100-rpet-bottle/13312.article', why: 'Caso de uso masivo de rPET en AOVE...', tag: 'PACKAGING', sector: 'Rigid packaging / Bebidas', image: null, date: '2025-09-02' },
  { id: 'metsa-ccs', title: 'Metsä Group activa piloto de captura de CO₂ en fábrica de pulpa', url: 'https://packagingeurope.com/news/industry-first-carbon-capture-pilot-plant-launches-at-mets%C3%A4-group-mill/13322.article', why: 'Primer piloto del sector para capturar CO₂...', tag: 'TRANSVERSAL', sector: 'Descarbonización', image: null, date: '2025-09-05' },
  { id: 'nviro1-pet-closure', title: 'Tapón PET de Nviro1 aspira a reciclado monomaterial', url: 'https://packagingeurope.com/news/patented-pet-closure-from-nviro1-aspires-for-mono-material-pack-recycling/13323.article', why: 'Cierre PET pensado para reciclarse...', tag: 'PACKAGING', sector: 'Taponería & reciclado', image: null, date: '2025-09-05' },
  { id: 'tipa-label', title: 'TIPA/Bio4Pack: etiqueta ‘home compostable’ para frutas y verduras', url: 'https://packagingeurope.com/news/tipa-and-bio4pack-announce-certified-home-compostable-label-for-fresh-produce/13324.article', why: 'Nueva etiqueta certificada compostable...', tag: 'PACKAGING', sector: 'Etiquetado sostenible', image: null, date: '2025-09-06' },
  { id: 'samsara-plant', title: 'Samsara Eco abre su primera planta de reciclaje enzimático a escala', url: 'https://packagingeurope.com/news/samsara-eco-opens-first-plant-to-scale-low-carbon-circular-materials/13321.article', why: 'Aumenta capacidad para materiales circulares...', tag: 'TRANSVERSAL', sector: 'Reciclaje químico/enzimático', image: null, date: '2025-09-05' },
  { id: 'readers-award', title: 'Premio de los lectores 2025 de Packaging Europe abre nominaciones', url: 'https://packagingeurope.com/packaging-europes-readers-award-2025-is-open-for-submissions/13305.article', why: 'Escaparate de innovaciones...', tag: 'TRANSVERSAL', sector: 'Eventos & premios', image: null, date: '2025-09-03' },
  { id: 'soy-sauce-fish-ban', title: 'Australia del Sur prohíbe los ‘pez-soja’: avance contra componentes plásticos', url: 'https://packagingeurope.com/topics/recyclability', why: 'Medida regulatoria...', tag: 'TRANSVERSAL', sector: 'Regulación', image: null, date: '2025-09-02' },
  { id: 'domino-n410', title: 'Domino lanzará prensa LED inkjet N410 en Labelexpo Barcelona', url: 'https://packagingeurope.com/article/1013.type', why: 'Nueva plataforma...', tag: 'PACKAGING', sector: 'Impresión & converting', image: null, date: '2025-09-05' },
  { id: 'upm-royalvassen', title: 'UPM y Royal Vassen presentan papeles barrera de fibra reciclables', url: 'https://packagingeurope.com/news/upm-and-royal-vassen-develop-recyclable-fibre-based-barrier-papers/13320.article', why: 'Alta barrera...', tag: 'PACKAGING', sector: 'Materiales barrera', image: null, date: '2025-09-04' }
]

const TAGS = ['PACKAGING','GRÁFICO','BEAUTY','TRANSVERSAL'] as const

function tagTone(tag: string){
  switch(tag){
    case 'PACKAGING': return 'bg-neutral-900 text-white border-neutral-900'
    case 'GRÁFICO':  return 'bg-neutral-800 text-white border-neutral-800'
    case 'BEAUTY':   return 'bg-neutral-700 text-white border-neutral-700'
    default:         return 'bg-neutral-600 text-white border-neutral-600'
  }
}

function useLocalStorage<T>(key: string, initial: T){
  const [state, setState] = useState<T>(()=>{
    try{ const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : initial }catch{ return initial }
  })
  useEffect(()=>{ try{ localStorage.setItem(key, JSON.stringify(state)) }catch{} }, [key, state])
  return [state, setState] as const
}

export default function MinisiteRadar(){
  const [items, setItems] = useLocalStorage('radar.items.v2', seedData)
  const [topActions, setTopActions] = useLocalStorage('radar.topActions.v2', seedTopActions)
  const [watchlist, setWatchlist] = useLocalStorage('radar.watchlist.v2', seedWatchlist)
  const [activeTags, setActiveTags] = useLocalStorage('radar.filters', TAGS.slice())
  const [layout, setLayout] = useLocalStorage('radar.layout', 'grid')
  const [sortDesc, setSortDesc] = useLocalStorage('radar.sortDesc', true)

  // seguridad: datos visibles aunque el localStorage esté vacío
  useEffect(()=>{ if(!Array.isArray(items) || items.length===0) setItems(seedData) }, [items, setItems])
  useEffect(()=>{ if(!activeTags || (Array.isArray(activeTags) && activeTags.length===0)) setActiveTags(TAGS.slice()) }, [activeTags, setActiveTags])

  const filtered = useMemo(()=>{
    const pool = items.filter((it: any)=> activeTags.includes(it.tag))
    const sorted = [...pool].sort((a:any,b:any)=>{
      const da = new Date(a.date||0).getTime(); const db = new Date(b.date||0).getTime()
      return sortDesc ? db-da : da-db
    })
    return sorted
  }, [items, activeTags, sortDesc])

  const toggleTag = (t: typeof TAGS[number]) =>
    setActiveTags((prev:any)=> prev.includes(t) ? prev.filter((x:any)=>x!==t) : [...prev, t])
  const resetFilters = ()=> setActiveTags(TAGS.slice())

  const exportJSON = ()=>{
    const data = JSON.stringify({ items, topActions, watchlist }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a')
    a.href = url; a.download = 'radar_tendencias.json'; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-900'>
      <header className='sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-neutral-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4'>
          <div className='flex-1'>
            <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight'>Radar Global de Tendencias 1</h1>
            <p className='text-xs sm:text-sm text-neutral-500'>(8.9.25)</p>
          </div>
          <div className='flex items-center gap-2'>
            <button onClick={exportJSON} className='inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-white text-neutral-900 border border-neutral-200 text-sm shadow'><Download size={16}/><span>Exportar</span></button>
          </div>
        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
            <div className='lg:col-span-8 flex items-center gap-2 flex-wrap'>
              <div className='flex items-center gap-2 overflow-x-auto whitespace-nowrap -mx-2 px-2 sm:mx-0 sm:px-0 snap-x'>
                {TAGS.map((t)=>(
                  <button key={t} onClick={()=>toggleTag(t as any)} aria-pressed={activeTags.includes(t)} className={classNames('px-3 py-1.5 rounded-2xl text-sm border shadow-sm min-w-fit snap-start', activeTags.includes(t) ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-900 border-neutral-200')}>
                    {t}
                  </button>
                ))}
              </div>
              <button onClick={resetFilters} className='rounded-2xl px-3 py-1.5 text-sm bg-white border border-neutral-200 shadow'>Reset</button>
            </div>
            <div className='lg:col-span-4 flex items-center justify-end gap-2'>
              <div className='flex items-center gap-1 ml-2'>
                <button onClick={()=>setLayout('grid')} className={classNames('p-2 rounded-xl border', layout==='grid' ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white border-neutral-200')}><LayoutGrid size={16}/></button>
                <button onClick={()=>setLayout('list')} className={classNames('p-2 rounded-xl border', layout==='list' ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white border-neutral-200')}><ListIcon size={16}/></button>
              </div>
              <div className='flex items-center gap-1'>
                <span className='text-sm text-neutral-600 hidden sm:inline'>Fecha</span>
                <button onClick={()=>setSortDesc(!sortDesc)} className='rounded-xl px-2 py-1 text-sm bg-white border border-neutral-200 shadow'>{sortDesc ? '↓' : '↑'}</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className='my-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl p-5 bg-white border border-neutral-200 shadow-sm'>
          <h2 className='text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2'><Sparkles size={18}/> Destacados</h2>
          <ul className='mt-4 grid sm:grid-cols-2 gap-3'>
            {topActions.slice(0,4).map((a,i)=>(
              <li key={i} className='flex items-start gap-3'>
                <span className='mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white text-xs font-semibold'>{i+1}</span>
                <a href={a.url||'#'} target='_blank' className='group flex-1' rel='noreferrer'>
                  <p className='font-semibold leading-snug group-hover:underline'>{a.text}</p>
                  {a.url && <div className='text-xs text-neutral-500 inline-flex items-center gap-1 mt-1'><LinkIcon size={14}/> {a.url}</div>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className='my-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between mb-3'>
            <h3 className='text-lg sm:text-xl font-semibold'>Novedades <span className='text-neutral-500 font-normal'>({Math.min(filtered.length,10)})</span></h3>
          </div>

          {layout==='grid' ? (
            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-5'>
              {filtered.slice(0,10).map((it:any)=>(
                <div key={it.id} className='group rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-md'>
                  <div className='aspect-[16/9] bg-neutral-100 relative'>
                    <img src={getImageSrc(it)} alt={it.title} loading='lazy' className='absolute inset-0 w-full h-full object-cover'/>
                  </div>
                  <div className='p-4'>
                    <div className='flex items-center justify-between gap-2'>
                      <span className={classNames('text-[11px] tracking-wide px-2 py-0.5 rounded-full border', tagTone(it.tag))}>{it.tag}</span>
                      <span className='text-xs text-neutral-500 inline-flex items-center gap-1'><Calendar size={14}/> {it.date||'—'}</span>
                    </div>
                    <a href={it.url} target='_blank' className='mt-2 block text-lg font-bold leading-snug group-hover:underline' rel='noreferrer'>{it.title}</a>
                    <p className='mt-1 text-sm text-neutral-700 font-light'>{it.why}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='divide-y divide-neutral-200 rounded-3xl border border-neutral-200 bg-white shadow-sm'>
              {filtered.slice(0,10).map((it:any)=>(
                <div key={it.id} className='p-4 hover:bg-neutral-50'>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-2'>
                      <span className={classNames('text-[11px] tracking-wide px-2 py-0.5 rounded-full border', tagTone(it.tag))}>{it.tag}</span>
                      <span className='text-xs text-neutral-500 inline-flex items-center gap-1'><Calendar size={14}/> {it.date||'—'}</span>
                    </div>
                    <div className='text-xs text-neutral-500 truncate max-w-[50%]'>{it.url}</div>
                  </div>
                  <a href={it.url} target='_blank' className='mt-1 block text-lg font-bold leading-snug hover:underline' rel='noreferrer'>{it.title}</a>
                  <p className='mt-1 text-sm text-neutral-700 font-light'>{it.why}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className='mt-10 mb-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl p-5 bg-white border border-neutral-200 shadow-sm'>
          <h4 className='text-lg sm:text-xl font-semibold'>Watchlist</h4>
          <div className='mt-3 flex flex-wrap gap-2'>
            {watchlist.slice(0,3).map((w:any,i:number)=>(
              <a key={i} href={w.url||'#'} target='_blank' className='px-3 py-1.5 rounded-2xl bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 inline-flex items-center gap-2' rel='noreferrer'>
                <Sparkles size={16}/> <span className='text-sm'>{w.text}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className='border-t border-neutral-200 py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-neutral-500'>Radar Global de Tendencias 2025 · Grupo Ubesol</div>
      </footer>
    </div>
  )
}
