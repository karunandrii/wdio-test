import Page from "../../../common/pages/base.po";
import TitleDescriptionStep from "./titleDescriptionForm.pe";
import DefineRateStep from "./defineTheRate.pe";
import DefineContractDatesStep from "./defineDatesOfContract.pe";
import ExtrasStep from "./extras.pe";
import ComplianceStep from "./compliance.pe";

class CreateContractPage extends Page {

    constructor() {
        super()
        this.GeneralInfo = TitleDescriptionStep;
        this.PaymentDetails = DefineRateStep;
        this.DefineDates = DefineContractDatesStep;
        this.Extras = ExtrasStep;
        this.Compliance = ComplianceStep;
    }

    get stepHeader() {
        return $('h2')
    }

    get nextButton() {
        return $('button[type="submit"]:not([disabled])')
    }

    get createContractBtn() {
        return $('button.w-100');
    }



    open() {
        super.open('/create');
    }

    async contractTypeSelector(type) {
        return $(`//div[contains(@class, "contract-selector")]/h4[text()="${type}"]`);
    }

    async selectContractType(type) {
        await (await this.contractTypeSelector(type)).click();
    }

    async proceedToNextStep() {
        await (await this.nextButton).waitForClickable();
        await (await this.nextButton).click();
    }

    async createContract() {
        await (await this.createContractBtn).click();
        await super.waitUntilSpinnerDetached();
    }
}

export default new CreateContractPage();