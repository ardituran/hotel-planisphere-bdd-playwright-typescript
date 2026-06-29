# Hotel Planisphere - BDD Test Automation

This project is an end-to-end test automation framework for the [Hotel Planisphere](https://hotel-example-site.takeyaqa.dev/en-US/) website.
It uses Playwright, TypeScript, and Cucumber BDD through `playwright-bdd`.

The goal of this project is to build a test suite that is easy to read, easy to maintain, and useful as both a learning reference and a portfolio project.

## Tech Stack

| Area | Tool |
|---|---|
| Test automation | Playwright |
| Language | TypeScript |
| BDD integration | playwright-bdd |
| Test data | faker-js |
| Environment management | dotenv |
| Reporting | Allure Report |
| CI/CD | GitHub Actions |

## Prerequisites

Before you start, make sure these tools are installed on your computer:

- Node.js version 16 or higher.
- Java Runtime Environment (JRE) for Allure Report.
- Visual Studio Code or Cursor.
- Git.

## Installation

1. Clone the repository and install dependencies.

```bash
git clone <your-repository-url>
cd hotel-planisphere-bdd-playwright-typescript
npm install
```

2. Create the `.env` file from the template.

```bash
# macOS / Linux
cp .env.template .env

# Windows (Command Prompt)
copy .env.template .env
```

3. Open `.env` and fill in the required values, such as `PRESET_PREMIUM_EMAIL` and `PRESET_PREMIUM_PASSWORD`.

## Project Structure

This project uses simple patterns to keep the code clear and organized.

- **BDD** - Test scenarios are written in plain English using `Given`, `When`, and `Then` inside `.feature` files.
- **Page Object Model (POM)** - Page elements and actions are placed in page classes to keep test code clean.
- **Data Factory** - `DataHelper.ts` creates valid test data and applies business rules such as booking dates and guest limits.

## Running Tests

| Command | Description |
|---|---|
| `npm run test` | Run all tests in headless mode. |
| `npm run test:headed` | Run all tests with the browser visible. |
| `npm run test:ui` | Run tests with Playwright UI mode. |
| `npm run test:focus -- "@auth"` | Run tests by tag, such as `@auth` or `@member`. |
| `npm run test:focus -- "For honeymoon"` | Run one specific scenario by name. |
| `npm run report` | Generate and open the Allure Report dashboard. |

## Key Features

- Membership scenarios for Guest, Normal Member, and Premium Member flows.
- Business rule checks for stay limits and guest limits.
- Smart logout that clears cookies and reloads the page.
- Modal and dialog handling for browser alerts and popups.
- Stable selectors using role-based and CSS selectors.
- Tab control that removes `target="_blank"` when needed.
- GitHub Actions integration for automatic test runs on push and pull request.

## Completed Work

- Playwright video and screenshot attachments for failed tests.
- Allure Report with charts and trend dashboard.
- GitHub Actions workflow for test execution and report upload.
- Scheduled daily test runs using GitHub Actions cron jobs.
- Telegram webhook alerts for test result notifications.

## Roadmap

| Feature | Status |
|---|---|
| Save registered users to a local CSV or TXT file using Node.js `fs` | Pending |
| Finalise `GUIDE.md` for junior QA onboarding | Pending |

## Version History

**v1.3.0 - June 29, 2026**
- Added GitHub Actions cron jobs for daily test runs.
- Added Telegram webhook alerts for CI/CD results.
- Secured bot tokens and chat IDs with GitHub Secrets.

**v1.2.0 - June 27, 2026**
- Added Allure Report with visual HTML dashboards.
- Fixed strict mode errors on multi-instance modal locators.
- Improved tab handling for reservation flows.
- Validated 90-day booking window rules in `DataHelper.ts`.

**v1.1.1 - May 9, 2026**
- Added `playwright.yml` for automated GitHub runs.
- Used GitHub Secrets for secure CI credentials.
- Uploaded Playwright HTML report artifacts on failed runs.

**v1.1.0 - May 8, 2026**
- Added reservation scenarios for Premium and Normal Member.
- Added room plans for Premium, With Dinner, and Economical.
- Added smart login for preset and new members.
- Improved `DataHelper.ts` with H+1 date logic.

**v1.0.0 - May 6, 2026**
- Set up Playwright and BDD structure.
- Added sign up, login, logout, and delete flows.
- Fixed logout race conditions and UI flicker.
- Added initial guest reservation flow.

## Author

Idris Ardi
Software Quality Assurance Engineer
