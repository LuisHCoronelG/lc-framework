import { test, expect } from '@playwright/test';
import { AddEmployeePage } from '../../pages/add-employee-page';
import { DashboardPage } from '../../pages/dashboard-page';
import { DeleteEmployeePage } from '../../pages/delete-employee-page';
import { EditEmployeePage } from '../../pages/edit-employee-page';
import { LogInPage } from '../../pages/login-page';

test.describe('@dashboard DashboardPage tests', () => {
    let addEmployeePage: AddEmployeePage;
    let dashboardPage: DashboardPage;
    let deleteEmployeePage: DeleteEmployeePage;
    let editEmployeePage: EditEmployeePage;
    let logInPage: LogInPage;

    test.beforeEach(async ({ page }) => {
        addEmployeePage = new AddEmployeePage(page);
        dashboardPage = new DashboardPage(page);
        deleteEmployeePage = new DeleteEmployeePage(page);
        editEmployeePage = new EditEmployeePage(page);
        logInPage = new LogInPage(page);
        await page.goto('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login');
    });

    test('Add a new employee', async ({ page }) => {
        await logInPage.logIn('TestUser723', ".a'/;a#[a*CP");
        await expect(dashboardPage.logOutLink).toBeVisible();
        await page.waitForTimeout(2000);

        await dashboardPage.addEmployeeButton.click();
        await page.waitForTimeout(2000);

        await addEmployeePage.addEmployee('Test', 'User', '1');
        await page.waitForTimeout(2000);
    });

    test.only('Edit an employee', async ({ page }) => {
        await logInPage.logIn('TestUser723', ".a'/;a#[a*CP");
        await expect(dashboardPage.logOutLink).toBeVisible();

        await page.waitForTimeout(2000);


        await dashboardPage.addEmployeeButton.click();
        await page.waitForTimeout(2000);

        await addEmployeePage.addEmployee('Test', 'User', '1');
        await page.waitForTimeout(2000);


        await dashboardPage.editAction.click();

        await page.waitForTimeout(2000);

        await editEmployeePage.editEmployee('TestE', 'UserE', '7');
        await page.waitForTimeout(2000);

    });

    test('Delete an employee', async ({ page }) => {
        await logInPage.logIn('TestUser723', ".a'/;a#[a*CP");
        await expect(dashboardPage.logOutLink).toBeVisible();
        await page.waitForTimeout(2000);


        await dashboardPage.addEmployeeButton.click();
        await page.waitForTimeout(2000);

        await addEmployeePage.addEmployee('Test', 'User', '1');
        await page.waitForTimeout(2000);


        await dashboardPage.deleteAction.click();

        await page.waitForTimeout(2000);

        await deleteEmployeePage.deleteButton.click();

        await page.waitForTimeout(2000);
    });
});