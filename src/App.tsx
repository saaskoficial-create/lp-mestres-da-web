import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { pageContent, type Segment } from '@/content/pages'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Experience, Fit, Integration, Problem, Solutions } from '@/components/Sections'
import { LeadForm } from '@/components/LeadForm'
import { Footer } from '@/components/Footer'

export function App({ pathname = '/' }: { pathname?: string }) {
  const path = pathname.replace(/\/+$/, '')
  const segment: Segment = path === '/logistica' ? 'logistica' : 'industria'
  const validPath = ['', '/industria', '/logistica'].includes(path)
  const page = pageContent[segment]
  useEffect(() => {
    document.title = validPath ? page.title : 'Página não encontrada | Mestres da Web'
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description)
  }, [page, validPath])
  if (!validPath) return <main className="not-found"><h1>Essa página não foi encontrada.</h1><p>Escolha o segmento da sua operação.</p><a href="/industria/">Indústria</a><a href="/logistica/">Logística</a></main>
  return <MotionConfig reducedMotion="user"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header page={page} /><main id="conteudo"><Hero page={page} segment={segment} /><Problem page={page} segment={segment} /><Solutions page={page} /><Integration page={page} segment={segment} /><Fit page={page} /><Experience /><LeadForm page={page} segment={segment} /></main><Footer page={page} /></MotionConfig>
}
