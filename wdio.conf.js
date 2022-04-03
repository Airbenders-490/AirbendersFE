exports.config = {
    host: 'localhost',
    port: 4723,
    runner: 'local',
    specs: ['./test/specs/*.js'],
    maxInstances: 1,
    services: [
      [
        'appium',
        {
          args: {
            relaxedSecurity: true,
            address: '0.0.0.0',
            port: 4723,
            commandTimeout: '7200',
            sessionOverride: true,
            debugLogSpacing: true
           },
          command: 'appium'
        }
      ]
    ],
    capabilities: [
      {
        platformName: 'Android',
        platformVersion: '11',
        deviceName: 'emulator-5554',
        app: '/Users/Vithuu/Documents/Concordia/Semester 12 - Fall 2021/SOEN 490/AirbendersFE-4167bfea76e34d68942f39d73375d98e-signed.apk',
        automationName: 'UiAutomator2'
      }
    ],
    logLevel: 'debug',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
      [
        'allure',
        {
          outputDir: 'allure-results',
          disableWebdriverStepsReporting: true,
          disableWebdriverScreenshotsReporting: false
        }
      ]
    ],
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000
    },
    afterTest: function(test, context, { error, result, duration, passed, retries }) {
      if (!passed) {
          browser.takeScreenshot();
      }
    }
   }