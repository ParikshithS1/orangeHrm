import {Page, Locator, expect} from '@playwright/test';

//Define the Pim blueprint
export class PimPage{
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



    constructor(page: Page){
        this.page = page;
        this.PimSlideBar = page.locator("//span[text()='PIM']");
        this.addNewEmployeeIcon = page.locator("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
        this.employeeFirstName = page.locator("//input[@name ='firstName']");
        this.employeeLastName= page.locator("//input[@name ='lastName']");
        this.employeeAddNewSaveButton = page.locator("//button[@type='submit']");
        this.selectJobSlider = page.locator("//a[contains(text(),'Job')]") ;
        this.jobTitleDropdown = page.locator("(//div[contains(text(),'-- Select --')])[1]");
        this.saveJobTitleButton = page.locator("//button[@type='submit']");
        this.employeeInputName = page.locator("(//input[@placeholder='Type for hints...'])[1]");
        this.searchButton = page.locator("//button[@type='submit']");
        this.tableCard = page.locator('.oxd-table-card');
        this.verifyIDNumber = page.locator("//div[text()='Id']/following-sibling::div[@class='data']");
        this.editPencilIcon = page.locator("(//button[@type='button'])[6]");
        this.editEmployeeName = page.locator("//input[@placeholder='First Name']");
        this.saveButton = page.locator("(//button[@type='submit'])[1]"); 
       this.verifyEditedName = page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)");
      
       this.YesDeleteTheEmployee = page.locator("//button[normalize-space()='Yes, Delete']");
    } 


  

    async addNewEmployee(firstName: string, lastName: string, jobTitle: string, profilePicPath: string){
        await this.PimSlideBar.click();
        await this.addNewEmployeeIcon.click();
         const fileInput = this.page.locator("input[type='file']");
        // Generates an absolute path dynamically from the root folder without needing external libraries
        await fileInput.setInputFiles(profilePicPath);        
        await this.employeeFirstName.click();
        await this.employeeFirstName.fill(firstName);
        await this.employeeLastName.click();
        await this.employeeLastName.fill(lastName);
        await this.employeeAddNewSaveButton.click();
        await this.selectJobSlider.click();
        await this.jobTitleDropdown.click();
        const option = this.page.getByRole('listbox').getByText(jobTitle);
        await option.click();
         await this.saveJobTitleButton.click();
    }

    async employeeSearch(firstName: string, lastName: string){
        await this.PimSlideBar.click();
        await this.employeeInputName.click();
        await this.employeeInputName.fill(firstName);
        await this.searchButton.click();
      // Dynamically tracks down the target row via Last Name
    const targetRow = this.tableCard.filter({ hasText: lastName });
    // ADDED .first() to resolve the strict mode violation error
    const firstNameCell = targetRow.locator('div').getByText(firstName, { exact: true }).first();
    // Asserts element visibility safely now that it targets a unique element
    await expect(firstNameCell).toBeVisible();
    }

   // pages/PimPage.ts

async deleteEmployee(lastName: string) {
    // 1. Navigate to PIM module
    await this.PimSlideBar.click();
    
    // 2. Clear out the 108 records by searching for the target employee first
    await this.employeeInputName.click();
    await this.employeeInputName.fill(lastName);
    await this.searchButton.click();
    
    // 3. Dynamically isolate the exact single row card left on the screen
    const targetRow = this.tableCard.filter({ hasText: lastName });
    
    // 4. Locate the trash can icon inside that isolated row and click it safely
    const rowDeleteButton = targetRow.locator('button').nth(1); 
    await rowDeleteButton.click();
    
    // 5. Confirm the action step
    await this.YesDeleteTheEmployee.click();
}

}

