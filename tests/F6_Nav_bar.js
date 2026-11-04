import { Selector, ClientFunction } from 'testcafe';

fixture('T006 - F6 Navigation Bar')
    .page('https://www.demoblaze.com/');

// Reusable selectors
const homeLink = Selector('#nava');
const cartLink = Selector('#cartur');
const aboutLink = Selector('a').withText('About us');

const productCards = Selector('#tbodyid .card');
const categories = Selector('#cat');
const aboutModal = Selector('#videoModal');

const getCurrentURL = ClientFunction(() => window.location.href);

// TS01: Navigate from Cart to Home
test('TS01 - Navigate to Homepage', async t => {

    // Navigate to the Cart page first
    await t.click(cartLink);

    await t.expect(getCurrentURL()).contains('cart.html');

    // Click Home in the navigation bar
    await t.click(homeLink);

    // Verify the homepage is displayed
    await t.expect(getCurrentURL()).contains('index.html');

    await t.expect(categories.visible).ok();
    await t.expect(productCards.count).gt(0, {
        timeout: 10000
    });

    // Capture screenshot
    await t.takeScreenshot('F6_TS01_Home.png');

    console.log('TS01: Home navigation verified.');
});

// TS02: Open and close About Us modal
test('TS02 - Open and Close About Us', async t => {

    // Click About Us
    await t.click(aboutLink);

    // Verify the modal opens
    await t.expect(aboutModal.visible).ok();

    // Capture screenshot of open modal
    await t.takeScreenshot('F6_TS02_AboutUs_Open.png');

  // Select the visible Close button in the modal footer
    const closeButton = aboutModal.find('.modal-footer button')
        .withText('Close');

    await t.expect(closeButton.visible).ok();

    await t.click(closeButton);

    // Verify the modal closes
    await t.expect(aboutModal.visible).notOk();

    console.log('TS02: About Us modal opens and closes.');
});

// TS03: Navigate to Cart
test('TS03 - Navigate to Shopping Cart', async t => {

    // Click Cart
    await t.click(cartLink);

    // Verify the Cart URL
    await t.expect(getCurrentURL()).contains('cart.html');

    // Verify Cart page elements
    const placeOrderButton = Selector('button').withText('Place Order');
    const productsHeading = Selector('h2').withText('Products');

    await t.expect(placeOrderButton.visible).ok();
    await t.expect(productsHeading.visible).ok();

    // Capture screenshot
    await t.takeScreenshot('F6_TS03_Cart.png');

    console.log('TS03: Cart navigation verified.');
});