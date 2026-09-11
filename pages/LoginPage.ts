// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    page: Page;
    orangeHrmLogo: Locator;
    usernameInput: Locator;
    passwordInput: Locator;
    submitButton: Locator;
    verifyDashboard: Locator;

    constructor(page: Page) {
        this.page = page;
        // Use role-based locator which is more reliable across different HTML structures
        this.orangeHrmLogo = page.locator("//img[contains(@alt, 'orange')]").first();        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.submitButton = page.locator('button[type="submit"]');
        this.verifyDashboard = page.locator("//h6[text()='Dashboard']");
    }

    async searchAndNavigate() {
        await this.page.goto('/');
    }

    async verifyLogoPresent() {
        await expect(this.orangeHrmLogo).toBeVisible({ timeout: 15000 });
    }

    async loginToApplication() {
          if (this.page.url() === 'about:blank' || this.page.url() === '') {
            await this.searchAndNavigate();
        }
        await this.usernameInput.fill('Admin');
        await this.passwordInput.fill('admin123');
        await this.submitButton.click();
        await expect(this.verifyDashboard).toBeVisible({ timeout: 15000 });
    }
}