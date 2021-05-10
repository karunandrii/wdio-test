import Page  from "../../../common/pages/base.po";
import { assert } from "chai";

class ContractsPage extends Page {

    async open() {
        super.open('/contracts');
    }

    async waitForNavigation() {
        await browser.waitUntil(async () => {
            return browser.getUrl().then((url) => {
              return url.indexOf('/contracts') > -1
            });
          }, 10000)
    }
}

export default new ContractsPage();