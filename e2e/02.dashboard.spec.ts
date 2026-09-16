import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
// 1. Import your JSON test data
import loginDataRaw from '../test-data/login-data.json';
const loginData = loginDataRaw as any;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.searchAndNavigate();
    
    // 2. FIXED: Pass the credentials from your JSON data file
    await loginPage.loginToApplication(
        loginData.validUser.username,
        loginData.validUser.correctPassword
    );

    // Explicit gate: don't let any test start until dashboard is confirmed loaded
    await expect(loginPage.verifyDashboard).toBeVisible({ timeout: 10000 });
});

test('orangeHrm dashboardPage Layout Validation', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.timeAtWorkWidget();
    await dashboardPage.myActionsWidgets();
    await dashboardPage.logoutDashboard();
});
