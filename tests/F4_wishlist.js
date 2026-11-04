import { Selector } from 'testcafe';

// F4 - Wishlist System Testing
fixture('F4 - Wishlist')
    .page('http://opencart.abstracta.us/index.php?route=common/home');

// Preliminary test
test('Verify OpenCart homepage loads', async t => {

    const logo = Selector('#logo');

    await t.expect(logo.exists).ok();
    await t.expect(logo.visible).ok();

});