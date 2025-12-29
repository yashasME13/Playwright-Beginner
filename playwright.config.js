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
      name: 'chromium-system',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'off',
        launchOptions: {
          executablePath: '/usr/bin/chromium-browser',
          headless: false, // set true later if you want
        },
      },
    },
  ],
});
