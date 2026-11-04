// Import the Selector utility from TestCafe to locate HTML elements on the page
import { Selector } from 'testcafe';

fixture('cart')
    .page('https://www.demoblaze.com/index.html');

    // Create a global selector for the navigation bar's cart button
    const cartNavButton = Selector('#cartur');
    // Create a global selector for the "Add to cart" button on product pages
    const addToCartButton = Selector('a.btn-success').withText('Add to cart');
    // Create a global selector for the "Place Order" button inside the cart
    const placeOrderButton = Selector('button.btn-success').withText('Place Order');
    // Create a global selector for the checkout/order pop-up modal window
    const orderModal = Selector('#orderModal');
    // Create a global selector for all the product rows listed inside the cart table
    const cartItems = Selector('#tbodyid tr');
    // Create a global selector for the very first product link on the homepage
    const firstProductLink = Selector('.hrefch').nth(0);
    // Create a global selector for the product link found inside the cart table
    const cartProductLink = Selector('#tbodyid tr td a');


test('Login', async t => {
    // Locate the "Log in" button on the navigation bar
    const navLoginButton = Selector('#login2');
    // Locate the username text box inside the login modal
    const usernameInput = Selector('#loginusername');
    // Locate the password text box inside the login modal
    const passwordInput = Selector('#loginpassword');
    // Locate the submit button inside the login modal
    const loginModalButton = Selector('button[onclick="logIn()"]');

    // Execute test actions using TestCafe's test controller (t)
    await t
        // Click the navbar login button to open the modal
        .click(navLoginButton)
        // Type the user's test email into the username field
        .typeText(usernameInput, 'RegisterUser@Test2.com')
        // Type the user's password into the password field
        .typeText(passwordInput, 'TestRegister')
        // Click the login modal button to submit credentials
        .click(loginModalButton);
})

///////////////////////TEST 1//////////////////////
//Test case to verify that an empty cart cannot trigger the order modal
test('Cannot place an order with an empty cart', async t => {
    // Execute test actions using TestCafe's test controller (t)
    await t
        // Click the cart button in the navigation bar
        .click(cartNavButton)
        // Immediately click the "Place Order" button without adding items
        .click(placeOrderButton);
    // Assert that the order modal did NOT open because the cart is empty
    await t.expect(orderModal.visible).notOk('Order modal should not open for an empty cart');
});

///////////////////////TEST 2//////////////////////
//Test case to check if a user can click a product in the cart to view its details page
test('Can visit product page from cart', async t => {
    await t
        .click(cartNavButton)
        .click(cartProductLink);

    await t.expect(addToCartButton.visible).ok('User should be on the product detail page');
});


///////////////////////TEST 3//////////////////////
// Test case to verify that items stay in the cart even after refreshing the browser page
test('Products stay in cart after page refresh', async t => {
    // Execute test actions using TestCafe's test controller (t)
    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test
        .setNativeDialogHandler(() => true)
        // Click the first product on the homepage
        .click(firstProductLink)
        // Click the "Add to cart" button
        .click(addToCartButton)
        // Navigate to the cart page
        .click(cartNavButton)

    // Refreshing the page
    await t
        .eval(() => location.reload());
    // Verify item remains after reload
    await t.expect(cartItems.count).eql(1, 'Product should remain in cart after refresh');
});

///////////////////////TEST 4//////////////////////
// Test case to verify that a user can delete an item from their shopping cart
test('Can delete a product from the cart', async t => {
    // Create a local selector specifically for the "Delete" link next to a cart item
    const deleteButton = Selector('#tbodyid tr td a').withText('Delete');
    // Execute test actions using TestCafe's test controller (t)
    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test
        .setNativeDialogHandler(() => true)
        // Click the first product
        .click(firstProductLink)
        // Click "Add to cart"
        .click(addToCartButton)
        // Go to the cart
        .click(cartNavButton)
        // Check that there is currently 1 item in the cart
        .expect(cartItems.count).eql(1)
        // Click the delete button to remove the item
        .click(deleteButton);

    // Verify product was removed
    await t.expect(cartItems.count).eql(0, 'Cart should be empty after deleting the item');
});

///////////////////////TEST 5//////////////////////
// Test case to verify that adding the exact same product twice increases the cart count
test('Can add multiple of the same product to the cart', async t => {
    // Execute test actions using TestCafe's test controller (t)
    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test
        .setNativeDialogHandler(() => true)
        // Click the first product link
        .click(firstProductLink)
        // Click "Add to cart" the first time
        .click(addToCartButton)
        // Click "Add to cart" a second time
        .click(addToCartButton) 
        // Navigate to the cart page
        .click(cartNavButton);

    // Assert that the cart table now shows 2 separate entries for the product
    await t.expect(cartItems.count).eql(2, 'Cart should contain 2 items');
});
