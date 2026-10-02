import { test, expect } from '@playwright/test'
import { pageContent, type Segment } from '../../src/content/pages'

for (const segment of ['industria', 'logistica'] as Segment[]) {
  test(`${segment}: HTML indexável, sem JavaScript e sem links entre campanhas`, async ({ browser, request, baseURL }) => {
    const response = await request.get(`/${segment}/`)
    const html = await response.text()
    expect(response.status()).toBe(200)
    expect(html).toContain('<h1 id="hero-title">')
    expect(html).toContain('application/ld+json')
    expect(html).not.toContain('rel="stylesheet"')
    expect(html).not.toMatch(/rel="modulepreload"[^>]+gsap-vendor/)
    const ownGtm = segment === 'industria' ? 'GTM-TCZC9VKB' : 'GTM-NMJVVJF7'
    const otherGtm = segment === 'industria' ? 'GTM-NMJVVJF7' : 'GTM-TCZC9VKB'
    expect(html.includes(ownGtm)).toBe(true)
    expect(html.includes(otherGtm)).toBe(false)
    expect(/<body>\s*<!-- Google Tag Manager \(noscript\) -->/.test(html)).toBe(true)
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 390, height: 900 } })
    const page = await context.newPage()
    await page.goto(`/${segment}/`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(pageContent[segment].headline)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('main > section')).toHaveCount(7)
    await expect(page.locator('.problem-heading')).toHaveCSS('opacity', '1')
    await expect(page.locator('a[href="/industria/"],a[href="/logistica/"]')).toHaveCount(0)
    await context.close()
  })

  test(`${segment}: hidratação limpa, paleta e ilustrações`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    await page.goto(`/${segment}/`)
    await expect(page.getByRole('button', { name: pageContent[segment].cta, exact: true })).toBeDisabled()
    await expect(page.locator('.hero')).toHaveCSS('background-color', 'rgb(18, 18, 18)')
    await expect(page.locator('.problem-section')).toHaveCSS('background-color', 'rgb(37, 6, 56)')
    await expect(page.locator('.solutions-section')).toHaveCSS('background-color', 'rgb(84, 33, 118)')
    await expect(page.locator('.service-illustration')).toHaveCount(3)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', pageContent[segment].description)
    const schema = await page.locator('script[type="application/ld+json"]').textContent()
    expect(JSON.parse(schema!)['@graph'].map((item: { '@type': string }) => item['@type'])).toEqual(['Organization', 'Service', 'WebPage'])
    expect((await request.get('/robots.txt')).headers()['content-type']).toContain('text/plain')
    expect(errors).toEqual([])
  })
}

test('root alias uses the Industry container', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html.includes('GTM-TCZC9VKB')).toBe(true)
  expect(html.includes('GTM-NMJVVJF7')).toBe(false)
})
