import { Selector } from 'testcafe';

fixture('Footer')
    .page('https://www.demoblaze.com/index.html');

////// FUNCTION_12 TEST 1 /////////
//verify footer is visbible on homepage
test('Footer visibility', async t => {
    //locate footer
    const footer = Selector('#footc');
    //verify footer exists
    await t
        .scroll(0, 1000)
        .expect(footer.exists)
        .ok();
});

////// FUNCTION_12 TEST 1 /////////
//verify footer content is displayed
test('Footer content', async t => {

    const footer = Selector('#footc');

    await t
        .scroll(0, 1000);
    //verify footer contains text
    await t
        .expect(footer.innerText)
        .notEql('');
});

////// FUNCTION_12 TEST 3 /////////
//verify footer remains across different pages
test('Footer consistency across pages', async t => {

    const footer = Selector('#footc');

    await t
        .scroll(0, 1000)
        .expect(footer.exists)
        .ok();
    //navigate to nokia lumia 1520 page and confirm footer visibility
    await t
        .click(Selector('a').withText('Nokia lumia 1520'))
        .scroll(0, 1000)
        .expect(footer.exists)
        .ok();
    //navigate to cart page and confirm footer visibility
    await t
        .click(Selector('a').withText('Cart'))
        .expect(footer.exists)
        .ok();
});
