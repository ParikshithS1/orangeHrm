import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import loginDataRaw from '../test-data/login-data.json';
const loginData = loginDataRaw as any;

// Own session: start logged out and log in fresh, so logging out here
// does not destroy the shared session that 03.PimPage uses.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('OrangeHRM Dashboard Widget Lifecycle (TDD Layout)', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginToApplication(
            loginData.validUser.username,
            loginData.validUser.correctPassword
        );
        await expect(loginPage.verifyDashboard).toBeVisible();
    });

    test('orangeHrm dashboardPage Layout Validation', async ({ page, context }) => {
        const dashboardPage = new DashboardPage(page);

        await expect(dashboardPage.getTimeAtWorkLocator()).toBeVisible();

        await dashboardPage.timeAtWorkWidget(
            loginData.timeSheetNote.punchInNotes,
            loginData.timeSheetNote.punchOutNotes
        );

        await expect(dashboardPage.getMyActionsLocator()).toBeVisible();
        await dashboardPage.clickMyActionsReview();

        const helpHeaderLocator = await dashboardPage.handleHelpTabVerification(context);
        await expect(helpHeaderLocator).toBeVisible({ timeout: 5000 });

        // Safe now: this only ends this test's own session
        await dashboardPage.logoutDashboard();
    });
});