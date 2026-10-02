import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Database, Factory, Radio, Warehouse, Truck, Wallet, Workflow } from 'lucide-react'
import type { PageContent, Segment } from '@/content/pages'

gsap.registerPlugin(useGSAP)

export function IntegrationDiagram({ page, segment }: { page: PageContent; segment: Segment }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35, once: true })
  const reduced = useReducedMotion()
  const icons = segment === 'industria' ? [Database, Factory, Warehouse, Radio] : [Truck, Database, Radio, Wallet]
  useGSAP(() => {
    if (!inView || reduced) return
    gsap.from('.diagram-node', { opacity: 0, y: 8, stagger: 0.08, duration: 0.4, ease: 'power2.out' })
    gsap.fromTo('.connection-path', { strokeDashoffset: 360 }, { strokeDashoffset: 0, duration: 1.25, stagger: 0.12, ease: 'power2.inOut', delay: 0.15 })
  }, { scope: ref, dependencies: [inView, reduced], revertOnUpdate: true })
  return <div ref={ref} className="integration-diagram" role="img" aria-label={`Diagrama conceitual de integração de ${page.diagramLabels.join(', ')} pela Mestres da Web.`}>
    <svg viewBox="0 0 600 440" aria-hidden="true" className="connection-svg"><path d="M116 82 H215 Q245 82 245 112 V220 H270" /><path d="M484 82 H385 Q355 82 355 112 V220 H330" /><path d="M116 358 H215 Q245 358 245 328 V220 H270" /><path d="M484 358 H385 Q355 358 355 328 V220 H330" />{['M116 82 H215 Q245 82 245 112 V220 H270', 'M484 82 H385 Q355 82 355 112 V220 H330', 'M116 358 H215 Q245 358 245 328 V220 H270', 'M484 358 H385 Q355 358 355 328 V220 H330'].map(d => <path key={d} d={d} className="connection-path" />)}</svg>
    {page.diagramLabels.map((label, i) => { const Icon = icons[i] ?? Database; return <div className={`diagram-node node-${i}`} key={label}><Icon size={26} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></div> })}
    <div className="diagram-center"><Workflow size={38} strokeWidth={1.3} aria-hidden="true" /><strong>Seu processo</strong><span>Integração sob medida</span></div>
    <p className="diagram-caption">Os sistemas que você já usa.<br />Conectados à forma como você trabalha.</p>
  </div>
}
