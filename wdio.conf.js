const {
    HEADLESS = true
} = process.env;

export const config = {
    runner: "local",
    specs: ["./src/specs/**/*.test.js"],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': HEADLESS ? {
            args: ['--headless', 'disable-gpu']
        } : {
            args: ['--window-size=1440,900']
        }
    }],
    logLevel: "info",
    bail: 0,
    baseUrl: "https://dev.deel.wtf",
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ["chromedriver"],
    framework: "mocha",
    reporters: [
        "spec",
        ["junit", {
            outputDir: "./output"
        }],
        [
            "allure",
            {
                outputDir: "allure-results",
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: true,
            },
        ],
    ],
    mochaOpts: {
        ui: "bdd",
        timeout: 60000,
    },
    afterTest: function (
        test,
        context, {
            error,
            result,
            duration,
            passed,
            retries
        }
    ) {
        if (!passed) {
            browser.takeScreenshot();
        }
    },
};
