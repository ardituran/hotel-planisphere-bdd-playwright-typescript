import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import * as dotenv from 'dotenv';

// 1. Load environment variables (like passwords or secret URLs) from .env file
dotenv.config();

// 2. Setup BDD (Cucumber) Configuration
// This tells Playwright where to find our human-readable tests and the code behind them
const testDir = defineBddConfig({
  features: 'features/*.feature', // Where your Gherkin scenario files live
  steps: 'steps/*.ts',            // Where your TypeScript step definitions live
});

/**
 * Main Playwright Configuration
 * Designed to be clean and training-friendly.
 */
export default defineConfig({
  // Use the BDD directory we defined above
  testDir,
  
  // Run tests at the same time (parallel) to make it faster
  fullyParallel: true,
  
  // Fail the test on CI (like GitHub Actions) if we accidentally put 'test.only'
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests automatically (2 times on CI, 0 times on local machine)
  retries: process.env.CI ? 2 : 0,
  
  // Number of workers (1 on CI to prevent crash, default on local machine)
  workers: process.env.CI ? 1 : undefined,
  
  // 3. Setup Reports
  reporter: [
    ['list'], // Show test progress clearly in the terminal
    ['html', { open: 'never' }], // Create default HTML report but do not open it automatically
    ['allure-playwright', {      // Create beautiful Allure dashboard
      detail: true, 
      outputFolder: 'allure-results',
      suiteTitle: false
    }]
  ],

  // 4. Setup what happens during the test execution
  use: {
    // Save trace (history of robot actions) ONLY when a test fails to save disk space
    trace: 'retain-on-failure',
    
    // Take a screenshot automatically ONLY when a test fails
    screenshot: 'only-on-failure',
    
    // Record a video automatically ONLY when a test fails
    video: 'retain-on-failure',
  },

  // 5. Setup Browsers to test on
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Note: You can easily add Firefox or Safari (webkit) here later if needed
  ],
});