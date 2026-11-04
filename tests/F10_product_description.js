import { Selector } from 'testcafe';

//open demoblaze homepage before each test
fixture('Product Description')
    .page('https://www.demoblaze.com/index.html');

///////////// FUNCTION_10 TEST 1 /////////////

// verify product details displayed
test('User can view product details', async t => {

    //open Samsung galaxy s6 product page
    await t
        .click(Selector('a').withText('Samsung galaxy s6'));
    //locate product title and price
    const productTitle = Selector('.name');
    const productPrice = Selector('.price-container');
    //verify product title and price exist
    await t
        .expect(productTitle.exists).ok()
        .expect(productPrice.exists).ok();
});

///////////// FUNCTION_10 TEST 2 /////////////

// verify navigation between products shows different details
test('User can navigate through products and view correct corresponding details', async t => {

    await t
        .click(Selector('a').withText('Samsung galaxy s6'));

    const firstTitle = await Selector('.name').innerText;

    await t.navigateTo('https://www.demoblaze.com/index.html');
    //open Nokia lumuia 1520 product page
    await t
        .click(Selector('a').withText('Nokia lumia 1520'));

    const secondTitle = await Selector('.name').innerText;

    await t
        .expect(firstTitle)
        .notEql(secondTitle);
});

///////////// FUNCTION_10 TEST 3 /////////////

// User can view product information remains after page refresh
test('User can see product details remain after refreshing page', async t => {

    await t
        .click(Selector('a').withText('Samsung galaxy s6'));
    //reload page
    await t.eval(() => location.reload());

    const productTitle = Selector('.name');
    //product title exists
    await t
        .expect(productTitle.exists)
        .ok();
});
