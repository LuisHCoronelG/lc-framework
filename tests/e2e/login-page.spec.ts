import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard-page';
import { LogInPage } from '../../pages/login-page';

const baseUrl = `${process.env.BASE_URL}`;
const password = `${process.env.PASSWORD}`;
const userName = `${process.env.USER_NAME}`;

test.describe('@logIn LogInPage tests', () => {
  let dashboardPage: DashboardPage;
  let logInPage: LogInPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    logInPage = new LogInPage(page);
    await page.goto(baseUrl);
  });

  test('Login with valid user name and valid password', async ({ page }) => {
    await logInPage.logIn(userName, password);
    await expect(dashboardPage.logOutLink).toBeVisible();
  });

  test('Login with valid user name and invalid password', async ({ page }) => {
    await logInPage.logIn(userName, 'bad password');
    await expect(page.getByText('The specified username or password is incorrect.')).toBeVisible();
  });

  test('Login with invalid user name and valid password', async ({ page }) => {
    await logInPage.logIn('bad user name', 'bad password');
    await expect(page.getByText('The specified username or password is incorrect.')).toBeVisible();
  });

  test('Login with empty user name', async ({ page }) => {
    await logInPage.logIn('', password);
    await expect(page.getByText('The Username field is required.')).toBeVisible();
  });

  test('Login with empty password', async ({ page }) => {
    await logInPage.logIn(userName, '');
    await expect(page.getByText('The Password field is required.')).toBeVisible();
  });
});