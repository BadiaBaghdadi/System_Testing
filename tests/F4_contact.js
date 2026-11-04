import { Selector } from 'testcafe';

fixture('T004 - F4 Contact Form')
    .page('https://www.demoblaze.com/');

const contactLink = Selector('a').withText('Contact');
const contactModal = Selector('#exampleModal');
const emailField = Selector('#recipient-email');
const nameField = Selector('#recipient-name');
const messageField = Selector('#message-text');
const sendButton = contactModal.find('button').withText('Send message');

// TS01: Valid contact details
test('TS01 - Submit valid contact details', async t => {

    await t.setNativeDialogHandler(() => true);
    await t.click(contactLink);

    await t.expect(contactModal.visible).ok();

    await t
        .typeText(emailField, 'testuser@example.com')
        .typeText(nameField, 'Test User')
        .typeText(messageField, 'This is a test message.');

    await t.takeScreenshot('F4_TS01_before.png');

    await t.click(sendButton);

    const dialogs = await t.getNativeDialogHistory();
    const alerts = dialogs.filter(d => d.type === 'alert');

    await t.expect(alerts.length).gt(0);
    await t.expect(alerts[0].text).contains('Thanks for the message');

    console.log('TS01 alert:', alerts[0].text);
});

// TS02: Empty contact fields
test('TS02 - Submit empty contact fields', async t => {

    await t.setNativeDialogHandler(() => true);
    await t.click(contactLink);

    await t.expect(contactModal.visible).ok();

    await t.takeScreenshot('F4_TS02_before.png');

    await t.click(sendButton);

    const dialogs = await t.getNativeDialogHistory();
    const alerts = dialogs.filter(d => d.type === 'alert');

    console.log('TS02 alerts:', alerts.map(d => d.text));

    // Expected: Empty fields should not be accepted
    await t.expect(alerts.some(
        d => d.text.includes('Thanks for the message')
    )).notOk('Empty form was accepted without validation');
});

// TS03: Invalid email address
test('TS03 - Submit invalid email address', async t => {

    await t.setNativeDialogHandler(() => true);
    await t.click(contactLink);

    await t.expect(contactModal.visible).ok();

    await t
        .typeText(emailField, 'invalidemail')
        .typeText(nameField, 'Test User')
        .typeText(messageField, 'Testing invalid email.');

    await t.takeScreenshot('F4_TS03_before.png');

    await t.click(sendButton);

    const dialogs = await t.getNativeDialogHistory();
    const alerts = dialogs.filter(d => d.type === 'alert');

    console.log('TS03 alerts:', alerts.map(d => d.text));

    // Expected: Invalid email should not be accepted
    await t.expect(alerts.some(
        d => d.text.includes('Thanks for the message')
    )).notOk('Invalid email was accepted without validation');
});