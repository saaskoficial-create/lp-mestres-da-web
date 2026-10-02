import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, ChartNoAxesCombined, Database, Factory, Radio, Truck, Warehouse } from 'lucide-react'
import type { PageContent, Segment } from '@/content/pages'
import { Cta } from './common'

export function Hero({ page, segment }: { page: PageContent; segment: Segment }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.18])
  const emphasis = segment === 'industria' ? 'software pronto.' : 'não conversam.'
  const titleStart = page.headline.slice(0, -emphasis.length)
  const icons = segment === 'industria' ? [Database, Factory, Warehouse, ChartNoAxesCombined] : [Truck, Database, Radio, Warehouse]
  return <section ref={ref} id="inicio" aria-labelledby="hero-title" className="hero hero-editorial" data-segment={segment}>
    <div className="container">
      <motion.div className="hero-copy hero-masthead" style={{ opacity: reduced ? 1 : opacity }} initial={false}>
        <div className="hero-heading"><p className="hero-context"><span aria-hidden="true" />{page.context}</p><h1 id="hero-title">{titleStart}<span>{emphasis}</span></h1></div>
        <div className="hero-summary"><p className="hero-introduction">{page.introduction}</p><div className="hero-actions"><Cta>{page.cta}</Cta><a className="quiet-link" href="#solucoes">Entenda as possibilidades<ArrowDown size={16} aria-hidden="true" /></a></div><p className="hero-note">Antes do código, entendemos sua operação.</p></div>
      </motion.div>
      <figure className="hero-panorama">
        <img src={`/images/${page.image}-1400.webp`} srcSet={`/images/${page.image}-700.webp 700w, /images/${page.image}-1400.webp 1400w`} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 64px), min(1300px, calc(100vw - 112px))" width="1400" height={segment === 'industria' ? '931' : '933'} alt={page.imageAlt} fetchPriority="high" />
        <figcaption className="hero-photo-caption"><span>{segment === 'industria' ? 'O chão de fábrica. A gestão. Uma operação.' : 'O armazém. O campo. Uma operação.'}</span><strong>{page.imageCaption}</strong></figcaption>
      </figure>
      <div className="hero-system-rail"><p>Seu processo.<br /><strong>Conectado.</strong></p><ol aria-label="Fluxo ilustrativo de sistemas conectados">{page.flow.map((item, index) => { const Icon = icons[index] ?? Database; return <li key={item}><Icon size={22} strokeWidth={1.4} aria-hidden="true" /><span>{item}</span>{index < page.flow.length - 1 && <ArrowRight className="rail-arrow" size={18} aria-hidden="true" />}</li> })}</ol></div>
      <div className="hero-proof"><p>Experiência para lidar<br />com o que é complexo.</p><div><strong>+1.000</strong><span>projetos desenvolvidos</span></div><div><strong>+10 anos</strong><span>de experiência no mercado</span></div><div><strong>5 ISOs</strong><span>qualidade, segurança e gestão</span></div></div>
    </div>
  </section>
}
