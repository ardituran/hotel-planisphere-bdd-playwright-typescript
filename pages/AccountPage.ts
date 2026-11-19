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
  // Username on My Page
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
    this.myPageNameText = page.locator('#username');
  }

  // --- ACTIONS ---

  async gotoSignup() {
    await this.page.goto('https://hotel-example-site.takeyaqa.dev/en-US/signup.html');
  }

  // 'any' keeps this data shape flexible for now
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async fillSignupForm(accountData: any, confirmPassword?: string) {
    await this.emailSignupInput.fill(accountData.email);
    await this.passwordSignupInput.fill(accountData.password);
    // For negative test we can pass a different confirmation password
    await this.confirmPasswordInput.fill(confirmPassword ?? accountData.password);
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

  // Check the account data on My Page first,
  // so we know the page has loaded before logout.
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

    // Wait until we are back on the home page
    await this.page.waitForURL(/index/);

    // This will NOT delete the registered user because they are saved in Local Storage.
    await this.page.context().clearCookies();

    // Reload so the navbar shows the Login button again
    await this.page.reload();

    // Wait until the Login button is visible
    await expect(this.navLoginBtn).toBeVisible();
  }

  async gotoLogin() {
    // Go directly to the login page
    await this.page.goto('https://hotel-example-site.takeyaqa.dev/en-US/login.html');

    // Wait for the email field before typing
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

  // --- NEGATIVE VERIFICATIONS ---

  // Wrong password: the app shows the same error under email and password fields
  async verifyLoginError() {
    const errorText = this.page.locator('.invalid-feedback', {
      hasText: 'Email or password is invalid.',
    });
    await expect(errorText.first()).toBeVisible();
  }

  async verifyPasswordMismatchError() {
    const errorText = this.page.locator('.invalid-feedback', {
      hasText: "Password doesn't match.",
    });
    await expect(errorText.first()).toBeVisible();
  }

  // Phone must match pattern [0-9]{11} on the Sign Up page
  async verifyPhoneError() {
    const errorText = this.page.locator('.invalid-feedback', {
      hasText: 'Please match the requested format.',
    });
    await expect(errorText.first()).toBeVisible();
  }

  async deleteAccount() {
    // Handle the native browser pop-up confirmation dialog
    this.page.on('dialog', async (dialog) => {
      // Print the pop-up message so I can see it in the log
      /* eslint-disable-next-line no-console */
      console.log(`[Browser Pop-up]: ${dialog.message()}`);
      await dialog.accept();
    });

    await this.deleteAccountBtn.click();
  }
}
