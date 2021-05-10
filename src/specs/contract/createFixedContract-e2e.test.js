import LoginPage from "../login/pages/login.po";
import { getAllContracts } from "../../helpers/contract.helper";
import { getDateMinusOne, getRandomName } from "../../helpers/common.helper";
import CreateContractPage from "./pages/createContract.po";
import { expect } from "chai";

const faker = require('faker')
const user = require('../../../config/credentials.json');
const fixedContractName = getRandomName("Test Fixed Rate Contract", 3);
const specialClause = faker.lorem.paragraph(5);
const expectedContract = {
    currency: 'GBP',
    cycleScale: 'weekly',
    rate: 1000
}

describe("Create a @contract test suite", async () => {
	before(async () => {
		await LoginPage.open();
		await LoginPage.login(user.Login, user.Password);
	});

    // delete after

	it('user can create a "Fixed Rate" contract', async () => {
		await CreateContractPage.open();
        await CreateContractPage.selectContractType('Fixed Rate');
        await CreateContractPage.GeneralInfo.fillUpTitleDescriptionForm(fixedContractName, 'scope', getDateMinusOne());
        await CreateContractPage.proceedToNextStep();

        await CreateContractPage.PaymentDetails.stepIsDisplayed();
        await CreateContractPage.PaymentDetails.fillHowMuch('1000');
        await CreateContractPage.PaymentDetails.setCurrency('GBP - British Pound');
        await CreateContractPage.PaymentDetails.setRateFrequency('Week');
        await CreateContractPage.proceedToNextStep();

        await CreateContractPage.DefineDates.stepIsDisplayed();
        await CreateContractPage.DefineDates.verifyFullAmountIsEqual('£1,000');
        await CreateContractPage.proceedToNextStep();

        await CreateContractPage.Extras.fillUpSpecialClause(specialClause);
        await CreateContractPage.Extras.proceedToFinalStep();

        await CreateContractPage.Compliance.stepIsDisplayed();
        await CreateContractPage.Compliance.selectContractorTaxResidence('United States', 'Colorado')
        await CreateContractPage.createContract();
        await CreateContractPage.waitUntilSpinnerDetached();

        // decided to check via API, but can be done as well via UI on /contracts page

		const actualLn = await getAllContracts();
        const currentContract = actualLn.contracts.find(it => it.name === fixedContractName);
        contractID = currentContract.id;

        expect(currentContract.currency).to.equal(expectedContract.currency);
        expect(currentContract.rate).to.equal(expectedContract.rate);
        expect(currentContract.cycleScale).to.equal(expectedContract.cycleScale);
	});
});
