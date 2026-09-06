import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage'; // match exact file casing on disk
import { DashboardPage } from '../pages/DashboardPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.searchAndNavigate();
    await loginPage.loginToApplication();

    // Explicit gate: don't let any test start until dashboard is confirmed loaded
    await expect(loginPage.verifyDashboard).toBeVisible({ timeout: 10000 });
});

test('orangeHrm dashboardPage Layout Validation', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.timeAtWorkWidget();
    await dashboardPage.myActionsWidgets();
    await dashboardPage.logoutDashboard();
});

