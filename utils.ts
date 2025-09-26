export function classNames(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ')
}

export function getMshot(url?: string) {
  if(!url) return undefined
  try {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200`
  } catch {
    return undefined
  }
}

export function svgFallback(title?: string) {
  const t = (title || 'Tendencias').slice(0,80).replace(/</g,'&lt;').replace(/>/g,'&gt;')
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fafafa"/><stop offset="1" stop-color="#f3f4f6"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#g)"/>
      <text x="50%" y="50%" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="40" fill="#111">${t}</text>
    </svg>`
  )
}
