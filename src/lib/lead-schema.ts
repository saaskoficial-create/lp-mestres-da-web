import { z } from 'zod'
import { companySizes, pageContent, projectStages, revenueRanges, segments } from '../content/pages.ts'

export const leadSchema = z.object({
  segment: z.enum(segments),
  name: z.string().trim().min(2, 'Informe seu nome.').max(120),
  email: z.string().trim().email('Informe um e-mail válido.').max(254),
  phone: z.string().trim().max(30).refine(value => /^\+?[\d\s().-]+$/.test(value) && value.replace(/\D/g, '').length >= 10 && value.replace(/\D/g, '').length <= 15, 'Informe um telefone válido com DDD.'),
  company: z.string().trim().min(2, 'Informe o nome da empresa.').max(160),
  companySize: z.enum(companySizes, { errorMap: () => ({ message: 'Selecione o tamanho da empresa.' }) }),
  monthlyRevenue: z.enum(revenueRanges, { errorMap: () => ({ message: 'Selecione uma faixa de faturamento.' }) }),
  challenge: z.string().min(1, 'Selecione o principal desafio.').max(160),
  projectStage: z.enum(projectStages, { errorMap: () => ({ message: 'Selecione o estágio do projeto.' }) }),
  currentSystems: z.array(z.string().max(80)).min(1, 'Selecione pelo menos uma opção.').max(7),
}).superRefine((value, ctx) => {
  const page = pageContent[value.segment]
  if (!(page.challenges as readonly string[]).includes(value.challenge)) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['challenge'], message: 'Selecione um desafio deste segmento.' })
  if (value.currentSystems.some(item => !(page.systems as readonly string[]).includes(item)) || new Set(value.currentSystems).size !== value.currentSystems.length) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['currentSystems'], message: 'Revise os sistemas selecionados.' })
  if (value.currentSystems.includes('Não sei informar') && value.currentSystems.length > 1) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['currentSystems'], message: 'Use “Não sei informar” apenas quando não souber os sistemas.' })
})

export type LeadInput = z.infer<typeof leadSchema>
export type LeadResponse = { ok: boolean; available?: boolean; message: string; fieldErrors?: Partial<Record<keyof LeadInput, string[]>> }
