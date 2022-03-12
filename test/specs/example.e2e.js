/*describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`);

        await $('#username').setValue('tomsmith');
        await $('#password').setValue('SuperSecretPassword!');
        await $('button[type="submit"]').click();

        await expect($('#flash')).toBeExisting();
        await expect($('#flash')).toHaveTextContaining(
            'You logged into a secure area!');
    });
});*/

var expect = require('chai').expect

beforeEach(() => {
 driver.launchApp()
})

afterEach(() => {
 driver.closeApp()
})

describe('My Login application', async() => {
    await client.pause(2000);
    const xpath = "//android.widget.EditText[@content-desc=\"email\"]";
    const field = await client.$(xpath);
    const visible = await field.isDisplayed();
    assert(visible);
    const text = await field.getText();
    assert.equal(text, "email");
});
