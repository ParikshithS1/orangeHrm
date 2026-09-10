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
        this.orangeHrmLogo = page.locator('img[alt*="orange"]').first(); // More flexible matching for "orange" branding
        // Alternative: this.orangeHrmLogo = page.locator('//img[contains(@alt, "orange") or contains(@src, "logo")]').first();
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.submitButton = page.locator('button[type="submit"]');
        this.verifyDashboard = page.locator("//h6[text()='Dashboard']");
    }

    async searchAndNavigate() {
        await this.page.goto('/');
    }

    async verifyLogoPresent() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.orangeHrmLogo).toBeVisible({ timeout: 15000 });
    }

    async loginToApplication() {
        await this.usernameInput.fill('Admin');
        await this.passwordInput.fill('admin123');
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.verifyDashboard).toBeVisible({ timeout: 15000 });
    }
}