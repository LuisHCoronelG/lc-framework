import { Locator, Page } from '@playwright/test';

export class EditEmployeePage {
    readonly page: Page;
    readonly cancelButton: Locator;
    readonly dependantsInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly updateButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cancelButton = page.locator('button', { hasText: 'Cancel'});
        this.dependantsInput = page.locator('[id="dependants"]'); 
        this.firstNameInput = page.locator('[id="firstName"]');
        this.lastNameInput = page.locator('[id="lastName"]');
        this.updateButton = page.locator('[id="updateEmployee"]'); 
    }

    async editEmployee(fisrtName: any, lastName: any, dependants: any) {
        await this.firstNameInput.clear();
        await this.firstNameInput.fill(fisrtName);
        await this.lastNameInput.clear();
        await this.lastNameInput.fill(lastName);
        await this.dependantsInput.clear();
        await this.dependantsInput.fill(dependants);
        await this.updateButton.isEnabled();
        await this.updateButton.click();
    }
}