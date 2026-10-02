import { useRef } from 'react'
import { useInView } from 'framer-motion'

// Explanatory vector drawings: no invented product screenshots or results.
export function ServiceIllustration({ kind }: { kind: 'connect' | 'workflow' | 'develop' }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.5 })
  return <div ref={ref} className={`service-illustration ${visible ? 'is-visible' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 360 200" fill="none" focusable="false">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        {kind === 'connect' && <>
          <rect x="24" y="43" width="85" height="114" rx="8" /><path d="M24 72h85M39 58h8m9 0h8M41 91h48M41 107h34M41 123h42M41 139h20" />
          <rect x="251" y="43" width="85" height="114" rx="8" /><path d="M251 72h85M267 58h8m9 0h8M267 91h48M267 107h34M267 123h42M267 139h20" />
          <path className="illustration-line" d="M109 100h35m72 0h35" stroke="var(--primary)" strokeWidth="2" />
          <rect x="144" y="65" width="72" height="70" rx="14" fill="#250638" stroke="var(--primary)" />
          <path d="m168 88-12 12 12 12m24-24 12 12-12 12m-8-28-8 32" stroke="var(--primary)" />
        </>}
        {kind === 'workflow' && <>
          <path className="illustration-line" d="M62 58h104q14 0 14 14v56q0 14 14 14h104" stroke="var(--primary)" strokeWidth="2" />
          <rect x="22" y="32" width="80" height="54" rx="9" fill="#250638" /><path d="M39 45h35m-35 12h45m-45 12h24" />
          <circle cx="180" cy="100" r="24" fill="#12f4b9" stroke="#12f4b9" /><path d="m170 100 7 7 14-16" stroke="#121212" strokeWidth="2" />
          <rect x="258" y="114" width="80" height="54" rx="9" fill="#250638" /><path d="M275 127h35m-35 12h45m-45 12h24" />
          <path d="m118 52 6 6-6 6m113 72 6 6-6 6" stroke="var(--primary)" />
          <text x="23" y="111">ENTRADA</text><text x="258" y="94">PRÓXIMA ETAPA</text>
        </>}
        {kind === 'develop' && <>
          <rect x="27" y="27" width="238" height="144" rx="8" /><path d="M27 51h238M42 39h5m9 0h5m9 0h5" />
          <path d="M47 71h55v78H47zM118 71h124v29H118zM118 116h48v33h-48zM181 116h61v33h-61z" strokeOpacity=".65" />
          <rect x="239" y="70" width="77" height="120" rx="12" fill="#250638" stroke="var(--primary)" /><path d="M260 82h35M253 99h48v28h-48zM253 138h30M253 151h48m-24 22h1" stroke="var(--primary)" />
          <path className="illustration-line" d="M277 44h28q26 0 26 26v23" stroke="var(--primary)" />
        </>}
      </g>
    </svg>
  </div>
}
