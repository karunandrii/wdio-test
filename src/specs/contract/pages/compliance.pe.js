class ComplianceStep {

    get stepRoot() {
        return $('[data-qa="contract-compliance-card"]')
    }

    get countryInput() {
        return $('[data-qa="contractor-tax-residence"]').then(it => it.$('input'))
    }

    get stateInput() {
        return $('[data-qa="contractor-tax-residence-province"]').then(it => it.$('input'))
    }

    async stepIsDisplayed() {
        await (await this.stepRoot).isDisplayed();
    }

    async selectContractorTaxResidence(country, state) {
        await (await this.countryInput).clearValue();
        await (await this.countryInput).setValue(country);
        await browser.keys("\uE007");

        await (await this.stateInput).clearValue();
        await (await this.stateInput).setValue(state);
        await browser.keys("\uE007");
    }

}

export default new ComplianceStep();