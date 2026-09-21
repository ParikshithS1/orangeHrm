import { test, expect } from '@playwright/test'; // 🌟 Using standard default Playwright imports
import { DashboardPage } from '../pages/DashboardPage'; // Import your page objects directly
import loginDataRaw from '../test-data/login-data.json';
const loginData = loginDataRaw as any;

test.describe('OrangeHRM Dashboard Widget Lifecycle (TDD Layout)', () => {

    test.beforeEach(async ({ page }) => {
        // ✅ Pre-authenticated via global setup. Navigate directly!
        await page.goto('/web/index.php/dashboard/index'); 
    });

    test('orangeHrm dashboardPage Layout Validation', async ({ page, context }) => {
        // Since we are not using custom fixtures, manually instantiate your page object here
        const dashboardPage = new DashboardPage(page);
        
        // Assert: First verify widget requirements are visible before interacting
        await expect(dashboardPage.getTimeAtWorkLocator()).toBeVisible();
        
        // Act: Handle time tracking steps
        await dashboardPage.timeAtWorkWidget(
            loginData.timeSheetNote.punchInNotes,
            loginData.timeSheetNote.punchOutNotes
        );
        
        // Assert & Act: Handle actions layout validation
        await expect(dashboardPage.getMyActionsLocator()).toBeVisible();
        await dashboardPage.clickMyActionsReview();
        
        // Act & Assert: Handle Help Tab Verification explicitly in the test layer
        const helpHeaderLocator = await dashboardPage.handleHelpTabVerification(context);
        await expect(helpHeaderLocator).toBeVisible({ timeout: 5000 });
        
        // Act: Logout clean-up
        await dashboardPage.logoutDashboard();
    });
});
