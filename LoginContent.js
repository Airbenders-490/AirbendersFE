//import testEnvironment from '../../testEnvironment'
//import { By2 } from 'selenium-appium'

const assert = require('assert');
const webdriver = require('selenium-webdriver');

var desiredCaps = {
  platformName: 'Android',
  deviceName: 'emulator-5554',
  app: 'AirbendersFE-18241e7483c640149381f9e177268e5f-signed.apk',
  browserName: '',

};

/*beforeAll(() => {
 // return testEnvironment.setup();;
})

afterAll(() => {
 // return testEnvironment.teardown();
})*/

async function test() {
  // //Initiating the Driver
  let driver = await new webdriver.Builder().usingServer("http://localhost:4723/wd/hub").withCapabilities(desiredCaps).build();
 //  expect(await driver.hasElementByAccessibilityId('email')).toBe(true);

  //  expect(await driver.hasElementByAccessibilityId('password')).toBe(true);
};

test()

