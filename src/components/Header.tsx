import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Logo } from './common'
import type { PageContent } from '@/content/pages'

const links = [{ href: '#operacao', label: 'Sua operação' }, { href: '#solucoes', label: 'Soluções' }, { href: '#experiencia', label: 'Quem desenvolve' }]

export function Header({ page }: { page: PageContent }) {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <div className="container header-inner">
      <a href="#inicio" className="brand-link" aria-label="Mestres da Web — início"><Logo /></a>
      <nav aria-label="Navegação principal" className="desktop-nav">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <a className="header-cta" href="#diagnostico">{page.cta}</a>
      <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="ghost" size="icon" className="menu-trigger" aria-label="Abrir menu"><Menu aria-hidden="true" /></Button></SheetTrigger><SheetContent className="mobile-sheet"><SheetTitle>Vamos conectar sua operação.</SheetTitle><SheetDescription>Conheça as soluções da Mestres da Web.</SheetDescription><nav aria-label="Menu mobile">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}<a href="#diagnostico" onClick={() => setOpen(false)}>{page.cta}</a></nav></SheetContent></Sheet>
    </div>
  </header>
}
