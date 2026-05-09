# Hotel Planisphere BDD Automation (Playwright & TypeScript)

This repository contains an End-to-End (E2E) Test Automation Framework for the Hotel Planisphere website. It is built using Playwright, TypeScript, and Cucumber BDD (via `playwright-bdd`).

The primary goal of this project is to provide a robust, scalable, and easy-to-read automation suite that serves as a practical learning resource for QA Engineers and a professional portfolio piece.

---

## Technical Stack

| Role | Tool |
|---|---|
| Logic | [Playwright](https://playwright.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Framework | [playwright-bdd](https://vitalets.github.io/playwright-bdd/) |
| Data Generation | [faker-js](https://fakerjs.dev/) |
| Environment Management | [dotenv](https://www.npmjs.com/package/dotenv) |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) |

---

## Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (Version 16 or higher recommended)
- **Visual Studio Code** or **Cursor** (Recommended IDE)
- **Git** (For version control)

---

## Installation

### 1. Clone and Install

First, clone this repository to your local machine, then navigate to the project folder and install the dependencies:

```bash
npm install
```

### 2. Configure Environment Variables

This project uses a `.env` file to manage sensitive credentials safely. Follow the instructions based on your operating system to create the file from the provided template:

**Mac or Linux:**

```bash
cp .env.template .env
```

**Windows (Command Prompt):**

```dos
copy .env.template .env
```

After creating the file, open `.env` and fill in the values for `PRESET_PREMIUM_EMAIL`, `PRESET_PREMIUM_PASSWORD`, etc., with valid credentials.

---

## Project Structure & Architecture

To ensure high maintainability and readability, the project follows these design patterns:

- **Behavior Driven Development (BDD)** — Scenarios are written in plain English using Gherkin syntax (`Given`, `When`, `Then`) inside `.feature` files.
- **Page Object Model (POM)** — UI elements and page actions are encapsulated within specific Page Classes to separate logic from test scripts.
- **Smart Data Factory** — A centralized `DataHelper.ts` handles complex business rules and generates random, valid test data dynamically.

---

## How to Run Tests

| Command | Description |
|---|---|
| `npm run test` | Run all tests in headless mode (background). |
| `npm run test:headed` | Run all tests with the browser visible. |
| `npm run test:focus -- "@auth"` | Run specific tests using tags (e.g., `@auth`, `@member`). |
| `npm run test:focus -- "For honeymoon"` | Run a specific test by its scenario name. |

---

## Key Features

- **Membership Scenarios** — Automates specific reservation flows for Guest, Normal Member, and Premium Member accounts.
- **Business Rule Enforcement** — Dynamically applies hotel constraints (e.g., Max Stay, Min/Max Guests) per room plan using a custom logic handler.
- **Session Management** — Implemented "Smart Logout" which clears cookies and reloads the page to prevent session flickering and race conditions.
- **Pop-up Handling** — Automated handling of native browser dialogs (Confirm/Alert) during account deletion.
- **Resilient Selectors** — Uses a combination of Role-based and CSS selectors for high reliability against UI changes.
- **CI/CD Integration:** Automatically runs the entire test suite on every Push and Pull Request to the `main` branch using GitHub Actions, ensuring code stability.

---

## Roadmap & Future Enhancements

- [x] **User Data Logging** — Automatically log newly registered users into a local file (CSV or TXT) using Node.js `fs` for easy auditing.
- [x] **Advanced Reporting** — We plan to enhance the reporting system through three levels:
  - [x] **Level 1 (Playwright Native)** — Enable Video and Screenshot attachments for failed tests to assist in debugging.
  - [x] **Level 2 (Allure Report)** — Implement a professional dashboard with visual charts and trends for stakeholders.
  - [x] **Level 3 (Monocart/Custom)** — Integrate modern reporting alternatives for better trace integration.
- [x] **CI/CD Integration:** Implemented GitHub Actions to automate test execution and report generation.
- [x] **Onboarding Guide:** Created `GUIDE.md` to help Junior QA engineers understand the scripting workflow and Git best practices.

---

## Version History

### v1.1.1 — May 9, 2026

**CI/CD Pipeline Integration**
- **Automated Workflow:** Created `playwright.yml` to trigger tests automatically on GitHub.
- **Security:** Integrated GitHub Secrets to manage sensitive credentials for automated runs.
- **Artifact Management:** Configured automatic upload of Playwright HTML reports for every failed CI run.

### v1.1.0 — May 8, 2026

- Added comprehensive Reservation scenarios for Premium and Normal Membership levels.
- Included logic for 3 new plans: Premium, With Dinner, and Economical.
- Implemented "Smart Login" logic to handle both preset and newly created members.
- Enhanced `DataHelper.ts` with date-offset logic (H+1) to avoid same-day booking errors.

### v1.0.0 — May 6, 2026

**Initial Release**

- Setup basic Playwright + BDD infrastructure.
- Automated Authentication (Sign Up, Login, Logout, Delete).
- Resolved race conditions during navigation and UI flickering on Logout.
- Created initial reservation workflow for Guest users.
