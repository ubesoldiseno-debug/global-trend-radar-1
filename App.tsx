import React from 'react';
import Header from './components/Header';
import Section from './components/Section';
import type { Item } from './types';
import { DATA_URL, WEEK_RANGE } from './constants';
import './assets/styles.css';

export default function App(){
  const [data, setData] = React.useState<Item[]>([]);
  React.useEffect(()=>{ fetch(DATA_URL).then(r=>r.json()).then(setData).catch(console.error); },[]);
  const destacados = data.filter(i=>i.category==='Destacados').slice(0,5);
  const novedades  = data.filter(i=>i.category==='Novedades');
  const watch      = data.filter(i=>i.category==='Watchlist');
  return (
    <div>
      <Header/>
      <main className="grid">
        <Section title="Destacados" items={destacados}/>
        <Section title="Novedades" items={novedades}/>
        <Section title="Watchlist" items={watch}/>
      </main>
      <footer className="footer">Radar curado automáticamente · {WEEK_RANGE}</footer>
    </div>
  );
}
