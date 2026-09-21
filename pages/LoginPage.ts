import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly orangeHrmLogo: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly verifyDashboard: Locator;
    readonly invalidCredentialsAlert: Locator;
    readonly emptyUsername: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Refactored to adhere to Playwright best locator practices
        this.orangeHrmLogo = page.getByAltText('company-branding');
       this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.submitButton = page.locator('button[type="submit"]');
this.verifyDashboard = page.locator('.oxd-topbar-header-title h6, h6.oxd-topbar-header-breadcrumb-module');
        this.invalidCredentialsAlert = page.getByRole('alert');
        this.emptyUsername = page.getByText('Required');

    }

    async searchAndNavigate() {
        await this.page.goto('/');
    }

    async verifyLogoPresent() {
        await expect(this.orangeHrmLogo).toBeVisible({ timeout: 15000 });
    }

   

    // REMOVED: The internal Dashboard assertion so this function can be reused for error paths
    async loginToApplication(username: string, password: string) {
        await this.searchAndNavigate();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

       async verifyInvalidCredentialsMessage(expectedText: string) {
        await expect(this.invalidCredentialsAlert).toBeVisible({ timeout: 5000 });
        await expect(this.invalidCredentialsAlert).toContainText(expectedText);
    }

    async verifyEmptyUsername(expectedText: string){
        await expect(this.emptyUsername).toBeVisible({timeout:5000});
         await expect(this.emptyUsername).toContainText(expectedText);
    }


}
