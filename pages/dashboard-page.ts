import { Locator, Page } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly addEmployeeButton: Locator;
    readonly editAction: Locator;
    readonly logOutLink: Locator;
    readonly deleteAction: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addEmployeeButton = page.locator('[id="add"]'); 
        this.editAction = page.locator('table#employeesTable tbody tr td i.fas.fa-edit').first(); 
        this.logOutLink = page.locator('a', { hasText: 'Log Out'} );
        this.deleteAction = page.locator('table#employeesTable tbody tr td i.fas.fa-times').first(); 
    }
}