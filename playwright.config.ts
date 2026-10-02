import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  timeout: 30_000,
  use: { baseURL: 'http://127.0.0.1:4179', viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { browserName: 'chromium', ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) } }],
  webServer: { command: 'npm run preview', url: 'http://127.0.0.1:4179', reuseExistingServer: !process.env.CI, timeout: 60_000 },
})
