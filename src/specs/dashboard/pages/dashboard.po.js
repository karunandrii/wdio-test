import Page from "../../../common/pages/base.po";

class DashboardPage extends Page {

    get dashboardHeading () { return $('[data-qa="heading"]') }
    
    open () {
         return super.open('/');
     }

    async getTitle() {
        const title = await (await this.dashboardHeading).getText();
        return title;
    }
}

export default new DashboardPage();