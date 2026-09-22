// e2e/01.login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginDataRaw from '../test-data/login-data.json';
const loginData = loginDataRaw as any;
test.use({ storageState: { cookies: [], origins: [] } });
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
    await expect(loginPage.verifyDashboard).toBeVisible({timeout: 30000});
});

// 🔴 ADDING THE NEW TDD TEST BLOCK HERE
test('Should show error alert on invalid password - TDD Workflow', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.searchAndNavigate();
    
    // We execute login using your separate "invalidUser" JSON credentials
    await loginPage.loginToApplication(
        loginData.invalidUser.username,
        loginData.invalidUser.password
    );

    // 🔴 RED: This method does not exist inside LoginPage.ts yet! 
    // TypeScript will show a red squiggly line, and running this test will fail immediately.
    await loginPage.verifyInvalidCredentialsMessage('Invalid credentials');
});

test('Empty Username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.searchAndNavigate();
    
    // We execute login using your separate "invalidUser" JSON credentials
    await loginPage.loginToApplication(
        loginData.emptyUsername.username,
        loginData.emptyUsername.password
    );

    // 🔴 RED: This method does not exist inside LoginPage.ts yet! 
    // TypeScript will show a red squiggly line, and running this test will fail immediately.
    await loginPage.verifyEmptyUsername('Required');
});
    test(' Test should fail when fake username is entered', async ({ page }) => {
       const loginPage = new LoginPage(page);
          await loginPage.loginToApplication(
        loginData.fakeUser.username,
        loginData.fakeUser.password
    );        // Reading from the fake username mapping in your json
    });


 