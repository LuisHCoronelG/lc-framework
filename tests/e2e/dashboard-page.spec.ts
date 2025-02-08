import { test, expect } from '@playwright/test';
import { AddEmployeePage } from '../../pages/add-employee-page';
import { DashboardPage } from '../../pages/dashboard-page';
import { DeleteEmployeePage } from '../../pages/delete-employee-page';
import { EditEmployeePage } from '../../pages/edit-employee-page';
import { LogInPage } from '../../pages/login-page';

const baseUrl = `${process.env.BASE_URL}`;
const password = `${process.env.PASSWORD}`;
const userName = `${process.env.USER_NAME}`;

let dependants: number;
let firstName: string;
let lastName: string;

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

        dependants = Math.trunc(Math.random()*20);
        firstName = `FEFN${Date.now()}`;
        lastName = `FELN${Date.now()}`;
    
        await page.goto(baseUrl);
        await logInPage.logIn(userName, password);
        await page.waitForLoadState();
    });

    test('@smoke Add a new employee', async ({ page }) => {
        await dashboardPage.addEmployeeButton.click();
        await addEmployeePage.addEmployee(firstName, lastName, dependants.toString());

        await expect(page.getByText(firstName)).toBeVisible();
    });

    test('@smoke Edit an employee', async ({ page }) => {
        await dashboardPage.addEmployeeButton.click();
        await addEmployeePage.addEmployee(firstName, lastName, dependants.toString());
        await page.waitForLoadState();
        await dashboardPage.editAction.click();
        await editEmployeePage.editEmployee(firstName + "E", lastName + "E", dependants.toString());

        await expect(page.getByText(firstName + "E")).toBeVisible();
    });

    test('@smoke Delete an employee', async ({ page }) => {
        await dashboardPage.addEmployeeButton.click();
        await addEmployeePage.addEmployee(firstName, lastName, dependants.toString());
        await dashboardPage.deleteAction.click();
        await deleteEmployeePage.deleteButton.click();

        await expect(page.getByText(firstName)).not.toBeVisible();
    });
});