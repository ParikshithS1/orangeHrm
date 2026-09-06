import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test('orangeHrmLoginPage', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.searchAndNavigate();
    await loginPage.verifyLogoPresent();
    await loginPage.loginToApplication();

    // Explicit test-level assertion — makes the test's intent clear at a glance
    await expect(loginPage.verifyDashboard).toBeVisible();
});