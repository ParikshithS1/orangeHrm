import { Page, Locator } from '@playwright/test'; //
export class DashboardPage {
    page: Page;
    timeAtWork: Locator;
    timeAtWorkSymbol: Locator;
    timeSheetNote: Locator;
    timeSheetIn: Locator;
    timeOutNote: Locator;
    timeSheetOut: Locator;
    dashBoardSlider: Locator;
    myActions: Locator;
    myActionsButtonReview: Locator;
    profileDropdown: Locator;
    dashBoardLogout: Locator;
    formLoader: Locator;
    helpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.timeAtWork = page.getByText('Time at Work', { exact: true });
        this.timeAtWorkSymbol = page.locator('.orangehrm-attendance-card').getByRole('button');
        this.timeSheetNote = page.locator("(//textarea[@placeholder='Type here'])");
        this.timeSheetIn = page.locator("//button[@type='submit']");
        this.timeOutNote = page.getByPlaceholder('Type here');
        this.timeSheetOut = this.page.locator('.orangehrm-attendance-card button[type="submit"], button[type="submit"]');        
        this.dashBoardSlider = this.page.locator('a.oxd-main-menu-item[href*="dashboard"]');
        this.formLoader = page.locator('.oxd-form-loader');
        this.myActions = this.page.locator("(//div[contains(@class, 'orangehrm-dashboard-widget-name')]/p)[2]");
        this.myActionsButtonReview = page.locator("(//button[@type='button'])[5]");
        this.helpButton =  this.page.locator('button[title="Help"]');
        this.profileDropdown = page.locator("//i[contains(@class, 'oxd-userdropdown-icon')]");
        this.dashBoardLogout = page.locator("//a[text()='Logout']");
    }

    // TDD Compliance: Getter methods that return elements for the test layer to assert
    getTimeAtWorkLocator(): Locator {
        return this.timeAtWork;
    }

    getMyActionsLocator(): Locator {
        return this.myActions;
    }

    async timeAtWorkWidget(punchIn: string = '', punchOut: string = '') {
        await this.timeAtWorkSymbol.click();
        await this.formLoader.waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
        await this.timeSheetNote.fill(punchIn);
        await this.timeSheetIn.click();
        await this.formLoader.waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
        await this.timeOutNote.fill(punchOut);
        await this.timeSheetOut.click();
        await this.dashBoardSlider.click();
    }

    async clickMyActionsReview() {
        await this.myActionsButtonReview.click();
        await this.dashBoardSlider.click();
    }

    async handleHelpTabVerification(context: any): Promise<Locator> {
        const newTabPromise = context.waitForEvent('page');
        await this.helpButton.click();
        
        const helpTab = await newTabPromise;
        await helpTab.waitForLoadState('domcontentloaded');

        // Target the element layout and return it so the E2E Spec can verify it
        const helpPageHeader = helpTab.locator('.blocks-item-title, .support-header, header').first();
        
        await this.page.bringToFront();
        // Note: Do not close the tab here if you want to assert its visibility in the test file
        return helpPageHeader; 
    }
    
    async logoutDashboard(){
        await this.profileDropdown.click();
        await this.dashBoardLogout.click();
    } 
}
