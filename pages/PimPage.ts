import { Page, Locator } from '@playwright/test'; // ❌ REMOVED: Internal 'expect' assertion import

export class PimPage {
    page: Page;
    PimSlideBar: Locator;
    addNewEmployeeIcon: Locator;
    employeeFirstName: Locator;
    employeeLastName: Locator;
    employeeAddNewSaveButton: Locator;
    selectJobSlider: Locator;
    jobTitleDropdown: Locator;
    saveJobTitleButton: Locator;
    employeeInputName: Locator;
    searchButton: Locator;
    tableCard: Locator; 
    verifyIDNumber: Locator;
    editPencilIcon: Locator;
    editEmployeeName: Locator;
    saveButton: Locator;
    verifyEditedName: Locator;
    YesDeleteTheEmployee: Locator;

       constructor(page: Page) {
        this.page = page;
        
        // ✨ THE LANGUAGE-PROOF FIX: Target the permanent HTML menu reference attribute instead of string text
        this.PimSlideBar = page.locator('a.oxd-main-menu-item[href*="viewPimModule"]');
        
        // Target the Add Employee button by its top-bar button structure instead of a exact text string
        this.addNewEmployeeIcon = page.locator('.orangehrm-header-container button, button:has-text("Add")').first();
        
        this.employeeFirstName = page.locator("//input[@name ='firstName']");
        this.employeeLastName = page.locator("//input[@name ='lastName']");
        this.employeeAddNewSaveButton = page.locator("//button[@type='submit']");
        this.selectJobSlider = page.locator('a.orangehrm-tabs-item[href*="Job"], a:text("Job")').first();
        this.jobTitleDropdown = page.locator(".oxd-select-wrapper").first();
        this.saveJobTitleButton = page.locator("//button[@type='submit']");
        this.employeeInputName = page.locator(".oxd-autocomplete-text-input input").first();
        this.searchButton = page.locator("//button[@type='submit']");
        this.tableCard = page.locator('.oxd-table-card');
        this.verifyIDNumber = page.locator("//div[text()='Id']/following-sibling::div[@class='data']");
        this.editPencilIcon = page.locator("(//button[@type='button'])");
        this.editEmployeeName = page.locator("//input[@placeholder='First Name']");
        this.saveButton = page.locator("(//button[@type='submit'])"); 
        this.verifyEditedName = page.locator("body -> div:nth-child(3) -> div:nth-child(1) -> div:nth-child(2) -> div:nth-child(2) -> div:nth-child(1) -> div:nth-child(3) -> div:nth-child(3) -> div:nth-child(1) -> div:nth-child(1) -> div:nth-child(1) -> div:nth-child(1) -> div:nth-child(1) -> div:nth-child(2) -> div:nth-child(1) -> div:nth-child(1) -> div:nth-child(2)");
        this.YesDeleteTheEmployee = page.locator("//button[normalize-space()='Yes, Delete']");
    }


    async addNewEmployee(firstName: string, lastName: string, jobTitle: string, profilePicPath: string) {
        await this.PimSlideBar.click();
        await this.addNewEmployeeIcon.click();
        const fileInput = this.page.locator("input[type='file']");
        await fileInput.setInputFiles(profilePicPath);        
        await this.employeeFirstName.click();
        await this.employeeFirstName.fill(firstName);
        await this.employeeLastName.click();
        await this.employeeLastName.fill(lastName);
        await this.employeeAddNewSaveButton.click();
          await this.page.locator('.orangehrm-horizontal-padding').first().waitFor({ state: 'visible', timeout: 10000 });
        await this.selectJobSlider.click();
        await this.jobTitleDropdown.click();
        const option = this.page.getByRole('listbox').getByText(jobTitle);
        await option.click();
        await this.saveJobTitleButton.click();
    }

    // TDD Refactor: Returns the target cell element so the test file can run the assertion check explicitly
    async employeeSearch(firstName: string, lastName: string): Promise<Locator> {
        await this.PimSlideBar.click();
        await this.employeeInputName.click();
        await this.employeeInputName.fill(firstName);
        await this.searchButton.click();
        
        const targetRow = this.tableCard.filter({ hasText: lastName });
        return targetRow.locator('div').getByText(firstName, { exact: true }).first();
    }

    async deleteEmployee(lastName: string) {
        await this.PimSlideBar.click();
        await this.employeeInputName.click();
        await this.employeeInputName.fill(lastName);
        await this.searchButton.click();
        
        const targetRow = this.tableCard.filter({ hasText: lastName });
        const rowDeleteButton = targetRow.locator('button').nth(1); 
        await rowDeleteButton.click();
        await this.YesDeleteTheEmployee.click();
    }
}
