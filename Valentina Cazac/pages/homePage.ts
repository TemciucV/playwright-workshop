import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly cart: Locator;
    readonly sortDropdown: Locator;
    readonly productLinks: Locator;
    readonly prices: Locator;
    readonly addToCartButton: Locator; 
    readonly removeFromCartButton: Locator;
    readonly cartQuantity: Locator;
   

    constructor(page: Page) {
        this.page = page;
        this.cartQuantity = page.locator('[data-test="cart-quantity"]');
        this.cart = page.locator('[data-test="nav-cart"]');
        this.sortDropdown = page.getByLabel('sort'); //data test="sort"
        this.productLinks = page.locator('a.card');
        this.prices = page.locator('[data-test="product-price"]');
        this.addToCartButton = page.locator('[data-test="add-to-cart"]');
        //this.addToCartButtons = page.getByRole('button', { name: /add to cart/i });
        this.removeFromCartButton = page.locator('a.btn.btn-danger');
        const searchQuery = page.locator('[data-test="search-query"]');
    }
    async open(): Promise<void> { await this.page.goto('https://practicesoftwaretesting.com/'); }

async addItemsToCart(productName: string): Promise<void> {
    const product = this.productLinks
        .filter({ hasText: productName })
        .first();

    await product.click();
    await this.addToCartButton.click();
}
async openCart(): Promise<void> {
    await this.cart.click();
}
    async removeItemsFromCart(): Promise<void> { await this.removeFromCartButton.first().click(); }
}

