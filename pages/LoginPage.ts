// Step 1: Import the essential tools we need from Playwright
import { Page, Locator, expect } from '@playwright/test';

// Step 2: Define the page object blueprint
export class LoginPage {
    page: Page;
    orangeHrmLogo: Locator;
    usernameInput: Locator;
    passwordInput: Locator;
    submitButton: Locator;
    verifyDashboard: Locator;

    // Step 3: The constructor maps out where the elements live on the webpage
    constructor(page: Page) {
        this.page = page;
        this.orangeHrmLogo = page.locator("//img[@alt='company-branding']");
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.submitButton = page.locator('button[type="submit"]');
        this.verifyDashboard = page.locator("//h6[text()='Dashboard']");
    }

    // Step 4: Action methods

    async searchAndNavigate() {
        await this.page.goto('/');
    }

    async verifyLogoPresent() {
        await expect(this.orangeHrmLogo).toBeVisible();
    }

    async loginToApplication() {
        // already auto-wait for the element to be actionable
        await this.usernameInput.fill('Admin');
        await this.passwordInput.fill('admin123');
        await this.submitButton.click();
        await this.page.waitForTimeout(3000);
        await expect(this.verifyDashboard).toBeVisible();
   
   
    }
}