import Page from "../../../common/pages/base.po";
import DashboardPage from "../../dashboard/pages/dashboard.po";

class LoginPage extends Page {
    get inputUsername() {
        return $('input[name="email"]')
    }
    get inputPassword() {
        return $('input[name="password"]')
    }
    get btnSubmit() {
        return $('button[type="submit"]')
    }

    async login(username, password) {
        await (await this.inputUsername).setValue(username);
        await (await this.inputPassword).setValue(password);
        await (await this.btnSubmit).click();
        await (await DashboardPage.dashboardHeading).waitForDisplayed({ timeout: 30000 })
    }

    open() {
        return super.open('/login');
    }
}

export default new LoginPage();