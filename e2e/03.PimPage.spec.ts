import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PimPage } from '../pages/PimPage';
// 1. Import your test data so we can feed it to the login method
import loginDataRaw from '../test-data/login-data.json';
const loginData = loginDataRaw as any;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.searchAndNavigate();
    
    // 2. FIXED: Pass the credentials dynamically inside the parentheses
    await loginPage.loginToApplication(
        loginData.validUser.username,
        loginData.validUser.correctPassword
    );
    
    await expect(loginPage.verifyDashboard).toBeVisible();
});

test('addEmployee', async({page})=>{
    test.setTimeout(60000); 
    const pimAddEmployee = new PimPage(page);
    await pimAddEmployee.addNewEmployee(
        loginData.employeeData.firstName,
        loginData.employeeData.lastName,
        loginData.employeeData.jobTitle,
        loginData.employeeData.profilePicture
    );
});

test('employeeSearch', async ({ page }) => {
    const pimPage = new PimPage(page);
    await pimPage.employeeSearch(
        loginData.employeeData.firstName,
        loginData.employeeData.lastName
    ); 
});

test('deleteEmployee', async ({page}) => {
    const pimPageDeleteEmployee = new PimPage(page);
    await pimPageDeleteEmployee.deleteEmployee();
});
