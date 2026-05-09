# Automation Scripting Guide

This guide will help you understand how to create a new automation script in this project from scratch.

---

## 1. Where to Start?
Before writing any code, always perform a **Manual Test** on the feature. You must understand the flow, the input fields, and the expected result.

## 2. The Development Workflow (Order of Operations)
In this BDD framework, we follow the **Feature-First** approach:

1.  **Create a .feature file:** Define the behavior in plain English using Gherkin syntax (`Given`, `When`, `Then`).
2.  **Create/Update Page Objects (POM):** Identify the UI elements (buttons, inputs) and create methods for user actions in the `pages/` folder.
3.  **Create Step Definitions:** Connect the Gherkin sentences to the Page Object methods in the `steps/` folder.
4.  **Run and Debug:** Run the specific test and check the report if it fails.

---

## 3. Pull Request (PR) & Git Best Practices

### A. Branching Strategy
Never work directly on the `main` branch. Always create a new branch using this format:
`type/your-github-username/short-description`

Example:
`feat/ardituran/add-login-test`
`fix/ardituran/fix-date-picker`

### B. Commit Messages
Use **Conventional Commits** to make the history easy to read:
* `feat:` for new features or test scenarios.
* `fix:` for bug fixes in the script.
* `refactor:` for code improvements without changing the logic.

Example: `feat: add premium member reservation test`

### C. The PR Process
1.  **Push** your branch to GitHub.
2.  **Create a Pull Request** in the GitHub browser.
3.  **Fill the PR Description** using the provided template (Overview, Changes, and Test Results).
4.  **Wait for CI/CD** (GitHub Actions) to show a green checkmark.
5.  **Merge** the PR only after all tests pass.

---

## 4. Debugging Tips for Beginners
* **Read the Error Log:** Look for the "Received" vs "Expected" values in the terminal.
* **Use Trace Viewer:** If a test fails in the CI/CD, download the artifact, and use `npx playwright show-trace` to see exactly what happened milisecond by milisecond.
* **Check DataHelper:** If the error is about "Date" or "Name", ensure your data factory follows the website's validation rules.
