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
 driver.launchApp();
})

afterEach(() => {
 driver.closeApp();
})

describe('My Login application', () => {
    
    it('GIVEN a valid email and password THEN user should be able to login', async() => {
        $(`~email`).waitForDisplayed(20000)
        $(`~email`).setValue('michaelscott@gmail.com')
        $(`~password`).waitForDisplayed(20000)
        $(`~password`).setValue('password')
        $('~login').click()
        browser.pause(10000)
    });
});
