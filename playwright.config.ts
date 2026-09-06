import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  
  /* FIXED: Set to false to prevent tests from executing simultaneously */
  fullyParallel: false,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* FIXED: Forced to 1 worker so browser windows open one after another */
  workers: 1,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
 use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    headless: false,
    trace: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000, // increased — demo site is slow/flaky under 'load'
},

  /* Configure projects for major browsers */
  projects: [
    /* Strictly using official Google Chrome branded channel as the default project */
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
