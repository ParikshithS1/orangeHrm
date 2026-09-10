import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PimPage } from '../pages/PimPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.searchAndNavigate();
    await loginPage.loginToApplication();
    await expect(loginPage.verifyDashboard).toBeVisible();
});

test('addEmployee', async({page})=>{
    test.setTimeout(60000); 
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