import { Locator, Page } from '@playwright/test';

export class AddEmployeePage {
    readonly page: Page;
    readonly addButton: Locator;
    readonly cancelButton: Locator;
    readonly dependantsInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addButton = page.locator('[id="addEmployee"]'); 
        this.cancelButton = page.locator('button', { hasText: 'Cancel'});
        this.dependantsInput = page.locator('[id="dependants"]'); 
        this.firstNameInput = page.locator('[id="firstName"]');
        this.lastNameInput = page.locator('[id="lastName"]');
    }

    async addEmployee(fisrtName: any, lastName: any, dependants: any) {
        await this.firstNameInput.clear();
        await this.firstNameInput.fill(fisrtName);
        await this.lastNameInput.clear();
        await this.lastNameInput.fill(lastName);
        await this.dependantsInput.clear();
        await this.dependantsInput.fill(dependants);
        await this.addButton.isEnabled();
        await this.addButton.click();
    }

    async editEmployee(fisrtName: any, lastName: any, dependants: any) {
        await this.firstNameInput.clear();
        await this.firstNameInput.fill(fisrtName);
        await this.lastNameInput.clear();
        await this.lastNameInput.fill(lastName);
        await this.dependantsInput.clear();
        await this.dependantsInput.fill(dependants);
        await this.addButton.isEnabled();
        await this.addButton.click();
    }
}