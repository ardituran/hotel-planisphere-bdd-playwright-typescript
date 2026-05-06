import { createBdd } from 'playwright-bdd';
import HotelReservePage from '../pages/HotelReservePage';
import DataHelper from '../utils/DataHelper';

// Setup BDD actions
const { Given, When, Then } = createBdd();

// Create an empty variable for the page object
let reservePage: HotelReservePage;

Given('I am on the hotel home page', async ({ page }) => {
  // Initialize the page object
  reservePage = new HotelReservePage(page);
  
  // Go to the website
  await reservePage.gotoHome();
});

When('I select the {string} room plan', async ({}, planName: string) => {
  // Click the reserve button for the selected plan
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
  // Check if the success pop-up appears
  await reservePage.verifySuccess();
});