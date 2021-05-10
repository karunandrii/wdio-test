class ExtrasStep {

    get specialClauseBtn() {
        return $('[data-qa="special-clause-card"] button')
    }

    get specialClauseTextarea() {
        return $('[data-qa="special-clause-card"] textarea')
    }

    async fillUpSpecialClause(value) {
        await (await this.specialClauseBtn).scrollIntoView();
        await (await this.specialClauseBtn).click();
        await (await this.specialClauseTextarea).waitForDisplayed();
        await (await this.specialClauseTextarea).clearValue();
        await (await this.specialClauseTextarea).setValue(value);
    }

    async proceedToFinalStep() {
        await (await $('//button/div[text()=" next"]')).click()
    }

}

export default new ExtrasStep();