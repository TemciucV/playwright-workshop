import {type Locator, type Page} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Your Email');
        this.passwordInput = page.getByPlaceholder('Your Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }
async open(): Promise<void> {
await this.page.goto('https://practicesoftwaretesting.com/auth/login');
}

async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}
}
