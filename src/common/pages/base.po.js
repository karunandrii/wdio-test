export default class Page {
    open(path) {
        //browser.maximizeWindow();
        return browser.url(`${path}`);
    }

    async waitUntilSpinnerDetached() {
        const spinner = await $('.spinner');
        await spinner.waitForDisplayed({ reverse: true });
    }
}