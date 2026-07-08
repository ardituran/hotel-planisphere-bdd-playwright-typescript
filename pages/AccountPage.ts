import { expect, Locator, Page } from '@playwright/test';

export default class AccountPage {
  readonly page: Page;

  // Sign Up Locators
  readonly emailSignupInput: Locator;
  readonly passwordSignupInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly usernameInput: Locator;
  readonly rankPremiumRadio: Locator;
  readonly rankNormalRadio: Locator;
  readonly addressInput: Locator;
  readonly phoneInput: Locator;
  readonly genderSelect: Locator;
  readonly dobInput: Locator;
  readonly notificationCheck: Locator;
  readonly signupBtn: Locator;

  // Login Locators
  readonly navLoginBtn: Locator;
  readonly emailLoginInput: Locator;
  readonly passwordLoginInput: Locator;
  readonly loginBtn: Locator;

  // My Page Locators
  readonly logoutBtn: Locator;
  readonly deleteAccountBtn: Locator;
  readonly myPageEmailText: Locator;
  // Added locator for username on My Page based on your finding
  readonly myPageNameText: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize Sign Up Locators
    this.emailSignupInput = page.locator('#email');
    this.passwordSignupInput = page.locator('#password');
    this.confirmPasswordInput = page.locator('#password-confirmation');
    this.usernameInput = page.locator('#username');
    this.rankPremiumRadio = page.locator('#rank-premium');
    this.rankNormalRadio = page.locator('#rank-normal');
    this.addressInput = page.locator('#address');
    this.phoneInput = page.locator('#tel');
    this.genderSelect = page.locator('#gender');
    this.dobInput = page.locator('#birthday');
    this.notificationCheck = page.locator('#notification');
    this.signupBtn = page.getByRole('button', { name: 'Sign up' });

    // Initialize Login Locators
    this.navLoginBtn = page.locator('a[href="./login.html"]');
    this.emailLoginInput = page.locator('#email');
    this.passwordLoginInput = page.locator('#password');
    this.loginBtn = page.locator('#login-button');

    // Initialize My Page Locators
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });
    this.deleteAccountBtn = page.getByRole('button', {
      name: 'Delete Account',
    });
    this.myPageEmailText = page.locator('#email');
    // Initialize username locator
    this.myPageNameText = page.locator('#username');
  }

  // --- ACTIONS ---

  async gotoSignup() {
    await this.page.goto('https://hotel-example-site.takeyaqa.dev/en-US/signup.html');
  }

  // Disable ESLint rule for 'any' to maintain the flexible data structure
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async fillSignupForm(accountData: any) {
    await this.emailSignupInput.fill(accountData.email);
    await this.passwordSignupInput.fill(accountData.password);
    await this.confirmPasswordInput.fill(accountData.password);
    await this.usernameInput.fill(accountData.username);

    if (accountData.isPremium) {
      await this.rankPremiumRadio.check();
    } else {
      await this.rankNormalRadio.check();
    }

    await this.addressInput.fill(accountData.address);
    await this.phoneInput.fill(accountData.phone);
    await this.genderSelect.selectOption(accountData.gender);

    await this.dobInput.fill(accountData.dob);
    await this.dobInput.press('Tab');

    if (accountData.wantsNotification) {
      await this.notificationCheck.check();
    }
  }

  async submitSignup() {
    await this.signupBtn.click();
  }

  // Brilliant addition! Assert the account data immediately after signup
  // to ensure the My Page has fully loaded before attempting to logout.
  async verifyAccountOnMyPage(expectedEmail: string, expectedName: string) {
    // Assert we are on the My Page URL
    await expect(this.page).toHaveURL(/mypage/);

    // Assert the data matches our signup input
    await expect(this.myPageEmailText).toHaveText(expectedEmail);
    await expect(this.myPageNameText).toHaveText(expectedName);
  }

  async logout() {
    // Click logout button
    await this.logoutBtn.click();

    // Wait for the URL to perfectly match the index page
    await this.page.waitForURL(/index/);

    // This will NOT delete the registered user because they are saved in Local Storage.
    await this.page.context().clearCookies();

    // Hard reload the page to force the UI to refresh completely.
    // This removes any hidden or flickering states from the navbar.
    await this.page.reload();

    // Wait until the Login button in the navbar is solidly VISIBLE.
    await expect(this.navLoginBtn).toBeVisible();
  }

  async gotoLogin() {
    // We can safely use direct navigation without worrying about race conditions!
    await this.page.goto('https://hotel-example-site.takeyaqa.dev/en-US/login.html');

    // Guarantee we arrived at the login page AND the input is visible before typing
    await this.emailLoginInput.waitFor({ state: 'visible' });
  }

  async performLogin(email: string, pass: string) {
    await this.emailLoginInput.fill(email);
    await this.passwordLoginInput.fill(pass);
    await this.loginBtn.click();
  }

  async verifyEmailOnMyPage(expectedEmail: string) {
    await expect(this.myPageEmailText).toHaveText(expectedEmail);
  }

  async deleteAccount() {
    // Handle the native browser pop-up confirmation dialog
    this.page.on('dialog', async (dialog) => {
      // Inform ESLint to permit console usage here for execution visibility
      /* eslint-disable-next-line no-console */
      console.log(`[Browser Pop-up]: ${dialog.message()}`);
      await dialog.accept();
    });

    await this.deleteAccountBtn.click();
  }
}
