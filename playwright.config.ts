import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import * as dotenv from 'dotenv';
dotenv.config();

// Setup BDD configuration
const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'steps/*.steps.ts',
});

// Main Playwright configuration
export default defineConfig({
  testDir,
  fullyParallel: true,
  retries: 0,
  // Use 'list' reporter to show step-by-step BDD text in terminal
  reporter: [['list'], ['html']],
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});