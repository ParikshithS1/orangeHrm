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
        // Try alternative locators - use role-based or more flexible selectors
        this.orangeHrmLogo = page.locator('img[alt*="branding"]').first(); // More flexible alt attribute matching
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.submitButton = page.locator('button[type="submit"]');
        this.verifyDashboard = page.locator("//h6[text()='Dashboard']");
    }

    async searchAndNavigate() {
        await this.page.goto('/');
    }

    async verifyLogoPresent() {
        // Add explicit wait with longer timeout for page load
        await this.page.waitForLoadState('networkidle');
        await expect(this.orangeHrmLogo).toBeVisible({ timeout: 10000 });
    }

    async loginToApplication() {
        await this.usernameInput.fill('Admin');
        await this.passwordInput.fill('admin123');
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.verifyDashboard).toBeVisible({ timeout: 10000 });
    }
}