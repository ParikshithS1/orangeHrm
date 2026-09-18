import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev for documentation.
 */
export default defineConfig({
  // 🌟 UPDATED: Removed './e2e' restriction so Playwright scans your whole project root
  testDir: '.',
  
  // 🌟 ADDED: Explicitly matches any test files ending in .spec.ts in both api/ and e2e/ folders
  testMatch: ['**/*.spec.ts'],

  /* Prevent tests from running simultaneously to avoid session collision */
  fullyParallel: false,
  
  /* Locked to 1 worker so browser windows open strictly one after another */
  workers: 1,

  /* Gives tests 2 retries to handle any random network blips automatically */
  retries: 2,
  
  /* Reporter to use. */
  reporter: 'html',
  
  /* Shared settings for all projects below. */
  use: {
    /* 🏛️ FIXED: Precise subdomain where the login application actually lives */
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    
    /* Run headless for execution speed and runner compatibility */
    headless: true,
    viewport: { width: 1280, height: 720 },
    
    /* Keeps a step-by-step recording of failures to download from CI artifacts */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  
    actionTimeout: 10000,
    navigationTimeout: 30000, 
    
    /* Emulates a normal desktop browser user-agent to bypass bot blocks */
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  },

  /* Configure projects for major browsers */
   projects: [
    // 🖥️ UI Testing Project: Runs ONLY the files inside the e2e folder across multiple browsers
    {
      name: 'UI-Chrome',
      testDir: './e2e',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'UI-Firefox',
      testDir: './e2e',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'UI-Safari',
      testDir: './e2e',
      use: { ...devices['Desktop Safari'] },
    },

    // 🔌 API Testing Project: Runs ONLY the files inside the api folder with NO browsers
    {
      name: 'API-Tests',
      testDir: './api',
      use: {
        // We completely omit the browser devices here so it behaves as a pure backend API client
      }
    }
  ],
});
