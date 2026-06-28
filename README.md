# Hotel Planisphere — BDD Test Automation

An end-to-end test automation framework for the [Hotel Planisphere](https://hotel-example-site.takeyaqa.dev/en-US/) website, built with **Playwright**, **TypeScript**, and **Cucumber BDD** via `playwright-bdd`.

This project serves as both a practical learning resource for QA engineers and a professional portfolio piece, with a focus on clean architecture, scalability, and readable test scenarios.

---

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

---

## Prerequisites

Ensure the following are installed on your local machine before getting started:

- **Node.js** — version 16 or higher
- **Java Runtime Environment (JRE)** — required to serve Allure reports
- **Visual Studio Code** or **Cursor** — recommended IDE
- **Git** — for version control

---

## Installation

**1. Clone and install dependencies**

```bash
git clone <your-repository-url>
cd hotel-planisphere-bdd-playwright-typescript
npm install
```

**2. Configure environment variables**

This project uses a `.env` file to manage sensitive credentials. Create it from the provided template:

```bash
# macOS / Linux
cp .env.template .env

# Windows (Command Prompt)
copy .env.template .env
```

Open the `.env` file and fill in the required values such as `PRESET_PREMIUM_EMAIL`, `PRESET_PREMIUM_PASSWORD`, and any other credentials listed in the template.

---

## Architecture

The project follows established design patterns to keep the codebase clean and maintainable.

**Behavior Driven Development (BDD)**
Scenarios are written in plain English using Gherkin syntax (`Given`, `When`, `Then`) inside `.feature` files, making them readable by non-technical stakeholders.

**Page Object Model (POM)**
UI locators and page-level actions are encapsulated in dedicated page classes, keeping test scripts clean and resilient to UI changes.

**Data Factory**
A centralized `DataHelper.ts` manages dynamic test data generation and applies business rule constraints such as booking date windows, guest limits, and room plan logic.

---

## Running Tests

| Command | Description |
|---|---|
| `npm run test` | Run all tests in headless mode |
| `npm run test:headed` | Run all tests with the browser visible |
| `npm run test:ui` | Run tests using Playwright's interactive UI mode |
| `npm run test:focus -- "@auth"` | Run tests filtered by tag (e.g. `@auth`, `@member`) |
| `npm run test:focus -- "For honeymoon"` | Run a specific scenario by name |
| `npm run report` | Generate and serve the Allure Report dashboard |

---

## Key Features

- **Membership scenarios** — covers reservation flows for Guest, Normal Member, and Premium Member account types.
- **Business rule enforcement** — dynamically applies hotel constraints per room plan, including max stay, minimum and maximum guest counts.
- **Session management** — smart logout clears cookies and reloads the page to prevent session flickering and race conditions.
- **Modal and dialog handling** — handles native browser dialogs and structured modal interactions to avoid strict mode resolution errors.
- **Resilient selectors** — uses role-based and CSS selectors to maintain stability against UI changes.
- **Tab control** — intercepts and removes `target="_blank"` attributes to keep cross-page workflows within a single context.
- **CI/CD integration** — the full test suite runs automatically on every push and pull request to the main branch via GitHub Actions.

---

## Completed Work

- Native Playwright video and screenshot attachments for failed test runs.
- Allure Report integration with visual charts and trend dashboards.
- GitHub Actions workflow for automated test execution and report artifact upload.

---

## Roadmap

| Feature | Status |
|---|---|
| Log registered users to a local CSV or TXT file via Node.js `fs` | Pending |
| Integrate Monocart or modern reporting alternative for better trace support | Pending |
| Create `GUIDE.md` for onboarding junior QA engineers | Pending |
| Configure scheduled daily test runs using GitHub Actions cron jobs | Pending |
| Send test result alerts via Telegram or Discord webhooks | Pending |

---

## Version History

**v1.2.0 — June 27, 2026**
- Integrated Allure Report for dynamic visual HTML dashboards.
- Resolved strict mode violation errors on multi-instance modal locators.
- Injected tab attribute modifications to avoid fragmented secondary tab contexts.
- Validated 90-day booking window logic in `DataHelper.ts` for test stability.

**v1.1.1 — May 9, 2026**
- Created `playwright.yml` to trigger automated test runs on GitHub.
- Integrated GitHub Secrets for secure credential management in CI.
- Configured automatic upload of Playwright HTML report artifacts on failed runs.

**v1.1.0 — May 8, 2026**
- Added reservation scenarios for Premium and Normal Membership levels.
- Included logic for Premium, With Dinner, and Economical room plans.
- Implemented smart login flow for both preset and newly created members.
- Enhanced `DataHelper.ts` with H+1 date-offset logic to avoid same-day booking errors.

**v1.0.0 — May 6, 2026**
- Initial release with Playwright and BDD infrastructure setup.
- Automated authentication flows: sign up, login, logout, and account deletion.
- Resolved race conditions and UI flickering on logout navigation.
- Created initial reservation workflow for guest users.

---

## Author

**Idris Ardi**  
Senior Software Quality Assurance Engineer
