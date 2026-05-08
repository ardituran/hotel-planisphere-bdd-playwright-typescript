import { createBdd } from 'playwright-bdd';
import AccountPage from '../pages/AccountPage';
import DataHelper from '../utils/DataHelper';
import { expect } from '@playwright/test';

// Setup BDD actions
const { Given, When, Then } = createBdd();

let accountPage: AccountPage;
// Store data globally to pass between steps
let currentAccountData: any; 

Given('I am on the Sign Up page', async ({ page }) => {
  accountPage = new AccountPage(page);
  await accountPage.gotoSignup();
});

Given('I am on the Login page', async ({ page }) => {
  accountPage = new AccountPage(page);
  await accountPage.gotoLogin();
});

When('I register a new {string} account', async ({}, rankType: string) => {
  // Generate data based on rank type
  currentAccountData = DataHelper.generateAccountData(rankType);
  
  // Format gender text for log
  let genderText = 'Other';
  if(currentAccountData.gender === '1') genderText = 'Male';
  if(currentAccountData.gender === '2') genderText = 'Female';
  if(currentAccountData.gender === '0') genderText = 'I do not answer';

  // Print log without showing the sensitive passwords
  console.log(`
    ====== SIGN UP DATA ======
    Email: ${currentAccountData.email}
    Username: ${currentAccountData.username}
    Rank: ${currentAccountData.isPremium ? 'Premium' : 'Normal'}
    Address: ${currentAccountData.address}
    Phone: ${currentAccountData.phone}
    Gender: ${genderText}
    Date of Birth: ${currentAccountData.dob}
    Notification: ${currentAccountData.wantsNotification ? 'Yes' : 'No'}
    ==========================
  `);

  // Fill and submit
  await accountPage.fillSignupForm(currentAccountData);
  await accountPage.submitSignup();
});

When('I logout from the application', async () => {
  await accountPage.logout();
});

When('I login with the newly registered account', async () => {
  await accountPage.gotoLogin();
  
  // Only print email for login log
  console.log(`
    ====== LOGIN ======
    Email: ${currentAccountData.email}
    ===================
  `);

  await accountPage.performLogin(currentAccountData.email, currentAccountData.password);
});

// Step to handle login for preset users using Environment Variables
When('I login with a preset {string} account', async ({}, rankType: string) => {
  // Read from .env based on rank
  const email = rankType === 'Premium' ? process.env.PRESET_PREMIUM_EMAIL : process.env.PRESET_NORMAL_EMAIL;
  const password = rankType === 'Premium' ? process.env.PRESET_PREMIUM_PASSWORD : process.env.PRESET_NORMAL_PASSWORD;
  
  // Save to current variable so assertion step can check it later
  currentAccountData = { email: email };

  console.log(`
    ====== PRESET LOGIN ======
    Email: ${email}
    ==========================
  `);

  await accountPage.performLogin(email as string, password as string);
});

Then('I should be successfully logged in to My Page', async () => {
  // Verify the email displayed on My Page is the same as the one we used
  await accountPage.verifyEmailOnMyPage(currentAccountData.email);
});

When('I delete my account', async ({ page }) => {
  // Navigate to My Page first because the Delete button only exists there.
  await page.goto('https://hotel-example-site.takeyaqa.dev/en-US/mypage.html');
  
  // Trigger the delete action from AccountPage
  await accountPage.deleteAccount();
});

Then('my account should be successfully deleted', async ({ page }) => {
  // When deleted, user is sent back to index home page
  await expect(page).toHaveURL(/index/);
});