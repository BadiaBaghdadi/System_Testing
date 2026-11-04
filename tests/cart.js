import { Selector } from 'testcafe';

fixture('cart')
    .page('https://www.demoblaze.com/index.html');

const cartNavButton = Selector('#cartur');
const addToCartButton = Selector('a.btn-success').withText('Add to cart');
const placeOrderButton = Selector('button.btn-success').withText('Place Order');
const orderModal = Selector('#orderModal');
const cartItems = Selector('#tbodyid tr');
const firstProductLink = Selector('.hrefch').nth(0);
const cartProductLink = Selector('#tbodyid tr td a');


test('Login', async t => {
    const navLoginButton = Selector('#login2');
    const usernameInput = Selector('#loginusername');
    const passwordInput = Selector('#loginpassword');
    const loginModalButton = Selector('button[onclick="logIn()"]');

    await t
        .click(navLoginButton)
        .typeText(usernameInput, 'RegisterUser@Test2.com')
        .typeText(passwordInput, 'TestRegister')
        .click(loginModalButton);
})

///////////////////////TEST 1//////////////////////

/*
test('Cannot place an order with an empty cart', async t => {
    await t
        .click(cartNavButton)
        .click(placeOrderButton);

    await t.expect(orderModal.visible).notOk('Order modal should not open for an empty cart');
});

*/

///////////////////////TEST 2//////////////////////


/*
test('Can visit product page from cart', async t => {
    await t
        .click(cartNavButton)
        .click(cartProductLink);

    await t.expect(addToCartButton.visible).ok('User should be on the product detail page');
});


///////////////////////TEST 3//////////////////////
test('Products stay in cart after page refresh', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click(firstProductLink)
        .click(addToCartButton)
        .click(cartNavButton)

    // Refreshing the page
    await t
        .eval(() => location.reload());

    // Verify item remains after reload
    await t.expect(cartItems.count).eql(1, 'Product should remain in cart after refresh');
});
*/
///////////////////////TEST 4//////////////////////

test('Can delete a product from the cart', async t => {
    const deleteButton = Selector('#tbodyid tr td a').withText('Delete');

    await t
        .setNativeDialogHandler(() => true)
        .click(firstProductLink)
        .click(addToCartButton)
        .click(cartNavButton)
        .expect(cartItems.count).eql(1)
        .click(deleteButton);

    // Verify product was removed
    await t.expect(cartItems.count).eql(0, 'Cart should be empty after deleting the item');
});
