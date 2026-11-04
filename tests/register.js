import { Selector } from 'testcafe';

fixture('register')
    .page('https://www.demoblaze.com/index.html'); 

///////////////////////TEST 1//////////////////////

test('A user can register an account using a new email address', async t => {
    // 1. Locate elements (including the navbar login button to open the modal)
    const navsignupButton = Selector('#signin2');
    const usernameInput = Selector('#sign-username');
    const passwordInput = Selector('#sign-password');
    const registerModalButton = Selector('button[onclick="register()"]');

    // 2. Perform actions: Open modal, type credentials, and click login
    await t
        .click(navsignupButton)
        .typeText(usernameInput, 'RegisterUser@Test.com')
        .typeText(passwordInput, 'Test')
        .click(registerModalButton);
});
