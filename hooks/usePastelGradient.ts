import { useMemo } from 'react';
const pastel = () => `hsl(${Math.floor(Math.random()*360)} 70% 85%)`;
export function usePastelGradient(){ return useMemo(()=>({background:`linear-gradient(135deg, ${pastel()}, ${pastel()})`}),[]) }
