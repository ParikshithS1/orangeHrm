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
    deleteTheEmployee: Locator;
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
       this.deleteTheEmployee = page.locator("(//button[@type='button'])[7]");
       this.YesDeleteTheEmployee = page.locator("//button[normalize-space()='Yes, Delete']");
    } 


  

    async addNewEmployee(){
        await this.PimSlideBar.click();
        await this.addNewEmployeeIcon.click();
         const fileInput = this.page.locator("input[type='file']");
        // Generates an absolute path dynamically from the root folder without needing external libraries
        await fileInput.setInputFiles('profile.jpeg');        
        await this.employeeFirstName.click();
        await this.employeeFirstName.fill('ParikshithS');
        await this.employeeLastName.click();
        await this.employeeLastName.fill('Shivaprakassh');
        await this.employeeAddNewSaveButton.click();
        await this.selectJobSlider.click();
        await this.jobTitleDropdown.click();
        const option = this.page.getByRole('listbox').getByText('Software Engineer');
        await option.click();
         await this.saveJobTitleButton.click();
    }

    async employeeSearch(){
        await this.PimSlideBar.click();
        await this.employeeInputName.click();
        await this.employeeInputName.fill('ParikshithS');
        await this.searchButton.click();
      // Dynamically tracks down the target row via Last Name
    const targetRow = this.tableCard.filter({ hasText: 'Shivaprakassh' });
    // ADDED .first() to resolve the strict mode violation error
    const firstNameCell = targetRow.locator('div').getByText('ParikshithS', { exact: true }).first();
    // Asserts element visibility safely now that it targets a unique element
    await expect(firstNameCell).toBeVisible();
    }

    async deleteEmployee(){
        await this.PimSlideBar.click();
        await this.deleteTheEmployee.click();
        await this.YesDeleteTheEmployee.click();
        
    }

}

