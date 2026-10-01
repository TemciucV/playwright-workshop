import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";
//import (test, expect) from '../../pages/fixtures';

const email = 'cazac@gmail.com';
const password = '123456';


test('Login', async ({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);


    await loginPage.open();
     await loginPage.login(email, password);
   
});

test('Add items to cart', async ({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await homePage.open();

   await homePage.addItemsToCart('Hammer');

    await expect(homePage.cartQuantity).toContainText('1');

    await homePage.open()

    await homePage.addItemsToCart('Bolt Cutters');
    
    await expect(homePage.cartQuantity).toContainText('2');
});

test("Remove one product from cart", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.addItemsToCart('Hammer');
    
    await expect(homePage.cartQuantity).toContainText('1');

    await homePage.open()
    console.log(await homePage.cartQuantity.count());
    await homePage.addItemsToCart('Bolt Cutters');
    
    await expect(homePage.cartQuantity).toContainText('2');

    await homePage.openCart();
    await homePage.removeItemsFromCart();
    await expect(homePage.cartQuantity).toContainText('1');

    
});
