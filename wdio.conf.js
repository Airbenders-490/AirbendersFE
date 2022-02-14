exports.config = {
    port: 4723,
    path: '/wd/hub',
    runner: 'local',
    specs: [
      './test/specs/**/*.js'
    ],
    capabilities: [{
      platformName: 'Android',
  deviceName: 'emulator-5554',
  browserName: '',
       maxInstances: 1,
       browserName: '',
       appiumVersion: '1.22.2',

       platformVersion: '8',

       app: '/Users/AirbendersFE-18241e7483c640149381f9e177268e5f-signed.apk',
   //    automationName: 'XCUITest'
    }],
    
    logLevel: 'trace',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000
    }
  }