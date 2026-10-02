import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Check } from 'lucide-react'
import type { PageContent, Segment } from '@/content/pages'
import { Cta } from './common'

export function Hero({ page, segment }: { page: PageContent; segment: Segment }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.18])
  return <section ref={ref} id="inicio" aria-labelledby="hero-title" className="hero">
    <div className="container">
      <div className="hero-grid">
        <motion.div className="hero-copy" style={{ opacity: reduced ? 1 : opacity }} initial={false}>
          <p className="hero-context"><span aria-hidden="true" />{page.context}</p>
          <h1 id="hero-title">{page.headline}</h1>
          <p className="hero-introduction">{page.introduction}</p>
          <div className="hero-actions"><Cta>{page.cta}</Cta><a className="quiet-link" href="#solucoes">Entenda as possibilidades<ArrowDown size={16} aria-hidden="true" /></a></div>
          <p className="hero-note"><Check size={15} aria-hidden="true" />Começamos entendendo os processos da sua empresa.</p>
        </motion.div>
        <figure className="hero-visual">
          <img src={`/images/${page.image}-1400.webp`} srcSet={`/images/${page.image}-700.webp 700w, /images/${page.image}-1400.webp 1400w`} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 48vw, 600px" width="1400" height={segment === 'industria' ? '931' : '933'} alt={page.imageAlt} fetchPriority="high" />
          <figcaption><span>Uma operação integrada</span><strong>{page.imageCaption}</strong><div className="hero-flow">{page.flow.map((item, index) => <span key={item}>{item}{index < page.flow.length - 1 && <i aria-hidden="true">→</i>}</span>)}</div></figcaption>
        </figure>
      </div>
      <div className="hero-proof"><p>Experiência para lidar<br />com o que é complexo.</p><div><strong>+1.000</strong><span>projetos desenvolvidos</span></div><div><strong>+10 anos</strong><span>de experiência no mercado</span></div><div><strong>5 ISOs</strong><span>qualidade, segurança e gestão</span></div></div>
    </div>
  </section>
}
