import { Locator, Page } from '@playwright/test';

export class LogInPage {
    readonly page: Page;
    readonly logInButton: Locator;
    readonly passwordInput: Locator;
    readonly userNameInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logInButton = page.locator('button', { hasText: 'Log In'} );
        this.passwordInput = page.locator('[id="Password"]');
        this.userNameInput = page.locator('[id="Username"]');
    }

    async logIn(userName: any, password: any) {
        await this.userNameInput.clear();
        await this.userNameInput.fill(userName);
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
        await this.logInButton.isEnabled();
        await this.logInButton.click();
    }
}