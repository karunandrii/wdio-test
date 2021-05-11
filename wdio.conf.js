const {
    HEADLESS
} = process.env;

let chromeOptions;
if (HEADLESS === 'false') {
    chromeOptions = { args: ['--window-size=1440,900'] };
} else {
    chromeOptions = { args: ['--headless', 'disable-gpu'] };
}

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
        'goog:chromeOptions': chromeOptions
    }],
    logLevel: "error",
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
