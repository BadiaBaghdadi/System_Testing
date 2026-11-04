import { Selector } from 'testcafe';

fixture('User Login')
    .page('https://www.demoblaze.com/index.html'); 

test('A returning user can log in to the website using the registered email address and password via the login page', async t => {
    // 1. Locate elements (including the navbar login button to open the modal)
    const navLoginButton = Selector('#login2');
    const usernameInput = Selector('#loginusername');
    const passwordInput = Selector('#loginpassword');
    const loginModalButton = Selector('button[onclick="logIn()"]');

    // 2. Perform actions: Open modal, type credentials, and click login
    await t
        .click(navLoginButton)
        .typeText(usernameInput, 'SystemTest@Test.com')
        .typeText(passwordInput, 'Test')
        .click(loginModalButton);
});