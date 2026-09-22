import { test as setup, expect } from '@playwright/test';
import loginData from '../test-data/login-data.json';

const authFile = 'playwright/.auth/user.json';

setup('authenticate and force English UI', async ({ page }) => {
    setup.setTimeout(90000);

    await page.goto('/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });

    const username = page.locator("input[name='username']");
    await expect(username).toBeVisible({ timeout: 45000 });

    await username.fill(loginData.validUser.username);
    await page.locator("input[name='password']").fill(loginData.validUser.correctPassword);
    await page.locator("button[type='submit']").click();

    await page.locator('.oxd-topbar-header-title, .oxd-dashboard-grid').first()
        .waitFor({ state: 'visible', timeout: 45000 });

    // Shared demo site: force the UI back to English. Give it its own timeout
    // so a slow/hanging response here doesn't eat the whole test budget.
    try {
        const res = await page.request.put('/web/index.php/api/v2/admin/localization', {
            data: { language: 'en_US', dateFormat: 'Y-d-m' },
            timeout: 15000,
        });
        if (!res.ok()) {
            console.warn(`Language reset failed (${res.status()}). Set English manually if needed.`);
        }
    } catch (e) {
        console.warn('Language reset request timed out or errored, continuing anyway:', e);
    }

    await page.context().storageState({ path: authFile });
});