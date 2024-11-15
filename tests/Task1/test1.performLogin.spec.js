const { test, expect } = require('@playwright/test');
const selectors = require('../../page-objects/selectors');
const users = require('../../test-data/users');

test('Verify login functionality and UI elements on the home page', async ({ page }) => {
  await test.step('Navigate to the Sauce Demo login page', async () => {
   await page.goto('/');
  });

  await test.step('Enter the username and password, click the login button and wait for the page to navigate to the inventory page to confirm login', async () => {
   await page.fill(selectors.loginPage.usernameField, users.standardUser.username);
   await page.fill(selectors.loginPage.passwordField, users.standardUser.password);
   await page.click(selectors.loginPage.loginButton);
   await page.waitForURL('/inventory.html');
  });

  await test.step('Check that the inventory list is visible', async () => {
   await expect(page.locator(selectors.inventoryPage.productsList)).toBeVisible();
   });

  await test.step('Check that the "Products" title is visible', async () => {
   const productsTitle = page.locator(selectors.inventoryPage.headerTitle);
   await expect(productsTitle).toHaveText('Products');
   });

  await test.step('Check that the cart icon is visible', async () => {
   const cartIcon = page.locator(selectors.inventoryPage.cartIcon);
   await expect(cartIcon).toBeVisible();
   });

  await test.step('Check that there are more than 3 products', async () => {
   const products = page.locator(selectors.inventoryPage.productItem);
   const productCount = await products.count();
   await expect(products).not.toHaveCount(0);
   expect(productCount).toBeGreaterThan(3);
   });

});