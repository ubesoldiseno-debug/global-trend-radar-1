import React from 'react';
import Card from './Card';
import type { Item } from '../types';
export default function Section({title,items}:{title:string;items:Item[]}){
  return (<section className="section">
    <h2 className="section-title">{title}</h2>
    <div className="grid grid-section">{items.map((it,i)=>(<div key={i}><Card item={it}/></div>))}</div>
  </section>)
}
