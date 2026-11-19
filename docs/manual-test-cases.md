# Manual Test Cases

Before automation, I write the test case manually first. This is my habit since 2014.

This file shows some of my manual test cases and where each one lives in the automation code. I keep this file because manual test case thinking is my strength. Automation is only the tool.

## Test case examples

### TC-AUTH-01: Register a new Premium account, logout, and re-login

| Field | Detail |
| --- | --- |
| Precondition | User does not have an account yet |
| Test data | New random email, password `Tester@123`, phone starts with `08` (11 digits), age 18+ |

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Open the Sign Up page | Sign Up form is displayed |
| 2 | Fill email, password, confirmation, username, address, phone, gender, date of birth | All fields accept the data |
| 3 | Choose Premium rank and click Sign up | Redirected to My Page |
| 4 | Check the email on My Page | Email matches the one I registered |
| 5 | Click Logout | Back to home page, Login button visible |
| 6 | Open the Login page and login with the same account | Redirected to My Page again |

Status: Automated in `features/auth.feature`, scenario "Guest User: Register a new Premium Membership account...".

### TC-AUTH-03: Login with a preset Premium account

| Field | Detail |
| --- | --- |
| Precondition | A preset Premium account exists (email and password in `.env`) |
| Test data | `PRESET_PREMIUM_EMAIL` and `PRESET_PREMIUM_PASSWORD` |

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Open the Login page | Login form is displayed |
| 2 | Fill email and password from `.env`, click Login | Redirected to My Page |
| 3 | Check the email on My Page | Email matches the preset account |
| 4 | Click Logout | Back to home page |

Status: Automated in `features/auth.feature`, scenario "Existing User: Login with a preset Premium Membership account...".

### TC-RES-01: Guest books "Plan with special offers"

| Field | Detail |
| --- | --- |
| Precondition | User is not logged in, plan is available for guest |
| Test data | Check-in date within 89 days from today, valid nights and guests for this plan, random name and contact |

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Open the home page and go to the plan list | Plan cards are displayed |
| 2 | Select "Plan with special offers" | Reservation form for this plan is open |
| 3 | Fill date, stay, guests, name, contact, special request | All fields accept the data |
| 4 | Click Confirm Reservation | Confirmation page is shown |
| 5 | Click Submit Reservation | Success modal "Thank you for reserving." is shown |

Status: Automated in `features/reservation.feature`, Guest Booking outline.

### TC-RES-08: Premium member books "For honeymoon" (boundary values)

| Field | Detail |
| --- | --- |
| Precondition | Logged in as Premium member |
| Boundary rules | This plan allows max 2 guests and max 2 nights, minimum 2 guests |

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Select "For honeymoon" | Reservation form for this plan is open |
| 2 | Fill 2 guests and 2 nights (max values) | Form accepts the data |
| 3 | Confirm and submit | Success modal is shown |

Status: Automated in `features/reservation.feature`, Premium member outline. I use these boundary values on purpose.

### TC-AUTH-06: Login with wrong password (negative)

| Field | Detail |
| --- | --- |
| Precondition | A registered account exists |
| Test data | Correct email, wrong password |

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Open the Login page | Login form is displayed |
| 2 | Fill correct email and wrong password, click Login | Error message is shown, user stays on Login page |

Status: Not automated yet. This is planned for the next phase. As a manual tester I know negative cases are important, and I am still learning how to write them in code.

## Mapping: manual test cases to automated scenarios

| Test case | Scenario in code | Feature file | Status |
| --- | --- | --- | --- |
| TC-AUTH-01 | Register Premium account, logout, re-login | `features/auth.feature` | Automated |
| TC-AUTH-02 | Register Normal account, logout, re-login | `features/auth.feature` | Automated |
| TC-AUTH-03 | Login with preset Premium account | `features/auth.feature` | Automated |
| TC-AUTH-04 | Login with preset Normal account | `features/auth.feature` | Automated |
| TC-AUTH-05 | Register, login, and delete account | `features/auth.feature` | Automated |
| TC-RES-01 | Guest booking, 7 plans | `features/reservation.feature` | Automated |
| TC-RES-02 | Premium member booking, 10 plans | `features/reservation.feature` | Automated |
| TC-RES-03 | Normal member booking, 9 plans | `features/reservation.feature` | Automated |
| TC-RES-04 | New member signup, booking, delete account | `features/reservation.feature` | Automated |
| TC-RES-08 | "For honeymoon" with boundary values | `features/reservation.feature` | Automated |
| TC-AUTH-06 | Login with wrong password | - | Planned |
| TC-AUTH-07 | Sign up with wrong confirmation password | - | Planned |
| TC-AUTH-08 | Sign up with invalid phone number | - | Planned |
| TC-RES-09 | Reservation with guests over the plan limit | - | Planned |
| TC-RES-10 | Reservation with stay over the plan limit | - | Planned |

The "Planned" rows are my negative and boundary test cases. I want to automate them next.

Last updated: 2026-11-19
