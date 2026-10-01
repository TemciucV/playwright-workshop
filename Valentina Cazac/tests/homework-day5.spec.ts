import { expect,test } from '../fixtures/fixtures'; 

test.describe('Catalog hooks', () => { 
    
    let suiteStartTime: Date; 

    test.beforeAll(async () => { suiteStartTime = new Date();

    console.log( `Catalog suite started at: ${suiteStartTime.toLocaleString()}` );

    });

    test.beforeEach(async ({ page }) => { 
        await page.goto('https://practicesoftwaretesting.com/');
    });

    test('Catalog page is loaded', async ({ page }) => { 
    await expect(page).toHaveTitle(/Practice Software Testing/); 

    });

    test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      const screenshotPath =
        testInfo.outputPath('failure-screenshot.png');

      await page.screenshot({
        path: screenshotPath,
      });

      await testInfo.attach('failure-screenshot', {
        path: screenshotPath,
        contentType: 'image/png',
      });
    }
  });
     test.afterAll(async () => {

          const suiteEndTime = new Date(); 

         console.log( `Catalog suite finished at: ${suiteEndTime.toLocaleString()}` 
        ); 
    });

test('Account page is open', async ({ loggedInPage }) => {
    await expect(loggedInPage.locator('[data-test="page-title"]')).toContainText('My account');
});
}); 
