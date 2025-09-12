import React from 'react';
import type { Item } from '../types';
import { usePastelGradient } from '../hooks/usePastelGradient';
export default function Card({item}:{item:Item}){
  const grad = usePastelGradient();
  const [err,setErr] = React.useState(false);
  return (<article className="card">
    <div className="media" style={!item.image||err?grad:undefined}>
      {item.image&&!err && <img src={item.image} alt={item.title} onError={()=>setErr(true)} />}
    </div>
    <div className="content">
      <div className="badge">{item.category}</div>
      <a className="title-link" href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
      <div className="meta"><span>{item.source}</span> · <time>{item.date}</time></div>
    </div>
  </article>)
}
