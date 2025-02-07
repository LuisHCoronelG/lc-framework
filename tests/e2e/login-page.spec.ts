import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard-page';
import { LogInPage } from '../../pages/login-page';

test.describe('@logIn LogInPage tests', () => {
  let dashboardPage: DashboardPage;
  let logInPage: LogInPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    logInPage = new LogInPage(page);
    await page.goto('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login');
  });

  test('Login with valid user name and valid password', async ({ page }) => {
    await logInPage.logIn('TestUser723', ".a'/;a#[a*CP");
    await expect(dashboardPage.logOutLink).toBeVisible();
  });

  test('Login with valid user name and invalid password', async ({ page }) => {
    await logInPage.logIn('TestUser723', 'bad password');
    await expect(page.getByText('The specified username or password is incorrect.')).toBeVisible();
  });

  //TODO: this is test fails because of a bug, the application is returning 405 Method Not Allowed
  test('Login with invalid user name and valid password', async ({ page }) => {
    await logInPage.logIn('bad user name', 'bad password');
    await expect(page.getByText('The specified username or password is incorrect.')).toBeVisible();
  });

  test('Login with empty user name', async ({ page }) => {
    await logInPage.logIn('', 'bad password');
    await expect(page.getByText('The Username field is required.')).toBeVisible();
  });

  test('Login with empty password', async ({ page }) => {
    await logInPage.logIn('TestUser723', '');
    await expect(page.getByText('The Password field is required.')).toBeVisible();
  });
});