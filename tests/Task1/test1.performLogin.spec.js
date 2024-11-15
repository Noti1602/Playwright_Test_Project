const { test, expect } = require('@playwright/test');
const selectors = require('../../page-objects/selectors');
const users = require('../../page-objects/users');

test('Verify login functionality and UI elements on the home page', async ({ page }) => {
  // Navigate to the Sauce Demo login page
  await page.goto('/');

  // Enter the username and password, click the login button and wait for the page to navigate to the inventory page to confirm login
  await page.fill(selectors.loginPage.usernameField, users.standardUser.username);
  await page.fill(selectors.loginPage.passwordField, users.standardUser.password);
  await page.click(selectors.loginPage.loginButton);
  await page.waitForURL('/inventory.html');

  // Check that the inventory list is visible
  await expect(page.locator(selectors.inventoryPage.productsList)).toBeVisible();

  // Check that the "Products" title is visible
  const productsTitle = page.locator(selectors.inventoryPage.headerTitle);
  await expect(productsTitle).toHaveText('Products');

  // Check that the cart icon is visible
  const cartIcon = page.locator(selectors.inventoryPage.cartIcon);
  await expect(cartIcon).toBeVisible();

  // Check that there are more than 3 products
  const products = page.locator(selectors.inventoryPage.productItem);
  const productCount = await products.count();
  expect(productCount).toBeGreaterThan(3);

});