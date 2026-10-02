import { Logo } from './common'
import type { PageContent } from '@/content/pages'

export function Footer({ page }: { page: PageContent }) {
  return <footer className="site-footer"><div className="container"><div className="footer-main"><a href="#inicio" aria-label="Mestres da Web — início"><Logo /></a><p>Operações complexas.<br />Soluções que fazem sentido.</p><a href="#diagnostico" className="text-link">{page.cta}</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Mestres da Web.</span><nav aria-label="Páginas por segmento"><a href="/industria/">Indústria</a><a href="/logistica/">Logística</a></nav><a href="https://www.mestresdaweb.com.br/" target="_blank" rel="noreferrer">Site institucional</a></div></div></footer>
}
