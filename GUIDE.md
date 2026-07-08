# Hotel Planisphere Automation Guide

Onboarding guide for junior QA engineers.

Welcome to the team. If you're new to automation, or even new to coding in general, don't worry. This guide walks you through how we write tests using Playwright, TypeScript, and Cucumber BDD. Take your time reading it, and come back to it whenever you get stuck.

This guide explains how to work with the automation framework using Playwright, TypeScript, and BDD. It also covers coding rules, Git rules, and debugging steps.

## Purpose

This guide is written for junior Software QA engineers.

The goal is to help you understand the framework, write clean test scripts, and keep the project easy to maintain.

## Manual Testing First

Always run the test case manually before writing automation.

This helps you understand the feature flow, business rules, validation, and expected results. If you do not understand the feature manually, the automation script may test the wrong thing.

## Workflow

Follow this order when you create a new automation task.

### 1. Write the feature file

Create a new file in the `features` folder.

Write the scenario in simple Gherkin format using `Given`, `When`, and `Then`.

### 2. Create the page object

Create a page file in the `pages` folder.

Store UI locators and reusable actions in this file.

### 3. Create the step definitions

Create a file in the `steps` folder.

This file connects the Gherkin text to the page object methods.

### 4. Run and validate locally

Run the test on your own machine first.

Fix the problem until the scenario passes correctly.

## Example

This example shows a simple login flow using a preset premium account.

### Feature file example

```gherkin
Feature: Member Authentication
  As a registered user of Hotel Planisphere
  I want to login with my credentials
  In order to book dynamic hotel packages

  @auth @smoke
  Scenario: Successful login with valid preset premium account
    Given The user navigates to the Hotel Planisphere home page
    When The user submits valid premium credentials
    Then The user should be redirected to the My Page dashboard
    And The dashboard should display the correct membership status
```

### Page object example

```ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#login-button');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/en-US/login.html');
  }

  async login(email: string, pass: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
  }
}
```

### Step definition example

```ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

Given('The user navigates to the Hotel Planisphere home page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
});

// eslint-disable-next-line no-empty-pattern
When('The user submits valid premium credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const email = process.env.PRESET_PREMIUM_EMAIL || '';
  const password = process.env.PRESET_PREMIUM_PASSWORD || '';

  await loginPage.login(email, password);
});

Then('The user should be redirected to the My Page dashboard', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await expect(dashboardPage.headerTitle).toBeVisible();
});
```

## Coding Rules

Follow these rules to keep the code clean.

### File naming

- Use PascalCase for page object files, such as `LoginPage.ts` or `HotelReservePage.ts`.
- Use lowercase dot format for step files, such as `auth.steps.ts` or `reservation.steps.ts`.

### Locator strategy

Use stable selectors first.

Good examples:

```ts
page.locator('#email')
page.getByRole('button', { name: 'Submit' })
```

Avoid long XPath selectors because they break easily when the UI changes.

### Use await

Most Playwright actions are asynchronous.

Always use `await` for page actions and assertions.

### Run format and lint

Before you commit or push, run these commands:

```bash
npm run format
npm run lint
```

These commands help keep the code style consistent and catch common issues early.

## Git Rules

This project uses a protected `main` branch.

Do not commit or push directly to `main`. Always use a separate branch.

### Branch naming

Use this format:

```bash
type/github-username/short-description
```

Examples:

- `feat/yourname/premium-reservation`
- `fix/yourname/date-picker-flicker`
- `refactor/yourname/update-docs-guide`

### Commit message style

Use clear commit prefixes:

- `feat:` for a new feature or scenario.
- `fix:` for bug fixes.
- `refactor:` for cleanup, formatting, or documentation updates.

Before opening a pull request, make sure your tests pass and your files are formatted.

## Debugging

Test failures are normal.

Use this order to debug faster:

1. Focus on one scenario.
2. Use Trace Viewer.
3. Check test data rules.

### Focus on one scenario

When a test fails, do not run the full suite first.

Add `@focus` to the failing scenario and run only that test.

### Use Trace Viewer

If a test fails in GitHub Actions, download the trace artifact and inspect it with Playwright Trace Viewer.

```bash
npx playwright show-trace path/to/downloaded-trace.zip
```

This helps you see what happened in the browser step by step.

### Check test data rules

Some failures happen because the test data does not match the app rules.

For example, Hotel Planisphere has a 90-day booking limit. If the app shows validation errors, check the data generated in `DataHelper.ts`.

## Final Notes

Good automation is not only about making the test pass.

It is also about understanding the feature, writing clear steps, using stable locators, and keeping the test easy for others to read and maintain.

Start small, stay consistent, and improve step by step.

## Author

ardituran
Software Quality Assurance Engineer
