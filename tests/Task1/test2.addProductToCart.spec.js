const { test, expect } = require('@playwright/test');
const selectors = require('../../page-objects/selectors');
const users = require('../../page-objects/users');

test.describe('Add, Verify First Product in Cart and Delete it from Cart', () => {
  test.beforeEach(async ({ page }) => {
    // Step 1: Log in to the application
    await page.goto('/');
    await page.fill(selectors.loginPage.usernameField, users.standardUser.username);
    await page.fill(selectors.loginPage.passwordField, users.standardUser.password);
    await page.click(selectors.loginPage.loginButton);
    await page.waitForURL('/inventory.html');
  });

  test('add the first product to cart, verify the product details and remove it from the cart', async ({ page }) => {
    // Step 2: Capture the name and price of the first product
    const firstProduct = page.locator(selectors.inventoryPage.productItem).first();
    const firstProductName = await firstProduct.locator(selectors.inventoryPage.productName).textContent();
    const firstProductPrice = await firstProduct.locator(selectors.inventoryPage.productPrice).textContent();
    console.log(firstProductName);
    console.log(firstProductPrice);

    // Step 3: Add the first product to the cart
    await firstProduct.locator(selectors.inventoryPage.addToCartButton).click();

    // Step 4: Verify the shopping cart icon shows "1" (one item added)
    const cartIconBadge = page.locator(selectors.inventoryPage.cartBadge);
    await expect(cartIconBadge).toHaveText('1');

    // Step 5: Go to the cart page and verify the product details
    // await page.click(selectors.inventoryPage.cartIcon);
    await page.locator(selectors.inventoryPage.cartIcon).click();
    await expect(page).toHaveURL('/cart.html');

    const cartItem = page.locator(selectors.cartPage.cartItem);
    await expect(cartItem).toHaveCount(1);

    // Step 6: Verify the cart contains the exact first item from the home page
    const cartProductName = await page.locator(selectors.cartPage.cartItemName).textContent();
    const cartProductPrice = await page.locator(selectors.cartPage.cartItemPrice).textContent();
    console.log(cartProductName);
    console.log(cartProductPrice);

    await expect(cartProductName).toBe(firstProductName);
    await expect(cartProductPrice).toBe(firstProductPrice);
    await expect(page.locator(selectors.cartPage.cartItemName)).toHaveText(firstProductName);

    // Step 7: Remove the product from the cart and verify the cart is empty
    await cartItem.locator(selectors.cartPage.removeButton).click();
    await expect(cartIconBadge).not.toBeVisible();
    await expect(cartItem).toHaveCount(0);
  });
});
