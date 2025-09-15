import React, { useEffect, useMemo, useState } from 'react'
import { Download, Link as LinkIcon, LayoutGrid, List as ListIcon, Calendar, Sparkles } from 'lucide-react'

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
  { id: 'sappi-guard-pro', title: 'Sappi presenta papeles monomaterial con alta barrera reciclables', url: 'https://packagingeurope.com/news/sappi-introduces-recyclable-high-barrier-mono-material-papers/13313.article', why: 'Guard Pro OHS/OMH permite sustituir laminados...', tag: 'PACKAGING', sector: 'Materiales & barreras', image: null, date: '2025-09-02' },
  { id: 'bertolli-rpet', title: 'Bertolli lanza botella 100% rPET para aceite de oliva', url: 'https://packagingeurope.com/news/bertolli-unveils-100-rpet-bottle/13312.article', why: 'Caso de uso masivo de rPET...', tag: 'PACKAGING', sector: 'Rigid packaging / Bebidas', image: null, date: '2025-09-02' },
  { id: 'metsa-ccs', title: 'Metsä Group activa piloto de captura de CO₂ en fábrica de pulpa', url: 'https://packagingeurope.com/news/industry-first-carbon-capture-pilot-plant-launches-at-mets%C3%A4-group-mill/13322.article', why: 'Primer piloto del sector...', tag: 'TRANSVERSAL', sector: 'Descarbonización', image: null, date: '2025-09-05' },
  { id: 'nviro1-pet-closure', title: 'Tapón PET de Nviro1 aspira a reciclado monomaterial', url: 'https://packagingeurope.com/news/patented-pet-closure-from-nviro1-aspires-for-mono-material-pack-recycling/13323.article', why: 'Cierre PET pensado...', tag: 'PACKAGING', sector: 'Taponería & reciclado', image: null, date: '2025-09-05' },
  { id: 'tipa-label', title: 'TIPA/Bio4Pack: etiqueta ‘home compostable’ para frutas y verduras', url: 'https://packagingeurope.com/news/tipa-and-bio4pack-announce-certified-home-compostable-label-for-fresh-produce/13324.article', why: 'Nueva etiqueta certificada...', tag: 'PACKAGING', sector: 'Etiquetado sostenible', image: null, date: '2025-09-06' },
  { id: 'samsara-plant', title: 'Samsara Eco abre su primera planta de reciclaje enzimático a escala', url: 'https://packagingeurope.com/news/samsara-eco-opens-first-plant-to-scale-low-carbon-circular-materials/13321.article', why: 'Aumenta capacidad...', tag: 'TRANSVERSAL', sector: 'Reciclaje químico/enzimático', image: null, date: '2025-09-05' },
  { id: 'readers-award', title: 'Premio de los lectores 2025 de Packaging Europe abre nominaciones', url: 'https://packagingeurope.com/packaging-europes-readers-award-2025-is-open-for-submissions/13305.article', why: 'Escaparate...', tag: 'TRANSVERSAL', sector: 'Eventos & premios', image: null, date: '2025-09-03' },
  { id: 'domino-n410', title: 'Domino lanzará prensa LED inkjet N410 en Labelexpo Barcelona', url: 'https://packagingeurope.com/article/1013.type', why: 'Nueva plataforma...', tag: 'PACKAGING', sector: 'Impresión & converting', image: null, date: '2025-09-05' },
  { id: 'upm-royalvassen', title: 'UPM y Royal Vassen presentan papeles barrera de fibra reciclables', url: 'https://packagingeurope.com/news/upm-and-royal-vassen-develop-recyclable-fibre-based-barrier-papers/13320.article', why: 'Alta barrera...', tag: 'PACKAGING', sector: 'Materiales barrera', image: null, date: '2025-09-04' }
]

const TAGS = ['PACKAGING','GRÁFICO','BEAUTY','TRANSVERSAL'] as const

function classNames(...c:Array<string|false|null|undefined>){return c.filter(Boolean).join(' ')}

