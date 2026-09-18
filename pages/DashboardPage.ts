// Step 1. Import the essential tools we need from playwright
import { Page, Locator, expect } from '@playwright/test';

// Step 2 Define the Dashboard blueprint
export class DashboardPage {
    page: Page;
    timeAtWork: Locator;
    timeAtWorkSymbol: Locator;
    timeSheetNote: Locator;
    timeSheetIn: Locator;
    timeOutNote: Locator;
    timeSheetOut: Locator;
    dashBoardSlider: Locator
    myActions: Locator;
    myActionsButtonReview: Locator;
    profileDropdown: Locator;
    dashBoardLogout: Locator;
    formLoader: Locator;

    constructor(page: Page) {
        this.page = page;

        // Exact text match instead of substring, no tag assumption
        this.timeAtWork = page.getByText('Time at Work', { exact: true });

         // Scope to the widget's container instead of indexing all buttons on the page
        this.timeAtWorkSymbol = page.locator('.orangehrm-attendance-card').getByRole('button');
        this.timeSheetNote = page.locator("(//textarea[@placeholder='Type here'])");
        this.timeSheetIn = page.locator("//button[@type='submit']");
        this.timeOutNote = page.getByPlaceholder('Type here');
        this.timeSheetOut = page.getByRole('button', { name: 'Out' });
        this.dashBoardSlider = page.locator("//span[text()='Dashboard']");
          this.formLoader = page.locator('.oxd-form-loader');
        this.myActions = this.page.locator("(//div[contains(@class, 'orangehrm-dashboard-widget-name')]/p)[2]");
        this.myActionsButtonReview = page.locator("(//button[@type='button'])[5]");
        this.profileDropdown = page.locator("//i[contains(@class, 'oxd-userdropdown-icon')]");
        this.dashBoardLogout = page.locator("//a[text()='Logout']");
    
    }

    async timeAtWorkWidget(punchIn: string = '', punchOut: string = '') {
        await expect(this.timeAtWork).toBeVisible();
        await this.timeAtWorkSymbol.click();
           // Ensure the loading screen indicator is fully detached from the DOM structure
        await this.formLoader.waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
        await this.timeSheetNote.fill(punchIn);
        await this.timeSheetIn.click();
        await this.timeOutNote.fill(punchOut);
        await this.timeSheetOut.click();
        await this.dashBoardSlider.click();
 
    }
    async myActionsWidgets(){
        await expect(this.myActions).toBeVisible();
        await this.myActionsButtonReview.click();

    }

    

    async logoutDashboard(){
        await this.profileDropdown.click();
        await this.dashBoardLogout.click();

    } 

}
