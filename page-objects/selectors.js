// selectors.js

module.exports = {
    loginPage: {
      usernameField: '#user-name',
      passwordField: '#password',
      loginButton: '#login-button',
    },
  
    inventoryPage: {
      headerTitle: '.title',  
      cartIcon: '.shopping_cart_link',
      cartBadge: '.shopping_cart_badge',
      productsList: '.inventory_list',
      productItem: '.inventory_item',
      productName: '.inventory_item_name',
      productPrice: '.inventory_item_price',
      addToCartButton: '#add-to-cart-sauce-labs-backpack',
    },
  
    cartPage: {
      checkoutButton: '#checkout',
      continueShoppingButton: '#continue-shopping',
      removeButton: '#remove-sauce-labs-backpack',
      cartItem: '.cart_item',
      cartItemName: '.cart_item .inventory_item_name',
      cartItemPrice: '.cart_item .inventory_item_price',
    },
  
  };
  