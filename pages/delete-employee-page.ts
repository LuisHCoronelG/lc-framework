import { Locator, Page } from '@playwright/test';

export class DeleteEmployeePage {
    readonly page: Page;
    readonly cancelButton: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cancelButton = page.locator('button', { hasText: 'Cancel'});
        this.deleteButton = page.locator('[id="deleteEmployee"]'); 
    }
}
