import fs from 'fs';
import path from 'node:path';
import {test , expect} from '@playwright/test';
import {parse} from 'csv-parse/sync';       

type LoginCase = {
    name: string;
    email: string;
    password: string;
    expectedResult: string;
};

const csvPath = path.join(process.cwd(), 'test-data', 'login-users.csv');
const csvText = fs.readFileSync(csvPath, 'utf-8');

const loginCases = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';',
}) as LoginCase[];


for (const data of loginCases) {
  test(`CSV data: ${data.name} can log in`, async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    await page.locator('[data-test="email"]').fill(data.email);
    await page.locator('[data-test="password"]').fill(data.password);
    await page.locator('[data-test="login-submit"]').click();

    if (data.expectedResult === 'My account') {
      await expect(page).toHaveURL(/\/account/);
    } else {
      await expect(page.getByText(data.expectedResult)).toBeVisible();
    }
  });
}


        