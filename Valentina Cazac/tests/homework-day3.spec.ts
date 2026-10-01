//Exercise 1

import { test, expect } from '@playwright/test';

test('Pliers', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  const searchQuery = page.locator('[data-test="search-query"]');
  await searchQuery.scrollIntoViewIfNeeded();

  await searchQuery.fill('Pliers');
  await expect(searchQuery).toHaveValue('Pliers');

  await searchQuery.press('Enter');

  const pliersProducts = page
    .locator('[data-test="product-name"]')
    .filter({ hasText: /pliers/i });

  await expect(pliersProducts).toHaveCount(4);
});

//Exercise 2
//import { test, expect } from '@playwright/test';

test('Hammers', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  const hammerCheckbox = page.getByLabel('Hammer');

 await hammerCheckbox.scrollIntoViewIfNeeded();
  await hammerCheckbox.check();

  await expect(hammerCheckbox).toBeChecked();

  const hammerProducts = page
    .locator('[data-test="product-name"]')
    .filter({ hasText: /hammer/i });

  await expect(hammerProducts).toHaveCount(7);

  await hammerCheckbox.uncheck();
  await expect(hammerCheckbox).not.toBeChecked();
});

//Exercice 3
test('Sort Products by Name', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  const sortDropdown = page.locator('[data-test="sort"]');
  await sortDropdown.selectOption({ label: 'Name (A - Z)' });

  const productCards = page.locator(
    '[data-test="product-name"].card-title'
  );

  await expect(productCards).toHaveCount(9);

  await expect(productCards.first()).toContainText('Adjustable Wrench');
  await expect(productCards.first()).toHaveClass(/card-title/);
});


//Exercice 4
test('Inspect a Product', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  const searchQuery = page.locator('[data-test="search-query"]');

  await searchQuery.fill('Bolt Cutters');
  await searchQuery.press('Enter');

const product = page
  .locator('[data-test="product-name"].card-title')
  .filter({ hasText: 'Bolt Cutters' });


  await product.click();

  await expect(
   page.getByRole('heading', { name: 'Bolt Cutters', level: 1 })
 ).toBeVisible();

  const quantity = page.getByRole('spinbutton');
//await quantity.scrollIntoViewIfNeeded();
//const quantity = page.locator('[data-test="quantity"]');
await expect(quantity).toBeVisible();
await expect(quantity).toHaveValue('1');

  const increaseQuantityButton = page.locator(
    '[data-test="increase-quantity"]'
  );

  await increaseQuantityButton.scrollIntoViewIfNeeded();
  await increaseQuantityButton.click();

  await expect(quantity).toHaveValue('2');

  const addToCartButton = page.locator('[data-test="add-to-cart"]');

  await addToCartButton.scrollIntoViewIfNeeded();
  await addToCartButton.click();

  await expect(
    page.getByRole('alert')
  ).toContainText('Product added to shopping cart');

  const cart = page.locator('[data-test="nav-cart"]');

  await expect(cart).toBeVisible();
  await expect(cart).toContainText('2');
});