import { useRef, useSyncExternalStore, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Button } from './ui/button'

const subscribe = () => () => {}
const clientSnapshot = () => true
const serverSnapshot = () => false

export function Logo() {
  return <img className="brand-logo" src="/brand/mestres-logo-334.webp" srcSet="/brand/mestres-logo-334.webp 334w, /brand/mestres-logo-502.webp 502w, /brand/mestres-logo.webp 881w" sizes="(max-width: 600px) 133px, 167px" width="881" height="373" alt="Mestres da Web" />
}

export function Cta({ children, secondary = false }: { children: ReactNode; secondary?: boolean }) {
  return <Button asChild className={`cta ${secondary ? 'cta-secondary' : ''}`}><a href="#diagnostico">{children}<ArrowUpRight size={19} aria-hidden="true" /></a></Button>
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot)
  const inView = useInView(ref, { amount: 0.08, margin: '0px 0px -24px 0px' })
  const reduced = useReducedMotion()
  return <motion.div ref={ref} className={className} initial={false} animate={{ opacity: !hydrated || reduced || inView ? 1 : 0, transform: !hydrated || reduced || inView ? 'translateY(0px)' : 'translateY(16px)' }} transition={{ duration: inView ? 0.45 : 0.18, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}
