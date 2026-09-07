import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage'; // match exact file casing on disk
import { PimPage } from '../pages/PimPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.searchAndNavigate();
    await loginPage.loginToApplication();

    // Explicit gate: don't let any test start until dashboard is confirmed loaded
    await expect(loginPage.verifyDashboard).toBeVisible({ timeout: 10000 });
});


test('addEmployee', async({page})=>{
    const pimAddEmployee = new PimPage(page);
    await pimAddEmployee.addNewEmployee();
})

test('employeeSearch', async ({ page }) => {
    const pimPage = new PimPage(page);
    await pimPage.employeeSearch();
  
});
test('deleteEmployee',async ({page}) => {
    const pimPageDeleteEmployee = new PimPage(page);
    await pimPageDeleteEmployee.deleteEmployee();

});