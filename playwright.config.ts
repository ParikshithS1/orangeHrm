import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev for documentation.
 */
export default defineConfig({
  testDir: './e2e',
  
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
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
