export function classNames(...c: Array<string|false|null|undefined>){
  return c.filter(Boolean).join(' ')
}

export function getImageSrc(it: { image?: string|null; url?: string; title?: string }){
  if (it?.image && /^https?:\/\//.test(it.image)) return it.image as string
  if (it?.url){
    try{
      const encoded = encodeURIComponent(it.url)
      return `https://s.wordpress.com/mshots/v1/${encoded}?w=1200`
    }catch{}
  }
  return 'https://images.unsplash.com/photo-1496947850313-7743325fa58c?q=80&w=1600&auto=format&fit=crop'
}
