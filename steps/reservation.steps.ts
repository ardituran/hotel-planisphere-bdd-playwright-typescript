import { createBdd } from 'playwright-bdd';
import HotelReservePage from '../pages/HotelReservePage';
import DataHelper from '../utils/DataHelper';
// Import AccountPage to handle login state within reservation tests
import AccountPage from '../pages/AccountPage';

// Setup BDD actions
const { Given, When, Then } = createBdd();

// Create an empty variable for the page object
let reservePage: HotelReservePage;
let accountPage: AccountPage;

Given('I am on the hotel home page', async ({ page }) => {
  // Initialize the page object
  reservePage = new HotelReservePage(page);
  
  // Go to the website
  await reservePage.gotoHome();
});

// Step to handle automatic login for members using .env data
Given('I am logged in as a {string} member', async ({ page }, rank: string) => {
  accountPage = new AccountPage(page);
  const email = rank === 'Premium' ? process.env.PRESET_PREMIUM_EMAIL : process.env.PRESET_NORMAL_EMAIL;
  const password = rank === 'Premium' ? process.env.PRESET_PREMIUM_PASSWORD : process.env.PRESET_NORMAL_PASSWORD;

  // Clear cookies first to ensure a clean login session
  await page.context().clearCookies();
  
  await accountPage.gotoLogin();
  await accountPage.performLogin(email as string, password as string);
  await accountPage.verifyEmailOnMyPage(email as string);
});

When('I select the {string} room plan', async ({ page }, planName: string) => {
  // Use the existing reservePage variable so it can be used in the next steps
  reservePage = new HotelReservePage(page);

  // Navigation to plan selection page
  await reservePage.page.goto('https://hotel-example-site.takeyaqa.dev/en-US/plans.html');
  await reservePage.selectPlan(planName);
});

When('I fill the reservation form for {string} with valid random data', async ({}, planName: string) => {
  // Get all fake data and rules
  const planData = DataHelper.getPlanConstraints(planName);
  const guestData = DataHelper.generateGuestData();
  
  // Prepare text to show in the terminal (Email or Telephone)
  const confirmText = planData.isEmail ? `Email (${guestData.email})` : `Telephone (${guestData.phone})`;

  // Print the test data to terminal for easy debugging
  console.log(`
    ======================================
    Plan Name: ${planName}
    Checkin: ${planData.checkInDate}
    Stay: ${planData.stayNights}
    Guest: ${planData.guestsCount}
    Breakfast: ${planData.wantsBreakfast ? 'checked' : 'not'}
    Early Checkin: ${planData.wantsEarlyCheckIn ? 'checked' : 'not'}
    Sightseeing: ${planData.wantsSightseeing ? 'checked' : 'not'}
    Name: ${guestData.name}
    Confirmation: ${confirmText}
    Special Request: ${guestData.request}
    ======================================
  `);

  // Fill the form using the fake data
  await reservePage.fillForm(planData, guestData);
});

When('I submit the reservation form', async () => {
  // Click submit to finish booking
  await reservePage.submitReservation();
});

Then('I should see the reservation success message', async () => {
  await reservePage.verifySuccess();
});