import { Selector } from 'testcafe';

fixture('User Login')
    .page('https://www.demoblaze.com/index.html#'); // Replace with your target URL

test('A returning user can log in to the website using the registered email address and password via the login page', async t => {
    // 1. Locate elements using Selectors (by ID, class, placeholder, etc.)
    const usernameInput = Selector('usernameInout'); // Update with your actual selector
    const passwordInput = Selector('passwordInput');
    const loginButton = Selector('button[type="Log in"]');


    // 2. Perform actions
    await t
        .typeText(usernameInput, 'SystemTest@Test.com')
        .typeText(passwordInput, 'Test')
        .click(loginButton);

});