# Hotel Automation E2E Testing

An End-to-End (E2E) testing project for a Hotel website, built with **Playwright**, **TypeScript**, and **BDD (Behavior Driven Development)**. This project is designed to help QA Engineers learn automation testing through practical implementation.

---

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- An IDE (e.g., [Visual Studio Code](https://code.visualstudio.com/) or [Cursor](https://www.cursor.com/))

---

## Installation

### 1. Install Dependencies

Open your terminal and run:

```bash
npm install
```

### 2. Setup Environment Variables

You need a `.env` file to store sensitive credentials such as email and password.

**Mac / Linux:**

```bash
cp .env.template .env
```

**Windows (Command Prompt):**

```dos
copy .env.template .env
```

After copying, open the `.env` file and replace the placeholder values with the real credentials for the preset users.

---

## How to Run Tests

| Command | Description |
|---|---|
| `npm run test` | Run all tests in headless mode (background) |
| `npm run test:headed` | Run all tests with browser visible (headed mode) |
| `npm run test:focus -- "@auth"` | Run tests by tag (e.g., `@login`, `@signup`, `@delete`) |
| `npm run test:focus -- "For honeymoon"` | Run a specific test by scenario name |

**Examples:**

```bash
# Run all tests (headless)
npm run test

# Run all tests with browser visible
npm run test:headed

# Run by tag
npm run test:focus -- "@auth"

# Run by scenario name
npm run test:focus -- "For honeymoon"
```

---

## Features

- **BDD Framework** — Test scenarios are written in plain English using `Given`, `When`, `Then` format inside `.feature` files.
- **Page Object Model (POM)** — Web elements (buttons, inputs, etc.) are separated from test scripts for cleaner, more maintainable code.
- **Dynamic Fake Data** — Uses `faker-js` to auto-generate random names, emails, addresses, and birth dates in correct HTML5 format.
- **Authentication Scenarios** — Covers Sign Up, Login, Logout, and Delete Account, including fixes for URL redirect collisions and UI flickering.
- **Native Browser Pop-up Handler** — Automatically handles system alerts (e.g., "OK" dialog) during account deletion.
- **Guest Reservation Scenarios** — Automates room bookings for all 7 hotel plans with rule enforcement per room type (e.g., max 5-night stay for "Complimentary Ticket" room).

---

## Roadmap

- [ ] Create reservation scenarios for **Premium Membership** users across all hotel plans
- [ ] Create reservation scenarios for **Normal Membership** users across all hotel plans

---

## Version History

### v1.0.0 — May 6, 2026, 22:00 WIB

**Initial Release**

- Setup Playwright, BDD, and dotenv
- Create `DataHelper.ts` for fake data generation
- Create `auth.feature` and `reservation.feature`
- Create POM and Step Definitions for Authentication and Reservation
- Fix timeout error on Date input (Malformed value)
- Fix race condition error on Logout and Login process
- Fix max stay limit for specific hotel plans
