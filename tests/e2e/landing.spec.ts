import { expect, test } from '@playwright/test'
import { pageContent, type Segment } from '../../src/content/pages.ts'

for (const segment of ['industria', 'logistica'] as const) {
  for (const width of [360, 390, 768, 1440]) {
    test(`${segment}: navegação e layout em ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 })
      const errors: string[] = []
      page.on('pageerror', error => errors.push(error.message))
      await page.goto(`/${segment}/`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(pageContent[segment].headline)
      await expect(page).toHaveTitle(pageContent[segment].title)
      await page.evaluate(() => document.fonts.ready)
      expect(await page.evaluate(() => ({ heading: getComputedStyle(document.querySelector('h1')!).fontFamily, body: getComputedStyle(document.body).fontFamily }))).toMatchObject({ heading: '"Space Grotesk Variable", sans-serif', body: '"DM Sans Variable", sans-serif' })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      await expect(page.locator('section')).toHaveCount(7)
      if (width < 860) {
        const trigger = page.getByRole('button', { name: 'Abrir menu' })
        await trigger.click()
        await expect(page.getByRole('dialog')).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(page.getByRole('dialog')).not.toBeVisible()
        await expect(trigger).toBeFocused()
      }
      await page.screenshot({ path: `test-results/${segment}-${width}-hero.png` })
      await page.locator('.hero .cta').click()
      await expect(page).toHaveURL(new RegExp('#diagnostico$'))
      await expect(page.locator('.form-alert')).toContainText('temporariamente indisponível')
      await expect(page.getByRole('button', { name: pageContent[segment].cta, exact: true })).toBeDisabled()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      await page.screenshot({ path: `test-results/${segment}-${width}-form.png` })
      expect(errors).toEqual([])
    })
  }
}

async function fillForm(page: import('@playwright/test').Page, segment: Segment) {
  await page.getByLabel('Nome', { exact: true }).fill('Contato de teste')
  await page.getByLabel('E-mail', { exact: true }).fill('contato@example.com')
  await page.getByLabel('Telefone', { exact: true }).fill('(11) 99999-9999')
  await page.getByLabel('Nome da empresa', { exact: true }).fill('Empresa de teste')
  await page.getByLabel('Qual é o tamanho da empresa?').selectOption('51 a 100 funcionários')
  await page.getByLabel('Qual é o faturamento mensal da empresa?').selectOption('Prefiro não informar')
  await page.getByLabel('Qual é o principal desafio hoje?').selectOption(pageContent[segment].challenges[0])
  await page.getByLabel('Qual é o estágio desse projeto?').selectOption('Projeto já aprovado internamente')
  await page.getByRole('checkbox', { name: pageContent[segment].systems[0], exact: true }).check()
}

for (const segment of ['industria', 'logistica'] as const) {
  test(`${segment}: validação, pendência, falha com retenção e sucesso`, async ({ page }) => {
    let mode: 'pending' | 'failure' | 'success' = 'pending'
    let release: (() => void) | undefined
    let delivered: Record<string, unknown> | undefined
    await page.route('**/api/leads', async route => {
      if (route.request().method() === 'GET') return route.fulfill({ json: { ok: true, available: true, message: 'Disponível' } })
      delivered = route.request().postDataJSON()
      if (mode === 'pending') await new Promise<void>(resolve => { release = resolve })
      await route.fulfill({ status: mode === 'success' ? 200 : 502, json: { ok: mode === 'success', message: mode === 'success' ? 'Recebemos suas informações.' : 'Não foi possível enviar agora. Suas informações foram mantidas.' } })
    })
    await page.goto(`/${segment}/#diagnostico`)
    const submit = page.getByRole('button', { name: pageContent[segment].cta, exact: true })
    await expect(submit).toBeEnabled()
    await submit.click()
    await expect(page.getByText('Informe seu nome.', { exact: true })).toBeVisible()
    await fillForm(page, segment)
    await submit.click()
    await expect(page.getByRole('button', { name: 'Enviando informações…' })).toBeDisabled()
    mode = 'failure'
    release?.()
    await expect(page.getByRole('alert')).toContainText('Suas informações foram mantidas')
    await expect(page.getByLabel('Nome', { exact: true })).toHaveValue('Contato de teste')
    await expect(page.getByRole('checkbox', { name: pageContent[segment].systems[0], exact: true })).toBeChecked()
    mode = 'success'
    await submit.click()
    await expect(page.getByRole('heading', { name: 'Vamos conversar sobre seu projeto.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Vamos conversar sobre seu projeto.' })).toBeFocused()
    expect(delivered?.segment).toBe(segment)
    expect(delivered?.challenge).toBe(pageContent[segment].challenges[0])
  })
}

test('LPs independentes e animações com retorno de rolagem', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/industria/')
  await expect.poll(async () => page.locator('.hero-copy').evaluate(element => Number(getComputedStyle(element).opacity))).toBeGreaterThan(0.95)
  await page.locator('#solucoes').scrollIntoViewIfNeeded()
  await expect.poll(async () => page.locator('.hero-copy').evaluate(element => Number(getComputedStyle(element).opacity))).toBeLessThan(0.5)
  await page.locator('.integration-diagram').scrollIntoViewIfNeeded()
  await expect(page.locator('.diagram-center')).toBeVisible()
  await page.locator('#experiencia').scrollIntoViewIfNeeded()
  await expect(page.locator('.problem-heading')).toHaveCSS('opacity', '0')
  await page.locator('#operacao').scrollIntoViewIfNeeded()
  await expect(page.locator('.problem-heading')).toHaveCSS('opacity', '1')
  await page.locator('#inicio').scrollIntoViewIfNeeded()
  await expect(page.locator('a[href="/logistica/"]')).toHaveCount(0)
  await page.goto('/logistica/')
  await expect(page.locator('a[href="/industria/"]')).toHaveCount(0)
  await expect(page).toHaveURL(/\/logistica\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(pageContent.logistica.headline)
})
