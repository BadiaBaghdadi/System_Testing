import { Selector } from 'testcafe';

fixture('register')
    .page('https://www.demoblaze.com/index.html'); 

///////////////////////TEST 1//////////////////////
/*
test('User can registers an account using a new email address and password', async t => {
    
    const navsignupButton = Selector('#signin2');
    const usernameInput = Selector('#sign-username');
    const passwordInput = Selector('#sign-password');
    const registerModalButton = Selector('button[onclick="register()"]');

    await t
        .setNativeDialogHandler(() => true)
        .click(navsignupButton)
        .typeText(usernameInput, 'RegisterUser@Test2.com')
        .typeText(passwordInput, 'TestRegister')
        .click(registerModalButton);


    // Verify the alert message popped up with the expected text
    const history = await t.getNativeDialogHistory();
    await t.expect(history[0].text).eql('This user already exist.');
});
*/

///////////////////////TEST 2//////////////////////
/*
test('A user registers again with the same credentials', async t => {
    
    const navsignupButton = Selector('#signin2');
    const usernameInput = Selector('#sign-username');
    const passwordInput = Selector('#sign-password');
    const registerModalButton = Selector('button[onclick="register()"]');

    
    await t
        .setNativeDialogHandler(() => true)
        .click(navsignupButton)
        .typeText(usernameInput, 'RegisterUser@Test2.com')
        .typeText(passwordInput, 'TestRegister')
        .click(registerModalButton);


    // Verify the alert message popped up with the expected text
    const history = await t.getNativeDialogHistory();
    await t.expect(history[0].text).eql('This user already exist.');
});
*/

///////////////////////TEST 3//////////////////////

test('A user cannot register again with the same username but different password', async t => {
    
    const navsignupButton = Selector('#signin2');
    const usernameInput = Selector('#sign-username');
    const passwordInput = Selector('#sign-password');
    const registerModalButton = Selector('button[onclick="register()"]');

    
    await t
        .setNativeDialogHandler(() => true)
        .click(navsignupButton)
        .typeText(usernameInput, 'RegisterUser@Test2.com')
        .typeText(passwordInput, 'TestRegister11')
        .click(registerModalButton);


    // Verify the alert message popped up with the expected text
    const history = await t.getNativeDialogHistory();
    await t.expect(history[0].text).eql('This user already exist.');
});
