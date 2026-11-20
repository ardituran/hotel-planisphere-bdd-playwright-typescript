# Hotel Planisphere - BDD Test Automation

![Playwright E2E Tests](https://github.com/ardituran/hotel-planisphere-bdd-playwright-typescript/actions/workflows/playwright.yml/badge.svg)

Hello, my name is **Idris Ardi**, a QA Engineer. This repository is my practice project and also my portfolio.

I keep it close to the way I actually work, including the parts that are still rough, so the progress stays visible from one commit to the next.

## About me

- 10+ years in manual and exploratory testing, working in Agile teams with developers, product managers, and business stakeholders.
- Industries so far: government technology, procurement, education technology, fintech, e-commerce, SaaS, and telecom.
- Currently a Quality Engineer (middle level) on GovTech Procurement, Project LKPP, through PT Infomedia Nusantara.
- What I am used to doing: finding edge cases, keeping regression coverage, writing defect reports with clear reproduction steps, and facilitating User Acceptance Testing on web and mobile.
- Tools I work with: JIRA, Xray, Postman, SQL with DBeaver, Browser DevTools. Automation exposure with Playwright, Maestro, and Gherkin since 2024.
- [My resume](https://github.com/ardituran/idris-ardi-resume) - my resume in Markdown and PDF. Every version is kept in git.

## Why this project

Hotel Planisphere is a free demo hotel booking site: https://hotel-example-site.takeyaqa.dev/en-US/

I chose it because it has real flows to test. Sign up, login, account management, and hotel reservation with different membership levels. For me it feels like testing a real feature at work.

## What I test

| Feature | What is covered |
| --- | --- |
| Authentication | Register Premium and Normal account, login, logout, delete account |
| Reservation | Guest booking, Premium member booking, Normal member booking, new member booking |
| Data | Random test data with Faker, and plan rules like max stay and max guests |

All tests run on Chromium for now. I want to add Firefox later.

## Tools I use

- **Playwright** - to control the browser. The documentation is easy to follow.
- **TypeScript** - I am still learning types. Sometimes I use `any`.
- **playwright-bdd (Gherkin)** - because I come from manual testing, Gherkin feels familiar to me, like writing test cases.
- **Faker** - to generate test data. I use the Indonesian locale.
- **Allure** - to make a test report. The latest report is published on [GitHub Pages](https://ardituran.github.io/hotel-planisphere-bdd-playwright-typescript/).
- **GitHub Actions** - to run tests automatically every Monday at 09:00 WIB, or manually from the Actions tab.
- **Telegram** - to get a notification after the run finishes.

## How to run

New to automation, or setting this up for the first time? Read [Setup docs](docs/setup.md) first. It is written in Indonesian and covers Windows and Mac, where to get the test accounts, and the errors that show up most often.

Prefer the short version:

```bash
git clone https://github.com/ardituran/hotel-planisphere-bdd-playwright-typescript.git
cd hotel-planisphere-bdd-playwright-typescript
npm install
npx playwright install

# prepare your account data
# .env.template is already in this repo, you only create the copy below
cp .env.template .env     # Windows: copy .env.template .env
# then edit .env and fill the preset email and password
# the accounts are listed at the bottom of the demo site, in the Preset users table

npm run test
```

`npm test` runs `bddgen` before Playwright. File in `steps/` cannot be run on its own, and `npx playwright test` alone will not work either. See [Setup docs](docs/setup.md#kenapa-npm-test-bukan-npx-playwright-test) for the reason.

Other commands I use:

```bash
npm run test:headed   # run with browser window visible
npm run test:ui       # run with Playwright UI mode
npm run report        # open Allure report
npm run format        # format the code
npm run lint          # check the code
```

## Folder structure

- `features/` - Gherkin scenarios. I write the test case here first.
- `steps/` - the code behind each Gherkin step.
- `pages/` - page objects. Locators and actions for each page.
- `utils/` - `DataHelper.ts` for test data and plan rules.
- `docs/` - setup guide, learning notes, manual test cases, and git rules.
- `.github/workflows/` - CI setup for GitHub Actions.

## My workflow

This is the order I follow for every new task:

1. I test the flow manually first. If I do not understand it manually, I cannot automate it.
2. I write the scenario in the feature file.
3. I create or update the page object.
4. I write the step definitions.
5. I run it locally until it passes.

## What I have learned so far

- Manual testing first is really important. Automation just repeats what I already understand.
- Gherkin is close to manual test cases, so the step from manual to automation is not too scary.
- Stable locators save a lot of time. Long XPath breaks easily.
- `await` is easy to forget, and the error message is confusing at first.
- CI is not scary. GitHub Actions can run my tests while I sleep.
- The Trace Viewer helps a lot when a test fails.

## My notes and test cases

- [Learning notes](docs/learning-notes.md) - what I learned, my mistakes, and my study plan. I wrote this in Indonesian because it is my personal notebook.
- [Manual test cases](docs/manual-test-cases.md) - my manual test cases and where each one is automated.
- [Git rules](docs/git-rules.md) - branch naming, commit message style, and what I run before a pull request.
- [Planning roadmap](planning/roadmap.md) - what is done and what I plan to do next in this repo.

## What is still hard for me

- `async` and `await`. I understand the idea, but I still make mistakes.
- TypeScript types. I use `any` too much and I want to fix it slowly.
- Deciding how big a page object should be.
- Test data. Random data is useful, but sometimes it makes a test fail and I do not know why.

## I know this is not clean yet

I list this here so I remember what to improve:

- URL is hardcoded in several files instead of using `baseURL` in the config.
- Some methods use `any` type.
- Step files use global variables to share data between steps.
- My negative test cases are still simple. I only have 5 for now, and I want to add more.

## My plan to learn next

- Add more negative and boundary test cases. I started with 5 simple ones.
- Try API testing.
- Learn more about fixtures and better test data.

## Author

**Idris Ardi** ([ardituran](https://github.com/ardituran))

- [LinkedIn](https://www.linkedin.com/in/idrisardi)
