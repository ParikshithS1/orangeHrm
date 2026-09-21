import { test as setup, expect } from '@playwright/test';
import loginData from '../test-data/login-data.json';

const authFile = 'playwright/.auth/user.json';

setup('authenticate and force English UI', async ({ page }) => {
    await page.goto('/web/index.php/auth/login');

    await page.locator("input[name='username']").fill(loginData.validUser.username);
    await page.locator("input[name='password']").fill(loginData.validUser.correctPassword);
    await page.locator("button[type='submit']").click();

    await page.locator('.oxd-topbar-header-title, .oxd-dashboard-grid').first()
        .waitFor({ state: 'visible', timeout: 15000 });

    // The demo site is shared and its language is a server-side setting.
    // Reset it to English so text-based assertions don't break.
    const res = await page.request.put('/web/index.php/api/v2/admin/localization', {
        data: { language: 'en_US', dateFormat: 'Y-d-m' },
    });
    if (!res.ok()) {
        console.warn(`Language reset failed (${res.status()}). Set English manually in Admin > Configuration > Localization.`);
    }

    await page.context().storageState({ path: authFile });
});