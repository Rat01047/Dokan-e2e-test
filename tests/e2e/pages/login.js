const { loginUser } = require("@wordpress/e2e-test-utils")
const base = require("../pages/base.js")
const selector = require("../pages/selectors.js")
const adminPage = require("../pages/admin.js")
const vendorPage = require("../pages/vendor.js")
const customerPage = require("../pages/customer.js")

module.exports = {

    // user login
    async login(username, password) {
        await this.loginFrontend(username, password)
        // await this.loginBackend(username, password)
    },

    //login from frontend
    async loginFrontend(username, password) {
        await base.goto("my-account")
        let emailField = await base.isVisible(page, selector.frontend.username)
        if (emailField) {
            await page.type(selector.frontend.username, username)
            await page.type(selector.frontend.userPassword, password)
            await base.click(selector.frontend.logIn)

            let loggedInUser = await base.getCurrentUser()
            expect(loggedInUser).toBe(username)
        }
    },

    //login user form WP login dashboard
    async loginBackend(username, password) {
        await base.goto("wp-admin")
        let emailField = await base.isVisible(page, selector.backend.email)
        if (emailField) {
            await page.type(selector.backend.email, username)
            await page.type(selector.backend.password, password)
            await base.click(selector.backend.login)

            let loggedInUser = await base.getCurrentUser()
            expect(loggedInUser).toBe(username)
        }
    },

    //customer logout
    async customerLogout() {
        await customerPage.goToMyAccount()
        await base.click(selector.frontend.customerLogout)

        let homeIsVisible = await base.isVisible(page, selector.frontend.home)
        expect(homeIsVisible).toBe(true)
    },

    // vendor logout
    async vendorLogout() {
        await vendorPage.goToVendorDashboard()
        await base.click(selector.frontend.vendorLogout)

        let homeIsVisible = await base.isVisible(page, selector.frontend.home)
        expect(homeIsVisible).toBe(true)
    },

    //admin login
    async adminLogin(username, password) {
        await base.goto("wp-admin")
        let emailField = await base.isVisible(page, selector.backend.email)
        if (emailField) {
            await page.type(selector.backend.email, username)
            await page.type(selector.backend.password, password)
            await base.click(selector.backend.login)

            let loggedInUser = await base.getCurrentUser()
            expect(loggedInUser).toBe(username)
        }
    },

    //admin logout
    async adminLogout() {
        await base.hover(selector.backend.userMenu)
        await base.click(selector.backend.logout)

        let successMessage = await base.getSelectorText(selector.backend.logoutSuccessMessage)
        expect(successMessage).toMatch("You are now logged out.")
    },

    //switcher user
    async switchUser(username, password) {
        let currentUser = await base.getCurrentUser()
        if (currentUser !== username) {
            await loginUser(username, password)
            let loggedInUser = await base.getCurrentUser()
            expect(loggedInUser).toBe(username)
        }
    },


    //test login
    async loginTest() {
        await base.goto('my-account')
        //type email
            await page.waitForSelector(selector.frontend.username)
            await page.type(selector.frontend.username, username)
            await page.type(selector.frontend.userPassword, password)
            await base.click(selector.frontend.logIn)
    }

}