// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout:40*1000, //max time to load all components
  fullyParallel: true,
  expect:{
    timeout:40 *1000  //assertion validation only
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
  },

  // ✅ ONLY ONE PROJECT — system Chromium
  
projects: [
  {
    name: 'chrome-system',
    use: {
      ...devices['Desktop Chrome'],
      browserName: 'chromium', // Keep 'chromium' because Playwright uses Chromium engine for Chrome
      channel: 'chrome',       // This tells Playwright to use Google Chrome
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',
      video: 'off',
      launchOptions: {
        headless: false, // set true later if needed
           },
    },
  },
],
});
