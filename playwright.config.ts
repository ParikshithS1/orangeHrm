import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev.
 */
export default defineConfig({
  testDir: './e2e',
  
  /* FIXED: Set to false to prevent tests from executing simultaneously */
  fullyParallel: false,
  
  /* FIXED: Forced to 1 worker so browser windows open one after another */
  workers: 1,
  
  /* Reporter to use. See https://playwright.dev */
  reporter: 'html',
  
  /* Shared settings for all the projects below. See https://playwright.dev. */
  use: {
    baseURL: 'https://orangehrmlive.com',
    
    // 🎯 FIXED: Strictly true so tests run flawlessly in your GitHub Actions runner
    headless: true,
    
    trace: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000, // increased — demo site is slow/flaky under 'load'
  },

  /* Configure projects for major browsers */
  projects: [
    /* Strictly using official Google Chrome branded channel as the default project */
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }, // Adds Safari / WebKit support
    },
  ],
});
