// Import the Selector utility from TestCafe to locate HTML elements on the page
import { Selector } from 'testcafe';

fixture('User Login')
    .page('https://www.demoblaze.com/index.html'); 

    // Create a global selector for the "Log in" button on the navigation bar
    const navLoginButton = Selector('#login2');
    // Create a global selector for the username input field inside the login modal
    const usernameInput = Selector('#loginusername');
    // Create a global selector for the password input field inside the login modal
    const passwordInput = Selector('#loginpassword');
    // Create a global selector for the submit button inside the login modal
    const loginModalButton = Selector('button[onclick="logIn()"]');

///////////////////////TEST 1//////////////////////
// Test case to verify that a returning user can successfully log in with valid credentials
test('A returning user can log in to the website using the registered email address and password via the login page', async t => {

    // 2. Perform actions: Open modal, type credentials, and click login
    await t
        // Click the navigation bar login button to open the login pop-up modal
        .click(navLoginButton)
        // Type the correct test username into the username field
        .typeText(usernameInput, 'SystemTest@Test.com')
        // Type the correct test password into the password field
        .typeText(passwordInput, 'Test')
        // Click the modal's login button to submit the form
        .click(loginModalButton);
});

///////////////////////TEST 2//////////////////////
// Test case to check that an alert appears when logging in with completely wrong credentials
test('User receives an alert when logging in with invalid credentials', async t => {

    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test
        .setNativeDialogHandler(() => true)
        / Click the navigation bar login button to open the modal
        .click(navLoginButton)
        // Type an unregistered/wrong username into the username field
        .typeText(usernameInput, 'WrongUser@Test.com')
        // Type an incorrect password into the password field
        .typeText(passwordInput, 'WrongPassword')
        // Click the login button to submit the form
        .click(loginModalButton);

    // Retrieve the history of browser alert dialog messages triggered during the test execution
    const history = await t.getNativeDialogHistory();
    // Assert that the first alert popup matches the expected error text for a non-existent user
    await t.expect(history[0].text).eql('User does not exist.');
});

///////////////////////TEST 3//////////////////////
// Test case to check that an alert appears when logging in with a correct username but wrong password
test('User receives an alert when logging in with wrong password', async t => {

    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test
        .setNativeDialogHandler(() => true)
        // Click the navigation bar login button to open the modal
        .click(navLoginButton)
        // Type the correct registered username into the username field
        .typeText(usernameInput, 'SystemTest@Test.com')
        // Type an incorrect password into the password field
        .typeText(passwordInput, 'WrongPassword')
        // Click the login button to submit the form
        .click(loginModalButton);

    // Retrieve the history of browser alert dialog messages triggered during the test execution
    const history = await t.getNativeDialogHistory();
    // Assert that the first alert popup matches the expected error text for an incorrect password
    await t.expect(history[0].text).eql('Wrong password.');
});


///////////////////////TEST 4//////////////////////
// Test case to check that an alert appears when logging in with a wrong username
test('User receives an alert when logging in with wrong username', async t => {

    // TestCafe automatically dismisses dialog boxes, but we can set up an expectation for it:
    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test
        .setNativeDialogHandler(() => true)
        // Click the navigation bar login button to open the modal
        .click(navLoginButton)
        // Type an incorrect username into the username field
        .typeText(usernameInput, 'WrongUser@Test.com')
        // Type the correct password into the password field
        .typeText(passwordInput, 'Test')
        // Click the login button to submit the form
        .click(loginModalButton);

    // Retrieve the history of browser alert dialog messages triggered during the test execution
    const history = await t.getNativeDialogHistory();
    // Assert that the first alert popup matches the expected error text for a non-existent user
    await t.expect(history[0].text).eql('User does not exist.');
});

///////////////////////TEST 5//////////////////////
// Test case to verify that submitting an incomplete login form triggers a required-field warning
test('A user can not log in without completing the form', async t => {
    // TestCafe automatically dismisses dialog boxes, but we can set up an expectation for it:
    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test    
        .setNativeDialogHandler(() => true)
        // Click the navigation bar login button to open the modal
        .click(navLoginButton)
        // Type the username into the username field
        .typeText(usernameInput, 'SystemTest@Test.com')
        // Leave the password input field commented out / empty intentionally
        // .typeText(passwordInput, 'WrongPassword')
        // Click the login button to submit the incomplete form
        .click(loginModalButton);

    // Retrieve the history of browser alert dialog messages triggered during the test execution
    const history = await t.getNativeDialogHistory();
    // Assert that the alert popup correctly warns the user to fill out both fields
    await t.expect(history[0].text).eql('Please fill out Username and Password.');
});
