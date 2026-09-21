import { defineConfig, devices } from '@playwright/test';

const STORAGE_STATE = 'playwright/.auth/user.json';

/**
 * See https://playwright.dev for documentation.
 */
export default defineConfig({
  // Scans your whole project root to catch your setup file, api folder, and e2e folder
  testDir: '.',
  
  testMatch: ['**/*.spec.ts', '**/auth.setup.ts'],

  /* Prevent tests from running simultaneously to avoid session collision */
  fullyParallel: false,
  
  /* Locked to 1 worker so browser windows open strictly one after another */
  workers: 1,

  /* Gives tests 0 retries to keep TDD debugging fast */
  retries: 0,
  
  /* Reporter to use. */
  reporter: 'html',
  
  /* Shared settings for all projects below. */
  use: {
    /* Precise subdomain where the login application actually lives */
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    
    /* Always headless so it runs on CI (no display). Use --headed locally to watch the browser */
    headless: true,
    viewport: { width: 1280, height: 720 },
    
    /* Keeps a step-by-step recording of failures to download from CI artifacts */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  
    actionTimeout: 10000,
    navigationTimeout: 30000, 
    locale: 'en-US',
    
    /* Emulates a normal desktop browser user-agent to bypass bot blocks */
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  },

  /* Configure projects for major browsers */
   projects: [
    // 🌟 PHASE 1: Isolated Environment Preparation Hook
     // 🌟 PHASE 1: Isolated Environment Preparation Project
    {
      name: 'setup',
      testMatch: '**/api/auth.setup.ts', // Targets your specific setup path
    },


    // 🌟 PHASE 2: UI Testing Project - Wired to inherit the saved session state
    {
      name: 'Google Chrome',
      testDir: './e2e',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE // Injects cookies automatically
      },
      dependencies: ['setup'], // Forces Phase 1 to complete successfully first
    },

    // 🔌 API Testing Project: Runs your backend validation files in isolation
    {
      name: 'API-Tests',
      testDir: './api',
      testIgnore: '**/auth.setup.ts', // Keeps your setup file clean from execution suites
    }
  ],
});