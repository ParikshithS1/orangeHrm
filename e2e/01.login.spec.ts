// e2e/01.login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginDataRaw from '../test-data/login-data.json';
const loginData = loginDataRaw as any;

test('orangeHrmLoginPage', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.searchAndNavigate();
    await loginPage.verifyLogoPresent();
    
    // 💡 FIXED: Changed curly braces { } to parentheses ( ) to pass the arguments correctly
    await loginPage.loginToApplication(
        loginData.validUser.username,
        loginData.validUser.correctPassword
    );

    // Explicit test-level assertion
    await expect(loginPage.verifyDashboard).toBeVisible();
});
