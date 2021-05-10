import { expect } from "chai";

class DefineContractDatesStep {

    get stepRoot() {
        return $('[data-qa=" define-dates-of-contract"]')
    }

    get fullAmountInfoLct() {
        return $('[data-qa="full-amount"]')
    }

    async stepIsDisplayed() {
        await (await this.stepRoot).isDisplayed();
    }

    async verifyFullAmountIsEqual(value) {
        await (await this.fullAmountInfoLct).waitForDisplayed()
        const actual = await(await this.fullAmountInfoLct).getText();
        expect(actual).to.equal(value);
    }

}

export default new DefineContractDatesStep();