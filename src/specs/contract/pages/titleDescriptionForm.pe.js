class TitleDescriptionStep {

    get stepRoot() {
        return $('form.title-description-form')
    }

    get contractNameInput() {
        return $('input[name="name"]')
    }

    get scopeOfWorkInput() {
        return $('textarea[name="scope"]');
    }

    get startDatePicker() {
        return $('div[name="effectiveDate"]');
    }

    get calendarRoot() {
        return $('div.react-calendar')
    }

    async datePickerDate(date) {
        return $(`abbr[aria-label="${date}"]`);
    }

    async fillUpTitleDescriptionForm(name, scope, date) {
        await (await this.stepRoot).isDisplayed()
        await (await this.contractNameInput).clearValue();
        await (await this.contractNameInput).setValue(name);

        await (await this.scopeOfWorkInput).clearValue();
        await (await this.scopeOfWorkInput).setValue(scope);

        await (await this.startDatePicker).click();
        await (await this.calendarRoot).waitForDisplayed()
        await (await this.datePickerDate(date)).click();
    }

}

export default new TitleDescriptionStep();