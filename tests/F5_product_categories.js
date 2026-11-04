import { Selector } from 'testcafe';

fixture('T005 - F5 Product Categories')
    .page('https://www.demoblaze.com/');

// Reusable selectors
const categoryLinks = Selector('#itemc');
const productCards = Selector('#tbodyid .card');
const productNames = Selector('#tbodyid .card-title a');

// Helper function to check a category
async function verifyCategory(t, category, expectedProducts, excludedProducts) {

    // Select the category
    await t.click(categoryLinks.withText(category));

    // Wait until the expected products appear
    for (const product of expectedProducts) {
        await t.expect(
            productNames.withText(product).exists
        ).ok(`${product} should appear in ${category}`, { timeout: 10000 });
    }

    // Verify that products are displayed
    await t.expect(productCards.count).gt(0);

    // Verify unrelated products are not displayed
    for (const product of excludedProducts) {
        await t.expect(
            productNames.withText(product).exists
        ).notOk(`${product} should not appear in ${category}`);
    }

    // Capture evidence
    await t.takeScreenshot(`F5_${category}.png`);

    console.log(`${category}: Category filtering verified.`);
}

// TS01: Phones
test('TS01 - Filter products by Phones', async t => {

    await verifyCategory(
        t,
        'Phones',
        ['Samsung galaxy s6', 'Nokia lumia 1520'],
        ['Sony vaio i5', 'Apple monitor 24']
    );
});

// TS02: Laptops
test('TS02 - Filter products by Laptops', async t => {

    await verifyCategory(
        t,
        'Laptops',
        ['Sony vaio i5', 'Sony vaio i7'],
        ['Samsung galaxy s6', 'Apple monitor 24']
    );
});

// TS03: Monitors
test('TS03 - Filter products by Monitors', async t => {

    await verifyCategory(
        t,
        'Monitors',
        ['Apple monitor 24', 'ASUS Full HD'],
        ['Samsung galaxy s6', 'Sony vaio i5']
    );
});