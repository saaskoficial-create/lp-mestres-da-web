import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { pageContent } from '../src/content/pages.ts'

const template = await readFile('dist/index.html', 'utf8')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
for (const [segment, page] of Object.entries(pageContent)) {
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/>)/, `$1${escape(page.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/>)/, `$1${escape(page.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/>)/, `$1${escape(page.description)}$2`)
  await mkdir(`dist/${segment}`, { recursive: true })
  await writeFile(`dist/${segment}/index.html`, html)
}
console.log('HTML de Indústria e Logística gerado com metadados próprios.')
