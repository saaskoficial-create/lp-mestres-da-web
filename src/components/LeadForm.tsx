import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, CircleAlert, LoaderCircle, LockKeyhole } from 'lucide-react'
import { companySizes, projectStages, revenueRanges, type PageContent, type Segment } from '@/content/pages'
import { leadSchema, type LeadInput, type LeadResponse } from '@/lib/lead-schema'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { NativeSelect, NativeSelectOption } from './ui/native-select'

export function LeadForm({ page, segment }: { page: PageContent; segment: Segment }) {
  const [availability, setAvailability] = useState<'checking' | 'available' | 'unavailable'>('checking')
  const [attempt, setAttempt] = useState(0)
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()
  const { register, handleSubmit, setError, formState: { errors, isSubmitting, isDirty } } = useForm<LeadInput>({ resolver: zodResolver(leadSchema), mode: 'onBlur', defaultValues: { segment, currentSystems: [] } })

  useEffect(() => {
    let active = true
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 8_000)
    async function check() {
      try {
        const response = await fetch('/api/leads', { signal: controller.signal })
        const data: LeadResponse = await response.json()
        if (!response.ok || !data.ok) throw new Error('Unavailable')
        if (active) setAvailability(data.available ? 'available' : 'unavailable')
      } catch { if (active) setAvailability('unavailable') }
      finally { window.clearTimeout(timer) }
    }
    void check()
    return () => { active = false; window.clearTimeout(timer); controller.abort() }
  }, [attempt])

  useEffect(() => { if (feedback?.success) successRef.current?.focus() }, [feedback])

  useEffect(() => {
    if (!isDirty || feedback?.success) return
    const preserveWork = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = '' }
    window.addEventListener('beforeunload', preserveWork)
    return () => window.removeEventListener('beforeunload', preserveWork)
  }, [isDirty, feedback?.success])

  async function submit(values: LeadInput) {
    if (availability !== 'available') return
    setFeedback(null)
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values), signal: AbortSignal.timeout(16_000) })
      const data: LeadResponse = await response.json()
      if (!response.ok || !data.ok) {
        if (response.status === 503) setAvailability('unavailable')
        for (const [field, messages] of Object.entries(data.fieldErrors ?? {})) {
          if (['name', 'email', 'phone', 'company', 'companySize', 'monthlyRevenue', 'challenge', 'projectStage', 'currentSystems'].includes(field) && messages?.[0]) setError(field as keyof LeadInput, { message: messages[0] })
        }
        throw new Error(data.message || 'Não foi possível enviar agora. Tente novamente.')
      }
      setFeedback({ success: true, message: data.message })
    } catch (error) {
      setFeedback({ success: false, message: error instanceof Error && !['TimeoutError', 'TypeError'].includes(error.name) ? error.message : 'Não foi possível confirmar o envio. Suas informações foram mantidas. Tente novamente em instantes.' })
    }
  }

  const inputs = [
    { name: 'name', label: 'Nome', placeholder: 'Seu nome', type: 'text', autoComplete: 'name', max: 120 },
    { name: 'email', label: 'E-mail', placeholder: 'voce@empresa.com.br', type: 'email', autoComplete: 'email', max: 254 },
    { name: 'phone', label: 'Telefone', placeholder: '(11) 99999-9999', type: 'tel', autoComplete: 'tel', max: 30 },
    { name: 'company', label: 'Nome da empresa', placeholder: 'Sua empresa', type: 'text', autoComplete: 'organization', max: 160 },
  ] as const
  const selects = [
    { name: 'companySize', label: 'Qual é o tamanho da empresa?', placeholder: 'Selecione o tamanho', options: companySizes, wide: false },
    { name: 'monthlyRevenue', label: 'Qual é o faturamento mensal da empresa?', placeholder: 'Selecione uma faixa', options: revenueRanges, wide: false },
    { name: 'challenge', label: 'Qual é o principal desafio hoje?', placeholder: 'Selecione o desafio', options: page.challenges, wide: true },
    { name: 'projectStage', label: 'Qual é o estágio desse projeto?', placeholder: 'Selecione o momento', options: projectStages, wide: true },
  ] as const

  return <section className="section form-section" id="diagnostico" aria-labelledby="form-title"><div className="container form-layout"><div className="form-intro"><p className="form-context">Vamos entender sua operação</p><h2 id="form-title">{page.formTitle}</h2><p>{page.formIntro}</p><div className="form-next"><h3>Antes do código, uma conversa.</h3><p>Conte o que acontece hoje. Nosso primeiro passo é entender o problema que sua empresa precisa resolver.</p></div><p className="privacy-note"><LockKeyhole size={17} aria-hidden="true" />Seus dados serão usados para analisar a solicitação e entrar em contato sobre o projeto.</p></div><div className="form-card">
    {feedback?.success ? <motion.div className="form-success" role="status" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}><CheckCircle2 size={48} aria-hidden="true" /><h3 ref={successRef} tabIndex={-1}>Vamos conversar sobre seu projeto.</h3><p>{feedback.message}</p><a href="#inicio" className="text-link">Voltar ao início</a></motion.div> : <>
      <div className="form-card-heading"><h3>Conte o seu desafio.</h3><p>Todos os campos são obrigatórios. Para faturamento, você pode escolher “Prefiro não informar”.</p></div>
      <form noValidate aria-label={`Diagnóstico de ${page.name.toLowerCase()}`} aria-busy={isSubmitting} onSubmit={handleSubmit(submit)}><noscript><p className="form-alert">Ative o JavaScript do navegador para preencher e enviar este formulário.</p></noscript>
        <input type="hidden" {...register('segment')} />
        <fieldset disabled={isSubmitting} className="form-grid"><legend className="sr-only">Informações da empresa e do projeto</legend>
          {inputs.map(field => <div className="form-field" key={field.name}><Label htmlFor={field.name}>{field.label}</Label><Input id={field.name} type={field.type} spellCheck={field.type !== 'email'} placeholder={field.placeholder} autoComplete={field.autoComplete} maxLength={field.max} inputMode={field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : undefined} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} {...register(field.name)} />{errors[field.name] && <p className="field-error" aria-live="polite" id={`${field.name}-error`}>{errors[field.name]?.message}</p>}</div>)}
          {selects.map(field => <div className={`form-field ${field.wide ? 'field-wide' : ''}`} key={field.name}><Label htmlFor={field.name}>{field.label}</Label><NativeSelect id={field.name} defaultValue="" aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} {...register(field.name)}><NativeSelectOption value="" disabled>{field.placeholder}</NativeSelectOption>{field.options.map(option => <NativeSelectOption value={option} key={option}>{option}</NativeSelectOption>)}</NativeSelect>{errors[field.name] && <p id={`${field.name}-error`} className="field-error" aria-live="polite">{errors[field.name]?.message}</p>}</div>)}
          <fieldset className="systems-field field-wide" aria-describedby={errors.currentSystems ? 'systems-help currentSystems-error' : 'systems-help'}><legend>Quais sistemas sua empresa utiliza hoje?</legend><p id="systems-help">Você pode selecionar mais de uma opção.</p><div className="system-options">{page.systems.map((system, i) => <label htmlFor={`system-${i}`} key={system}><input id={`system-${i}`} type="checkbox" value={system} {...register('currentSystems')} /><span>{system}</span></label>)}</div>{errors.currentSystems && <p className="field-error" aria-live="polite" id="currentSystems-error">{errors.currentSystems.message}</p>}</fieldset>
        </fieldset>
        {availability === 'unavailable' && <div className="form-alert" role="status"><CircleAlert size={19} aria-hidden="true" /><div><p>O envio está temporariamente indisponível. Tente novamente mais tarde.</p><button type="button" onClick={() => { setAvailability('checking'); setAttempt(value => value + 1) }}>Verificar novamente</button></div></div>}
        <AnimatePresence>{feedback && !feedback.success && <motion.div key="error" className="form-alert form-failure" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><CircleAlert size={19} aria-hidden="true" /><p>{feedback.message}</p></motion.div>}</AnimatePresence>
        <Button type="submit" className="cta form-submit" disabled={isSubmitting || availability !== 'available'}>{isSubmitting ? <><LoaderCircle className="animate-spin" size={18} aria-hidden="true" />Enviando informações…</> : availability === 'checking' ? <><LoaderCircle className="animate-spin" size={18} aria-hidden="true" />Verificando disponibilidade…</> : <>{page.cta}<ArrowUpRight size={19} aria-hidden="true" /></>}</Button>
      </form>
    </>}
  </div></div></section>
}
