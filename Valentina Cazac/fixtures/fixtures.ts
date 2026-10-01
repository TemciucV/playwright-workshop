import { expect, Page, test as base } from '@playwright/test';

type AppFixtures = {
    loggedInPage: Page;
};

export const test = base.extend<AppFixtures>({
    loggedInPage: async ({ page }, use) => {
        await page.goto('https://practicesoftwaretesting.com/auth/login');

        //await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
        await page.locator('[data-test="email"]') .fill('customer@practicesoftwaretesting.com');
        await page.locator('[data-test="password"]') .fill('welcome01'); 
        await page.locator('[data-test="login-submit"]') .click();
        await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
        //await page.getByTestId('password').fill('welcome01');
        //await page.getByTestId('login-submit').click();
        //await expect(page.locator('[data-test="page-title"]')).toContainText('My Account');
        await use(page);
    },
}); 
export { expect };