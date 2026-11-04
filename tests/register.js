// Import the Selector utility from TestCafe to locate HTML elements on the page
import { Selector } from 'testcafe';

fixture('register')
    .page('https://www.demoblaze.com/index.html'); 

// Declare a Selector for the main navigation sign-up button using its ID (#signin2)
const navsignupButton = Selector('#signin2');
// Declare a Selector for the sign-up modal username input field using its ID (#sign-username)
const usernameInput = Selector('#sign-username');
// Declare a Selector for the sign-up modal password input field using its ID (#sign-password)
const passwordInput = Selector('#sign-password');
// Declare a Selector for the register submit button inside the modal using its onclick attribute
const registerModalButton = Selector('button[onclick="register()"]');

///////////////////////TEST 1//////////////////////

test('User can registers an account using a new email address and password', async t => {
    // Execute test actions using TestCafe's test controller (t)
    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test
        .setNativeDialogHandler(() => true)
        // Click the navigation sign-up button to open the sign-up modal
        .click(navsignupButton)
        // Type the test email/username into the username input field, which has to be changed every test
        .typeText(usernameInput, 'RegisterUser@Test2.com')
        // Type the password into the password input field
        .typeText(passwordInput, 'TestRegister')
        // Click the register button to submit the form
        .click(registerModalButton);

    // Fetch the recorded browser dialog history
    const history = await t.getNativeDialogHistory();
    // Verify that the alert correctly states the user already exists
    await t.expect(history[0].text).eql('This user already exist.');
});

///////////////////////TEST 2//////////////////////

// Test case checking that attempting to register an already existing user triggers the appropriate error alert
test('A user can not register again with the same credentials', async t => {
    // Execute test actions using TestCafe's test controller (t)
    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test
        .setNativeDialogHandler(() => true)
        // Click the navigation sign-up button to open the sign-up modal
        .click(navsignupButton)
        // Type the test email/username into the username input field
        .typeText(usernameInput, 'RegisterUser@Test2.com')
        // Type the password into the password input field
        .typeText(passwordInput, 'TestRegister')
        // Click the register button to submit the form
        .click(registerModalButton);

    // Verify the alert message popped up with the expected text
    const history = await t.getNativeDialogHistory();
    // Assert that the alert indicates the user already exists
    await t.expect(history[0].text).eql('This user already exist.');
});

///////////////////////TEST 3//////////////////////
// Test case checking that registration fails if the username is the same but the password is changed
test('A user cannot register again with the same username but different password', async t => {
    // Execute test actions using TestCafe's test controller (t)
    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test
        .setNativeDialogHandler(() => true)
        // Click the navigation sign-up button to open the sign-up modal
        .click(navsignupButton)
        // Type the test email/username into the username input field
        .typeText(usernameInput, 'RegisterUser@Test2.com')
        // Type the password into the password input field
        .typeText(passwordInput, 'TestRegister11')
        // Click the register button to submit the form
        .click(registerModalButton);
    
    // Verify the alert message popped up with the expected text
    const history = await t.getNativeDialogHistory();
    // Assert that the alert indicates the user already exists
    await t.expect(history[0].text).eql('This user already exist.');
}); 

///////////////////////TEST 4//////////////////////
// Test case validating that overly short or simple usernames are rejected
test('A user should not be able to register with simple usernames such as "abc"', async t => {
    // Execute test actions using TestCafe's test controller (t)
    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test
        .setNativeDialogHandler(() => true)
        // Click the navigation sign-up button to open the sign-up modal
        .click(navsignupButton)
        // Type the test email/username into the username input field
        .typeText(usernameInput, 'eee')
        // Type the password into the password input field
        .typeText(passwordInput, 'simple')
        // Click the register button to submit the form
        .click(registerModalButton);


    // Verify the alert message popped up with the expected text
    const history = await t.getNativeDialogHistory();
    await t.expect(history[0].text).eql('Username should be longer than 5 characters and unique');
}); 


///////////////////////TEST 6//////////////////////
// Test case verifying that weak or overly simple passwords are rejected by validation
test('A user cannot register with a simple and common password such as 12345', async t => {
    // Execute test actions using TestCafe's test controller (t)
    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test
        .setNativeDialogHandler(() => true)
        // Click the navigation sign-up button to open the sign-up modal
        .click(navsignupButton)
        // Type the test email/username into the username input field
        .typeText(usernameInput, 'RegisterUser12@Test2.com')
        // Type the password into the password input field
        .typeText(passwordInput, '12345')
        // Click the register button to submit the form
        .click(registerModalButton);


    // Verify the alert message popped up with the expected text
    const history = await t.getNativeDialogHistory();
    // Assert that the alert displays the expected password complexity requirement error
    await t.expect(history[0].text).eql('Password should contain at least 8 characters, including numbers, upper and lower case and symbols');
}); 

///////////////////////TEST 5//////////////////////

test('A user cannot register with trailing space', async t => {
    // Execute test actions using TestCafe's test controller (t)
    await t
        // Automatically accept/handle browser alert dialog boxes that pop up during the test
        .setNativeDialogHandler(() => true)
        // Click the navigation sign-up button to open the sign-up modal
        .click(navsignupButton)
        // Type the test email/username into the username input field
        .typeText(usernameInput, 'trailingspace@Test2.com  ')
        // Type the password into the password input field
        .typeText(passwordInput, 'testing')
        // Click the register button to submit the form
        .click(registerModalButton);

    // Retrieve the history of browser alert dialog messages triggered during the test execution
    const history = await t.getNativeDialogHistory();
    // Assert that the first alert message matches the expected error text for an existing user
    await t.expect(history[0].text).eql('Remove any trailing space.');
}); 
