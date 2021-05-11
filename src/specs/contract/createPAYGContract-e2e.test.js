import LoginPage from "../login/pages/login.po";
import { getDateMinusOne, getRandomName } from "../../helpers/common.helper";
import CreateContractPage from "./pages/createContract.po";
import ContractsPage from "./pages/contracts.po";

const faker = require('faker')
const user = require('../../../config/credentials.json');
const paygContractName = getRandomName("Pay as You Go Contract", 3);
const specialClause = faker.lorem.paragraph(5);

describe("Create a @contract test suite", async () => {
	beforeEach(async () => {
        await LoginPage.open();
        await browser.deleteCookies();
		await LoginPage.login(user.Login, user.Password);
	});

    // delete after

    it('user can create a "Pay As You Go" contract', async () => {
        //just to show parallel
		await CreateContractPage.open();
        await CreateContractPage.selectContractType('Pay As You Go');
        await CreateContractPage.GeneralInfo.fillUpTitleDescriptionForm(paygContractName, 'scope', getDateMinusOne());
        await CreateContractPage.proceedToNextStep();

        await CreateContractPage.PaymentDetails.stepIsDisplayed();
        await CreateContractPage.PaymentDetails.fillHowMuch('1000');
        await CreateContractPage.PaymentDetails.setCurrency('GBP - British Pound');
        await CreateContractPage.PaymentDetails.setRateFrequency('Weekly');
        await CreateContractPage.proceedToNextStep();
        await CreateContractPage.waitUntilSpinnerDetached();

        await CreateContractPage.DefineDates.stepIsDisplayed();
        await browser.pause(5000);
        await CreateContractPage.proceedToNextStep();

        await CreateContractPage.Extras.fillUpSpecialClause(specialClause);
        await CreateContractPage.Extras.proceedToFinalStep();

        await CreateContractPage.Compliance.stepIsDisplayed();
        await CreateContractPage.Compliance.selectContractorTaxResidence('United States', 'Colorado')
        await CreateContractPage.createContract();
        await CreateContractPage.waitUntilSpinnerDetached();
	});
});
