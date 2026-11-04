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
        .typeText(usernameInput, 'SystemTest@Test.com')
        .typeText(passwordInput, 'Test')
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

test('Adding product to cart', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click(firstProductLink)
        .click(addToCartButton)

});

test('Can visit product page from cart', async t => {
    await t
        .click(cartNavButton)
        .click(cartProductLink);

    await t.expect(addToCartButton.visible).ok('User should be on the product detail page');
});