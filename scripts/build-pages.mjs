import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createServer, loadEnv } from 'vite'
import { pageContent } from '../src/content/pages.ts'

let template = await readFile('dist/index.html', 'utf8')
// Small LP stylesheet is inlined to remove a render-blocking request.
for (const match of template.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)) {
  const css = await readFile(`dist${match[1]}`, 'utf8')
  template = template.replace(match[0], `<style>${css}</style>`)
}
template = template.replaceAll('rel="modulepreload"', 'rel="modulepreload" fetchpriority="low"').replace('type="module" crossorigin', 'type="module" fetchpriority="low" crossorigin')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
const origin = env.SITE_URL ? new URL(env.SITE_URL).origin : ''
if (origin && !/^https?:\/\//.test(origin)) throw new Error('SITE_URL deve ser uma URL HTTP(S) pública.')
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
try {
const { render } = await server.ssrLoadModule('/src/entry-server.tsx')
for (const [segment, page] of Object.entries(pageContent)) {
  const url = origin ? `${origin}/${segment}/` : ''
  const graph = [
    { '@type': 'Organization', '@id': 'https://www.mestresdaweb.com.br/#organization', name: 'Mestres da Web', url: 'https://www.mestresdaweb.com.br/' },
    { '@type': 'Service', name: page.context, description: page.description, serviceType: 'Desenvolvimento de software sob medida e integrações', areaServed: { '@type': 'Country', name: 'Brasil' }, provider: { '@id': 'https://www.mestresdaweb.com.br/#organization' }, ...(url ? { url } : {}) },
    { '@type': 'WebPage', name: page.title, description: page.description, inLanguage: 'pt-BR', ...(url ? { url } : {}) },
  ]
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c')
  const seo = `<script type="application/ld+json">${schema}</script>` + (url ? `<link rel="canonical" href="${escape(url)}" /><meta property="og:url" content="${escape(url)}" /><meta property="og:image" content="${origin}/images/${page.image}-1400.webp" /><meta name="twitter:image" content="${origin}/images/${page.image}-1400.webp" />` : '')
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/>)/, `$1${escape(page.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/>)/, `$1${escape(page.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/>)/, `$1${escape(page.description)}$2`)
    .replace('<div id="root"></div>', `<div id="root">${render(`/${segment}/`)}</div>`)
    .replace('</head>', `${seo}</head>`)
  await mkdir(`dist/${segment}`, { recursive: true })
  await writeFile(`dist/${segment}/index.html`, html)
  if (segment === 'industria') await writeFile('dist/index.html', html)
}
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`)
if (origin) await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pageContent).map(segment => `<url><loc>${escape(`${origin}/${segment}/`)}</loc></url>`).join('')}</urlset>`)
console.log('Indústria e Logística pré-renderizadas: conteúdo completo em HTML, metadados e Schema.org.')
} finally { await server.close() }
