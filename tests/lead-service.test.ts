import { createServer } from 'node:http'
import { afterEach, describe, expect, it } from 'vitest'
import { createLeadService } from '../server/lead-service.ts'
import { handleNodeRequest } from '../server/node-handler.ts'
import type { LeadInput } from '../src/lib/lead-schema.ts'

const valid: LeadInput = { segment: 'industria', name: 'Contato teste', email: 'contato@example.com', phone: '(11) 99999-9999', company: 'Empresa teste', companySize: '51 a 100 funcionários', monthlyRevenue: 'Prefiro não informar', challenge: 'Integrar ERP com outros sistemas', projectStage: 'Projeto já aprovado internamente', currentSystems: ['SAP', 'TOTVS'] }
const servers: ReturnType<typeof createServer>[] = []
afterEach(async () => { await Promise.all(servers.splice(0).map(server => new Promise<void>(resolve => { server.closeAllConnections(); server.close(() => resolve()) }))) })

describe('encaminhamento de diagnósticos', () => {
  it('informa indisponibilidade sem configuração e não confirma recebimento', async () => {
    const handler = createLeadService({ getWebhookUrl: () => undefined })
    expect((await handler('GET')).body.available).toBe(false)
    expect((await handler('POST', valid)).status).toBe(503)
  })
  it('não expõe o webhook e rejeita protocolos inválidos', async () => {
    const handler = createLeadService({ getWebhookUrl: () => 'https://example.com/private-hook' })
    expect(JSON.stringify(await handler('GET'))).not.toContain('private-hook')
    expect((await createLeadService({ getWebhookUrl: () => 'file:///secret' })('GET')).body.available).toBe(false)
  })
  it('valida contato e escolhas antes de encaminhar', async () => {
    const handler = createLeadService({ getWebhookUrl: () => 'https://example.com' })
    const result = await handler('POST', { ...valid, email: 'inválido', phone: '123', currentSystems: [] })
    expect(result.status).toBe(400)
    expect(result.body.fieldErrors).toHaveProperty('email')
    expect(result.body.fieldErrors).toHaveProperty('currentSystems')
  })
  it('impede escolhas de indústria em um lead de logística', async () => {
    const handler = createLeadService({ getWebhookUrl: () => 'https://example.com' })
    const result = await handler('POST', { ...valid, segment: 'logistica' })
    expect(result.status).toBe(400)
    expect(result.body.fieldErrors).toHaveProperty('challenge')
    expect(result.body.fieldErrors).toHaveProperty('currentSystems')
  })
  it('não aceita “não sei” junto de sistemas conhecidos', async () => {
    const handler = createLeadService({ getWebhookUrl: () => 'https://example.com' })
    expect((await handler('POST', { ...valid, currentSystems: ['SAP', 'Não sei informar'] })).status).toBe(400)
  })
  it('encaminha a um webhook HTTP real e normaliza o telefone', async () => {
    let delivered: unknown
    const webhook = createServer(async (req, res) => { const chunks = []; for await (const chunk of req) chunks.push(chunk); delivered = JSON.parse(Buffer.concat(chunks).toString()); res.writeHead(202); res.end() })
    servers.push(webhook)
    await new Promise<void>(resolve => webhook.listen(0, '127.0.0.1', resolve))
    const address = webhook.address()
    if (!address || typeof address === 'string') throw new Error('No address')
    const handler = createLeadService({ getWebhookUrl: () => `http://127.0.0.1:${address.port}` })
    const result = await handler('POST', { ...valid, untrustedExtra: 'discard me' })
    expect(result.status).toBe(200)
    expect(result.body.ok).toBe(true)
    expect(delivered).toMatchObject({ source: 'lp-mestres-da-web', lead: { segment: 'industria', phone: '11999999999', currentSystems: ['SAP', 'TOTVS'] } })
    expect(JSON.stringify(delivered)).not.toContain('untrustedExtra')
  })
  it('não confirma quando o destino falha ou a conexão expira', async () => {
    const failing = createLeadService({ getWebhookUrl: () => 'https://example.com', fetcher: async () => new Response('', { status: 500 }) })
    expect((await failing('POST', valid)).body.ok).toBe(false)
    const timeout = createLeadService({ getWebhookUrl: () => 'https://example.com', fetcher: async () => { throw new Error('timeout') } })
    expect((await timeout('POST', valid)).status).toBe(502)
  })
  it('trata JSON inválido e corpo acima do limite pelo endpoint HTTP', async () => {
    const api = createServer((req, res) => { void handleNodeRequest(req, res, createLeadService({ getWebhookUrl: () => undefined })) })
    servers.push(api)
    await new Promise<void>(resolve => api.listen(0, '127.0.0.1', resolve))
    const address = api.address()
    if (!address || typeof address === 'string') throw new Error('No address')
    const url = `http://127.0.0.1:${address.port}`
    expect((await fetch(url, { method: 'POST', body: '{' })).status).toBe(400)
    expect((await fetch(url, { method: 'POST', body: 'a'.repeat(17_000) })).status).toBe(413)
    expect((await fetch(url, { method: 'DELETE' })).status).toBe(405)
  })
})
