const { test, expect } = require('@playwright/test');
const selectors = require('../../page-objects/selectors');
const users = require('../../test-data/users');

test.describe('Add, Verify First Product in Cart and Delete it from Cart', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Log in to the application', async () => {
      await page.goto('/');
      await page.fill(selectors.loginPage.usernameField, users.standardUser.username);
      await page.fill(selectors.loginPage.passwordField, users.standardUser.password);
      await page.click(selectors.loginPage.loginButton);
      await page.waitForURL('/inventory.html');
      });
  });

  test('Add the first product to cart, verify the product details and remove it from the cart', async ({ page }) => {
    let firstProduct;
    let firstProductName;
    let firstProductPrice;

    await test.step('Capture the name and price of the first product', async () => {
     firstProduct = page.locator(selectors.inventoryPage.productItem).first();
     firstProductName = await firstProduct.locator(selectors.inventoryPage.productName).textContent();
     firstProductPrice = await firstProduct.locator(selectors.inventoryPage.productPrice).textContent();
     console.log(firstProductName);
     console.log(firstProductPrice);
     });

    await test.step('Add the first product to the cart', async () => {
     await firstProduct.locator(selectors.inventoryPage.addToCartButton).click();
     });

    await test.step('Verify the shopping cart icon shows "1" (one item added)', async () => {
     const cartIconBadge = page.locator(selectors.inventoryPage.cartBadge);
     await expect(cartIconBadge).toHaveText('1');
    });

    await test.step('Go to the cart page and verify the product details', async () => {
     await page.locator(selectors.inventoryPage.cartIcon).click();
     await expect(page).toHaveURL('/cart.html');
     const cartItem = page.locator(selectors.cartPage.cartItem);
     await expect(cartItem).toHaveCount(1);
    });

    await test.step('Verify the cart contains the exact first item from the home page', async () => {
     const cartProductName = await page.locator(selectors.cartPage.cartItemName).textContent();
     const cartProductPrice = await page.locator(selectors.cartPage.cartItemPrice).textContent();
     console.log(cartProductName);
     console.log(cartProductPrice);
     await expect(page.locator(selectors.cartPage.cartItemName)).toHaveText(firstProductName);
     await expect(page.locator(selectors.cartPage.cartItemPrice)).toHaveText(firstProductPrice);
    });

    await test.step('Remove the product from the cart and verify the cart is empty', async () => {
     const cartItem = page.locator(selectors.cartPage.cartItem);
     const cartIconBadge = page.locator(selectors.inventoryPage.cartBadge);
     await cartItem.locator(selectors.cartPage.removeButton).click();
     await expect(cartIconBadge).not.toBeVisible();
     await expect(cartItem).toHaveCount(0);
    });

  });
});
