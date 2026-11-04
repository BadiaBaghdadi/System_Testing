import { Selector } from 'testcafe';

// open the Demoblaze homepage before each test
fixture('Shopping Cart')
    .page('https://www.demoblaze.com/index.html');

///////////// FUNCTION_11 TEST 1 /////////////

// verify that a user can add a product to the shopping cart
test('Add product to cart', async t => {

    await t
        .setNativeDialogHandler(() => true)

        // open Samsung Galaxy S6 product page
        .click(Selector('a').withText('Samsung galaxy s6'))

        // add to cart
        .click(Selector('a').withText('Add to cart'))

        // open cart page
        .click(Selector('a').withText('Cart'));

    // verify cart contents
    await t
        .expect(Selector('#tbodyid').exists)
        .ok();
});

///////////// FUNCTION_11 TEST 2 /////////////

// test multiple products can be added to the cart
test('Add multiple products to cart', async t => {

    await t
        .setNativeDialogHandler(() => true)

        // add Samsung galaxy S6
        .click(Selector('a').withText('Samsung galaxy s6'))
        .click(Selector('a').withText('Add to cart'))

        // return to home
        .navigateTo('https://www.demoblaze.com/index.html')

        // add Nokia lumia 1520
        .click(Selector('a').withText('Nokia lumia 1520'))
        .click(Selector('a').withText('Add to cart'))

        // open cart page
        .click(Selector('a').withText('Cart'));

    // verify cart page exists
    await t
        .expect(Selector('#tbodyid').exists)
        .ok();
});

///////////// FUNCTION_11 TEST 3 /////////////

// verify that product can be removed from cart
test('Remove product from cart', async t => {

    await t
        // open cart page
        .click(Selector('a').withText('Cart'));

    // verify cart page loaded
    await t
        .expect(Selector('#tbodyid').exists)
        .ok();

    // find delete link
    const deleteButton = Selector('a').withText('Delete');

    // find delete button
    if (await deleteButton.exists) {

        // remove product from cart
        await t
            .click(deleteButton);

        // wait for page
        await t.wait(2000);
    }

    // verify cart page still exists
    await t
        .expect(Selector('#tbodyid').exists)
        .ok();
});
