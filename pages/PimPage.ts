import {Page, Locator, expect} from '@playwright/test';

//Define the Pim blueprint
export class PimPage{
    page: Page;
    PimSlideBar: Locator;
    addNewEmployeeIcon: Locator;
    employeeFirstName: Locator;
    employeeLastName: Locator;
    employeeAddNewSaveButton: Locator;
    employeeInputName: Locator;
    employeeID: Locator;
    searchButton: Locator;
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
        this.employeeInputName = page.locator("(//input[@placeholder='Type for hints...'])[1]");
        this.employeeID = page.locator("//label[text()='Employee Id']/ancestor::div[contains(@class,'oxd-input-group')]//input");
        this.searchButton = page.locator("//button[@type='submit']");
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
        await this.page.waitForTimeout(3000);
        await this.addNewEmployeeIcon.click();
        await this.employeeFirstName.click();
        await this.employeeFirstName.fill('Parikshith');
        await this.employeeLastName.click();
        await this.employeeLastName.fill('Shivaprakassh');
        await this.employeeAddNewSaveButton.click();
        

    }

    async employeeSearch(){
        await this.PimSlideBar.click();
        await this.employeeInputName.click();
        await this.employeeInputName.clear();
        await this.employeeInputName.fill('Parikshith');
        await this.employeeID.click();
        await this.employeeID.fill('0564');
        await this.searchButton.click();
        await expect(this.employeeID).toBeVisible();
    }

    async deleteEmployee(){
        await this.PimSlideBar.click();
        await this.deleteTheEmployee.click();
        await this.YesDeleteTheEmployee.click();
        
    }

}

