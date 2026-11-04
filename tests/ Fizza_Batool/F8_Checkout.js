
import { Selector } from 'testcafe';

fixture('T008 - F8 Checkout and Order Placement')
    .page('https://www.demoblaze.com/');

const firstProduct = Selector('#tbodyid .card-title a').nth(0);
const addToCart = Selector('a.btn-success').withText('Add to cart');
const cartProducts = Selector('#tbodyid tr');
const placeOrder = Selector('button').withText('Place Order');
const orderModal = Selector('#orderModal');
const purchaseButton = Selector('#orderModal button').withText('Purchase');
const closeButton = Selector('#orderModal button').withText('Close');

async function prepareCart(t) {
    await t.setNativeDialogHandler(() => true);

    await t.expect(firstProduct.visible).ok({ timeout: 15000 });
    await t.click(firstProduct);

    await t.expect(addToCart.visible).ok();
    await t.click(addToCart);

    await t.navigateTo('https://www.demoblaze.com/cart.html');
    await t.expect(cartProducts.count).gt(0, { timeout: 15000 });
}

test('TS01 - Successful order placement', async t => {
    await prepareCart(t);

    await t.click(placeOrder);
    await t.expect(orderModal.visible).ok();

    await t.typeText('#name', 'Test User');
    await t.typeText('#country', 'Australia');
    await t.typeText('#city', 'Sydney');
    await t.typeText('#card', '4111111111111111');
    await t.typeText('#month', '11');
    await t.typeText('#year', '2026');

    await t.takeScreenshot('F8_TS01_before.png');

    await t.click(purchaseButton);

    await t.expect(
        Selector('.sweet-alert h2').innerText
    ).contains('Thank you for your purchase');

    await t.takeScreenshot('F8_TS01_after.png');
});

test('TS02 - Checkout with empty required fields', async t => {
    await prepareCart(t);

    await t.click(placeOrder);
    await t.expect(orderModal.visible).ok();

    await t.takeScreenshot('F8_TS02_before.png');

    await t.click(purchaseButton);

    const alerts = await t.getNativeDialogHistory();

    await t.expect(
        alerts.some(dialog =>
            dialog.text.includes('Please fill out Name and Creditcard')
        )
    ).ok();

    await t.expect(orderModal.visible).ok();
    await t.takeScreenshot('F8_TS02_after.png');
});

test('TS03 - Cancel checkout', async t => {
    await prepareCart(t);

    await t.click(placeOrder);
    await t.expect(orderModal.visible).ok();

    await t.takeScreenshot('F8_TS03_before.png');

    await t.click(closeButton);

    await t.expect(orderModal.visible).notOk();
    await t.expect(cartProducts.count).gt(0);

    await t.takeScreenshot('F8_TS03_after.png');
});
