import { useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Database, Factory, Radio, Warehouse, Truck, Wallet, Workflow } from 'lucide-react'
import type { PageContent, Segment } from '@/content/pages'
import { AnimatedBeam } from './AnimatedBeam'

export function IntegrationDiagram({ page, segment }: { page: PageContent; segment: Segment }) {
  const ref = useRef<HTMLDivElement>(null)
  const center = useRef<HTMLDivElement>(null)
  const node0 = useRef<HTMLDivElement>(null)
  const node1 = useRef<HTMLDivElement>(null)
  const node2 = useRef<HTMLDivElement>(null)
  const node3 = useRef<HTMLDivElement>(null)
  const nodes = [node0, node1, node2, node3]
  const inView = useInView(ref, { amount: 0.35, once: true })
  const reduced = useReducedMotion()
  const icons = segment === 'industria' ? [Database, Factory, Warehouse, Radio] : [Truck, Database, Radio, Wallet]
  useEffect(() => {
    if (!inView || reduced) return
    let disposed = false
    let context: { revert: () => void } | undefined
    void import('gsap').then(({ default: gsap }) => {
      if (disposed || !ref.current) return
      context = gsap.context(() => {
        gsap.from('.diagram-node', { opacity: 0, y: 8, stagger: 0.08, duration: 0.4, ease: 'power2.out' })
      }, ref)
    }).catch(() => { /* The static illustration remains available if animation cannot load. */ })
    return () => { disposed = true; context?.revert() }
  }, [inView, reduced])
  return <div ref={ref} className="integration-diagram" role="img" aria-label={`Diagrama conceitual de integração de ${page.diagramLabels.join(', ')} pela Mestres da Web.`}>
    {nodes.map((node, i) => <AnimatedBeam key={i} container={ref} from={node} to={center} curvature={i < 2 ? 55 : -55} delay={i * 0.16} />)}
    {page.diagramLabels.map((label, i) => { const Icon = icons[i] ?? Database; return <div ref={nodes[i]} className={`diagram-node node-${i}`} key={label}><Icon size={26} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></div> })}
    <div ref={center} className="diagram-center"><Workflow size={38} strokeWidth={1.3} aria-hidden="true" /><strong>Seu processo</strong><span>Integração sob medida</span></div>
    <p className="diagram-caption">Os sistemas que você já usa.<br />Conectados à forma como você trabalha.</p>
  </div>
}
