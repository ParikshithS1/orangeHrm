import { test, expect } from '@playwright/test';
import { PimPage } from '../pages/PimPage';
import loginDataRaw from '../test-data/login-data.json';
const loginData = loginDataRaw as any;

test.describe('OrangeHRM Pim Module - End-to-End Employee Lifecycle', { tag: '@smoke' }, () => {

    test.beforeEach(async ({ page }) => {
        // ✅ Bypasses the login wall using your verified global setup cookies!
        await page.goto('/web/index.php/pim/viewEmployeeList');
    });

    test('Should successfully Create, Search, and Delete an employee record sequentially', async ({ page }) => {
        // Set a healthy timeout for the entire sequence to handle application loads
        test.setTimeout(60000); 
        const pimPage = new PimPage(page);

        // -------------------------------------------------------------
        // STEP 1: CREATE (addEmployee)
        // -------------------------------------------------------------
        console.log('🏗️ Step 1: Adding a new employee record...');
        await pimPage.addNewEmployee(
            loginData.employeeData.firstName,
            loginData.employeeData.lastName,
            loginData.employeeData.jobTitle,
            loginData.employeeData.profilePicture
        );

        // -------------------------------------------------------------
        // STEP 2: READ (employeeSearch)
        // -------------------------------------------------------------
        console.log('🔍 Step 2: Verifying employee exists via search database...');
        const searchResultCell = await pimPage.employeeSearch(
            loginData.employeeData.firstName,
            loginData.employeeData.lastName
        ); 
        
        // 🧪 TDD Assertion: Explicitly verify the employee's name cell is visible in the data grid
        await expect(searchResultCell).toBeVisible({ timeout: 10000 });
        console.log('✅ Employee found in data table successfully!');

        // -------------------------------------------------------------
        // STEP 3: DELETE (deleteEmployee)
        // -------------------------------------------------------------
        console.log('🗑️ Step 3: Removing employee record from the system...');
        await pimPage.deleteEmployee(loginData.employeeData.lastName);
        
        // Final TDD Verification: Validate that searching for them again returns a hidden/empty state
        const deletedResultCell = await pimPage.employeeSearch(
            loginData.employeeData.firstName,
            loginData.employeeData.lastName
        );
        await expect(deletedResultCell).toBeHidden({ timeout: 10000 });
        console.log('🎉 Employee lifecycle completed and cleaned up error-free!');
    });
});
