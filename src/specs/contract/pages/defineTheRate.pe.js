import { expect } from "chai";

class DefineRateStep {
    get stepRoot() {
        return $('[data-qa="define-the-rate"]')
    }

    get howMuchInput() {
        return $('input[name="rate"]')
    }

    get currencyDDContainer() {
        return $('[data-qa="currency-select"]');
    }

    get currencyDDValue() {
        return this.currencyDDContainer.then(it => it.$('div.select__single-value'))
    }

    get currencyDDInput() {
        return this.currencyDDContainer.then(it => it.$('input'))
    }

    get cycleDDContainer() {
        return $('[data-qa="cycle-select"]');
    }

    get cycleDDValue() {
        return this.cycleDDContainer.then(it => it.$('div.select__single-value'))
    }

    get cycleDDInput() {
        return this.cycleDDContainer.then(it => it.$('input'))
    }

    async stepIsDisplayed() {
        await (await this.stepRoot).isDisplayed();
    }

    async fillHowMuch(value) {
        await (await this.howMuchInput).clearValue();
        await (await this.howMuchInput).setValue(value);
    }

    async verifyTextInDropdown(lct, value) {
        const actual = await (await lct).getText();
        expect(actual).to.equal(value);
    }

    async setCurrency(value) {
        await (await this.currencyDDInput).clearValue();
        await (await this.currencyDDInput).setValue(value);
        await browser.keys("\uE007");
        await this.verifyTextInDropdown(this.currencyDDValue, value);
    }

    async setRateFrequency(value) {
        await (await this.cycleDDInput).clearValue();
        await (await this.cycleDDInput).setValue(value);
        await browser.keys("\uE007");
        await this.verifyTextInDropdown(this.cycleDDValue, value);
    }

}

export default new DefineRateStep();