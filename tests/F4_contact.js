import { Selector, ClientFunction } from 'testcafe';

fixture('T004 - F4 Contact Form')
    .page('https://www.demoblaze.com/');

// Reusable selectors
const contactLink = Selector('a').withText('Contact');
const contactModal = Selector('#exampleModal');
const emailField = Selector('#recipient-email');
const nameField = Selector('#recipient-name');
const messageField = Selector('#message-text');
const sendButton = contactModal.find('button').withText('Send message');

// Display the recorded alert message as a screenshot overlay.
// This is test-generated evidence, not the original browser popup.
const showAlertEvidence = ClientFunction((message, scenario) => {
    const existing = document.querySelector('#test-alert-evidence');
    if (existing) existing.remove();

    const panel = document.createElement('div');
    panel.id = 'test-alert-evidence';

    panel.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        width: 420px;
        max-width: 90%;
        padding: 25px;
        background: white;
        border: 3px solid #333;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 999999;
        font-family: Arial, sans-serif;
        text-align: center;
        color: black;
    `;

    const heading = document.createElement('h3');
    heading.textContent = 'Captured JavaScript Alert';

    const scenarioLabel = document.createElement('p');
    scenarioLabel.textContent = scenario;

    const alertMessage = document.createElement('p');
    alertMessage.textContent = message || 'No alert displayed';
    alertMessage.style.fontWeight = 'bold';

    panel.appendChild(heading);
    panel.appendChild(scenarioLabel);
    panel.appendChild(alertMessage);

    document.body.appendChild(panel);
});

// Helper function to submit the form and capture evidence
async function submitContactForm(t, scenario, email, name, message) {

    // Accept native browser alerts automatically
    await t.setNativeDialogHandler(() => true);

    // Open Contact modal
    await t.click(contactLink);
    await t.expect(contactModal.visible).ok();

    // Enter the provided test data
    if (email) {
        await t.typeText(emailField, email);
    }

    if (name) {
        await t.typeText(nameField, name);
    }

    if (message) {
        await t.typeText(messageField, message);
    }

    // Screenshot 1: Form before submission
    await t.takeScreenshot(`F4_${scenario}_Before.png`);

    // Submit the form
    await t.click(sendButton);

    // Retrieve the native browser alert recorded by TestCafe
    const dialogs = await t.getNativeDialogHistory();
    const alerts = dialogs.filter(dialog => dialog.type === 'alert');

    const alertText = alerts.length > 0
        ? alerts[alerts.length - 1].text
        : '';

    // Print the actual alert message in the terminal
    console.log(`${scenario} - Alert: ${alertText || 'No alert displayed'}`);

    // Display the recorded alert text on the page
    await showAlertEvidence(alertText, scenario);

    // Screenshot 2: Captured alert evidence
    await t.takeScreenshot(`F4_${scenario}_AlertEvidence.png`);

    return alertText;
}

// TS01: Submit valid contact details
test('TS01 - Submit valid contact details', async t => {

    const alertText = await submitContactForm(
        t,
        'TS01_Valid',
        'testuser@example.com',
        'Test User',
        'This is a test message.'
    );

    // Expected: Valid details should be accepted
    await t.expect(alertText).contains(
        'Thanks for the message',
        'Valid contact details should be accepted'
    );
});

// TS02: Submit empty contact fields
test('TS02 - Submit empty contact fields', async t => {

    const alertText = await submitContactForm(
        t,
        'TS02_Empty',
        '',
        '',
        ''
    );

    // Expected: Empty fields should be rejected
    await t.expect(alertText.includes('Thanks for the message'))
        .notOk('Empty contact form was accepted without validation');
});

// TS03: Submit invalid email address
test('TS03 - Submit invalid email address', async t => {

    const alertText = await submitContactForm(
        t,
        'TS03_InvalidEmail',
        'invalidemail',
        'Test User',
        'Testing invalid email.'
    );

    // Expected: Invalid email format should be rejected
    await t.expect(alertText.includes('Thanks for the message'))
        .notOk('Invalid email address was accepted without validation');
});messageField