function getImageSrc(it: { image?: string|null; url?: string; title?: string }){
  if(it?.image && /^https?:\/\//.test(it.image)) return it.image
  if(it?.url){ try{ const encoded = encodeURIComponent(it.url); return `https://s.wordpress.com/mshots/v1/${encoded}?w=1200` }catch{} }
  return 'https://images.unsplash.com/photo-1496947850313-7743325fa58c?q=80&w=1600&auto=format&fit=crop'
}

export default function MinisiteRadar(){
  const [items, setItems] = useState<any[]>(seedData)
  const [topActions] = useState<any[]>(seedTopActions)
  const [watchlist] = useState<any[]>(seedWatchlist)
  const [activeTags, setActiveTags] = useState<string[]>(TAGS.slice() as any)
  const [layout, setLayout] = useState<'grid'|'list'>('grid')
  const [sortDesc, setSortDesc] = useState(true)

  useEffect(()=>{ if(!Array.isArray(items)||items.length===0) setItems(seedData) },[items])

  const filtered = useMemo(()=>{
    const pool = items.filter((it:any)=> activeTags.includes(it.tag))
    return [...pool].sort((a:any,b:any)=>{
      const da = new Date(a.date||0).getTime(); const db = new Date(b.date||0).getTime()
      return sortDesc ? db-da : da-db
    })
  },[items, activeTags, sortDesc])

  const toggleTag = (t: typeof TAGS[number]) => setActiveTags(p => p.includes(t as any) ? p.filter(x=>x!==t) : [...p, t])
  const resetFilters = ()=> setActiveTags(TAGS.slice() as any)

  const exportJSON = ()=>{
    const data = JSON.stringify({ items, topActions, watchlist }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a')
    a.href = url; a.download = 'radar_tendencias.json'; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className='min-h-screen' style={{background:'linear-gradient(#fff,#fafafa)', color:'#111'}}>
      <header className='sticky top-0' style={{backdropFilter:'saturate(180%) blur(8px)', background:'rgba(255,255,255,.85)', borderBottom:'1px solid #e5e7eb', zIndex:20}}>
        <div style={{maxWidth:1120, margin:'0 auto', padding:'16px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16}}>
          <div>
            <h1 style={{margin:0, fontSize:'clamp(28px,4vw,40px)', fontWeight:800}}>Radar Global de Tendencias 1</h1>
            <div style={{color:'#6b7280', fontSize:12}}>(8.9.25)</div>
          </div>
          <button onClick={exportJSON} style={{display:'inline-flex', gap:8, alignItems:'center', border:'1px solid #e5e7eb', borderRadius:14, padding:'8px 12px', background:'#fff'}}>Exportar</button>
        </div>
        <div style={{maxWidth:1120, margin:'0 auto', padding:'0 16px 12px'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr auto auto', gap:8, alignItems:'center'}}>
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {TAGS.map((t)=> (
                <button key={t} onClick={()=>toggleTag(t)} style={{fontSize:12, border:'1px solid #111', borderRadius:999, padding:'4px 10px', background:'#111', color:'#fff'}}>{t}</button>
              ))}
              <button onClick={resetFilters} style={{border:'1px solid #e5e7eb', borderRadius:14, padding:'6px 10px', background:'#fff'}}>Reset</button>
            </div>
            <div>
              <button onClick={()=>setLayout('grid')} style={{border:'1px solid #e5e7eb', borderRadius:12, padding:8, background: layout==='grid' ? '#111' : '#fff', color: layout==='grid' ? '#fff' : '#111'}}>Grid</button>
            </div>
            <div style={{display:'flex', gap:6, alignItems:'center'}}>
              <span style={{fontSize:12, color:'#6b7280'}}>Fecha</span>
              <button onClick={()=>setSortDesc(v=>!v)} style={{border:'1px solid #e5e7eb', borderRadius:12, padding:'4px 8px', background:'#fff'}}>{sortDesc ? '↓' : '↑'}</button>
            </div>
          </div>
        </div>
      </header>

      <section style={{maxWidth:1120, margin:'16px auto 0', padding:'0 16px'}}>
        <div style={{border:'1px solid #e5e7eb', borderRadius:24, padding:16, background:'#fff', boxShadow:'0 1px 2px rgba(17,24,39,.05)'}}>
          <h2 style={{margin:'0 0 12px', fontSize:22, fontWeight:800, display:'flex', alignItems:'center', gap:8}}>✦ Destacados</h2>
          <ul style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px,1fr))', gap:12, listStyle:'none', padding:0, margin:0}}>
            {seedTopActions.slice(0,4).map((a,i)=>(
              <li key={i} style={{display:'flex', gap:12}}>
                <span style={{display:'inline-flex', alignItems:'center', justifyContent:'center', width:24, height:24, borderRadius:999, background:'#111', color:'#fff', fontSize:12, fontWeight:700}}>{i+1}</span>
                <a href={a.url||'#'} target='_blank' rel='noreferrer' style={{color:'inherit', textDecoration:'none'}}>
                  <div style={{fontWeight:600}}>{a.text}</div>
                  {a.url && <div style={{fontSize:12, color:'#6b7280', display:'inline-flex', gap:6, marginTop:4}}>🔗 <span>{a.url}</span></div>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{maxWidth:1120, margin:'16px auto 0', padding:'0 16px'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
          <h3 style={{margin:0, fontSize:20, fontWeight:700}}>Novedades <span style={{fontWeight:400, color:'#6b7280'}}>({Math.min(filtered.length,10)})</span></h3>
        </div>
        {layout==='grid' ? (
          <div style={{display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))'}}>
            {filtered.slice(0,10).map((it:any)=>(
              <div key={it.id} style={{border:'1px solid #e5e7eb', borderRadius:20, overflow:'hidden', background:'#fff', boxShadow:'0 1px 2px rgba(17,24,39,.05)'}}>
                <div style={{position:'relative', background:'#f3f4f6', aspectRatio:'16/9', overflow:'hidden'}}>
                  <img src={getImageSrc(it)} alt={it.title} loading='lazy' style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover'}}/>
                </div>
                <div style={{padding:12}}>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
                    <span style={{fontSize:11, padding:'2px 8px', borderRadius:999, background:'#111', color:'#fff'}}> {it.tag} </span>
                    <span style={{fontSize:12, color:'#6b7280'}}>🗓 {it.date||'—'}</span>
                  </div>
                  <a href={it.url} target='_blank' rel='noreferrer' style={{display:'block', marginTop:8, fontWeight:700, fontSize:18, color:'inherit', textDecoration:'none'}}>{it.title}</a>
                  <p style={{marginTop:6, fontSize:14, color:'#374151'}}>{it.why||''}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{border:'1px solid #e5e7eb', borderRadius:20, background:'#fff', boxShadow:'0 1px 2px rgba(17,24,39,.05)'}}>
            {filtered.slice(0,10).map((it:any)=>(
              <div key={it.id} style={{padding:'12px 16px', borderTop:'1px solid #e5e7eb'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
                  <div style={{display:'flex', gap:8, alignItems:'center'}}>
                    <span style={{fontSize:11, padding:'2px 8px', borderRadius:999, background:'#111', color:'#fff'}}>{it.tag}</span>
                    <span style={{fontSize:12, color:'#6b7280'}}>🗓 {it.date||'—'}</span>
                  </div>
                  <div style={{fontSize:12, color:'#6b7280', maxWidth:'50%', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{it.url}</div>
                </div>
                <a href={it.url} target='_blank' rel='noreferrer' style={{display:'block', marginTop:4, fontWeight:700, fontSize:18, color:'inherit', textDecoration:'none'}}>{it.title}</a>
                <p style={{marginTop:4, fontSize:14, color:'#374151'}}>{it.why||''}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{maxWidth:1120, margin:'24px auto 32px', padding:'0 16px'}}>
        <div style={{border:'1px solid #e5e7eb', borderRadius:24, padding:16, background:'#fff', boxShadow:'0 1px 2px rgba(17,24,39,.05)'}}>
          <h4 style={{margin:'0 0 10px', fontSize:20, fontWeight:700}}>Watchlist</h4>
          <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
            {seedWatchlist.slice(0,3).map((w:any,i:number)=>(
              <a key={i} href={w.url||'#'} target='_blank' rel='noreferrer' style={{display:'inline-flex', alignItems:'center', gap:6, padding:'8px 10px', borderRadius:999, background:'#f9fafb', border:'1px solid #e5e7eb', color:'inherit', textDecoration:'none'}}>
                ✦ <span style={{fontSize:14}}>{w.text}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer style={{borderTop:'1px solid #e5e7eb', padding:'24px', textAlign:'center', color:'#6b7280', marginTop:32}}>
        Radar Global de Tendencias 2025 · Grupo Ubesol
      </footer>
    </div>
  )
}
