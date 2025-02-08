import { Locator, Page } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly addEmployeeButton: Locator;
    readonly deleteAction: Locator;
    readonly editAction: Locator;
    readonly employeesTable: Locator;
    readonly logOutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addEmployeeButton = page.locator('[id="add"]'); 
        this.deleteAction = page.locator('table#employeesTable tbody tr td i.fas.fa-times').first(); 
        this.editAction = page.locator('table#employeesTable tbody tr td i.fas.fa-edit').first(); 
        this.employeesTable = page.locator('tbody');
        this.logOutLink = page.locator('a', { hasText: 'Log Out'} );
    }
}