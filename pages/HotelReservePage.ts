import { expect, Locator, Page } from '@playwright/test';

export default class HotelReservePage {
  readonly page: Page;

  // 1. Define all locators (UI Elements)
  readonly navReserveMenu: Locator;

  readonly dateInput: Locator;
  readonly stayInput: Locator;
  readonly guestsInput: Locator;

  readonly breakfastCheck: Locator;
  readonly earlyCheckInCheck: Locator;
  readonly sightseeingCheck: Locator;

  readonly nameInput: Locator;
  readonly confirmationSelect: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly specialRequestInput: Locator;

  readonly confirmBtn: Locator;
  readonly submitBtn: Locator;
  readonly successModalTitle: Locator;
  readonly successModalDesc: Locator;
  readonly closeBtn: Locator;

  // 2. Setup locators
  constructor(page: Page) {
    this.page = page;

    // Navigation Menu
    this.navReserveMenu = page.getByRole('link', { name: 'Reserve' });

    // Form Inputs
    this.dateInput = page.locator('#date');
    this.stayInput = page.locator('#term');
    this.guestsInput = page.locator('#head-count');

    this.breakfastCheck = page.getByLabel('Breakfast');
    this.earlyCheckInCheck = page.getByLabel('Early check-in');
    this.sightseeingCheck = page.getByLabel('Sightseeing');

    this.nameInput = page.locator('#username');
    this.confirmationSelect = page.locator('#contact');
    this.emailInput = page.locator('#email');
    this.phoneInput = page.locator('#tel'); // Locator for Telephone input
    this.specialRequestInput = page.locator('#comment');

    // Action Buttons
    this.confirmBtn = page.getByRole('button', { name: 'Confirm Reservation' });
    this.submitBtn = page.getByRole('button', { name: 'Submit Reservation' });

    // Modal Verification Texts and Buttons
    this.successModalTitle = page.locator('h5.modal-title', {
      hasText: 'Thank you for reserving.',
    });
    this.successModalDesc = page.getByText('We look forward to visiting you.');
    this.closeBtn = page.locator('button.btn-success', { hasText: 'Close' });
  }

  // 3. Simple Actions (Methods)

  async gotoHome() {
    // Open website
    await this.page.goto('https://hotel-example-site.takeyaqa.dev/en-US/');
    // Click 'Reserve' on top menu
    await this.navReserveMenu.click();
  }

  async selectPlan(planName: string) {
    // Find the specific card that contains the plan name
    const planCard = this.page.locator('.card', { hasText: planName });

    // Find the 'Reserve room' button inside that specific card
    const reserveLink = planCard.getByRole('link', { name: 'Reserve room' });

    // Remove 'target' attribute so it does not open a new tab
    await reserveLink.evaluate((node) => node.removeAttribute('target'));

    // Click the button
    await reserveLink.click();

    // Check if we are on the correct reserve page for this plan
    const planNameHeader = this.page.locator('#plan-name');
    await expect(planNameHeader).toHaveText(planName);
  }

  // Disable ESLint rule for 'any' to maintain the flexible data structure
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async fillForm(planData: any, guestData: any) {
    // Input date, stay nights, and guest count
    await this.dateInput.fill(planData.checkInDate);
    await this.dateInput.press('Tab');
    await this.stayInput.fill(planData.stayNights);
    await this.guestsInput.fill(planData.guestsCount);

    // Check addons based on random true/false
    if (planData.wantsBreakfast) {
      await this.breakfastCheck.check();
    }
    if (planData.wantsEarlyCheckIn) {
      await this.earlyCheckInCheck.check();
    }
    if (planData.wantsSightseeing) {
      await this.sightseeingCheck.check();
    }

    // Input personal info
    await this.nameInput.fill(guestData.name);
    await this.specialRequestInput.fill(guestData.request);

    // UPDATED: Use the data from DataHelper to choose Email or Phone
    if (planData.isEmail) {
      await this.confirmationSelect.selectOption('email');
      await this.emailInput.fill(guestData.email);
    } else {
      await this.confirmationSelect.selectOption('tel');
      await this.phoneInput.fill(guestData.phone);
    }
  }

  async submitReservation() {
    // Click first confirm button
    await this.confirmBtn.click();

    // Check if URL is correct before submit
    await expect(this.page).toHaveURL(/confirm/);

    // Click final submit button
    await this.submitBtn.click();
  }

  async verifySuccess() {
    // Check if the success modal appears
    await expect(this.successModalTitle).toBeVisible();
    await expect(this.successModalDesc).toBeVisible();

    // Click the green close button
    await this.closeBtn.click();
  }
}
