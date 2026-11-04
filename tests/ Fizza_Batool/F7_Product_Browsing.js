
import { Selector } from 'testcafe';

fixture('T007 - F7 Product Browsing and Pagination')
    .page('https://www.demoblaze.com/');

const productGrid = Selector('#tbodyid');
const products = Selector('#tbodyid .card');
const firstProduct = Selector('#tbodyid .card-title a').nth(0);
const firstPrice = Selector('#tbodyid .card h5').nth(0);
const firstImage = Selector('#tbodyid .card img').nth(0);
const nextButton = Selector('#next2');
const prevButton = Selector('#prev2');

test('TS01 - Product information display', async t => {
    await t.expect(firstProduct.visible).ok({ timeout: 15000 });

    await t.expect(products.count).gt(0);
    await t.expect(firstProduct.innerText).notEql('');
    await t.expect(firstPrice.innerText).contains('$');
    await t.expect(firstImage.visible).ok();

    await t.takeElementScreenshot(
        productGrid, 'F7_TS01_Products.png'
    );
});

test('TS02 - Next page displays different products', async t => {
    await t.expect(firstProduct.visible).ok({ timeout: 15000 });

    const originalProduct = await firstProduct.innerText;

    await t.takeElementScreenshot(
        productGrid, 'F7_TS02_before.png'
    );

    await t.click(nextButton);

    await t.expect(firstProduct.innerText).notEql(originalProduct);
    await t.expect(products.count).gt(0);

    await t.takeElementScreenshot(
        productGrid, 'F7_TS02_after.png'
    );
});

test('TS03 - Previous page navigation', async t => {
    await t.expect(firstProduct.visible).ok({ timeout: 15000 });

    const initialProduct = await firstProduct.innerText;

    await t.takeElementScreenshot(
        productGrid, 'F7_TS03_initial.png'
    );

    await t.click(nextButton);

    await t.expect(firstProduct.innerText).notEql(initialProduct);

    const nextPageProduct = await firstProduct.innerText;

    await t.takeElementScreenshot(
        productGrid, 'F7_TS03_next.png'
    );

    await t.click(prevButton);

    await t.expect(firstProduct.innerText).notEql(nextPageProduct);

    await t.takeElementScreenshot(
        productGrid, 'F7_TS03_previous.png'
    );
});
