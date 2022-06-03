require('dotenv').config()
const loginPage = require('../pages/login.js')
const customerPage = require('../pages/customer.js')
const data = require('../utils/testData.js')
const timeout = process.env.TIME_OUT
jest.retryTimes(process.env.RETRY_TIMES)

describe('customer functionality test', () => {
    // beforeAll(async () => {
    // await loginPage.customerRegister(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
    // })
    // afterAll(async () => {await browser.close()})
    // beforeEach(async () => {})
    // afterEach(async () => {await browser.close()})


    //////////////////////////// need to review ///////////////////////////////


    it('customer register', async () => {
        await customerPage.customerRegister(data.customerInfo.userEmail, data.customerInfo.password)
        await loginPage.customerLogout()
    }, timeout)


    it('customer login', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        // await loginPage.switchToAdmin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
    }, timeout)


    it('customer logout', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await loginPage.customerLogout()
    }, timeout)


    it.skip('customer become a vendor', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.customerBecomeVendor('vendor101', 'v101', 'v101', 'v101', 'abc street', '123456789', 'abcCompany', '123456789', '123456789', 'abcBank', '1234567890')
        await vendorPage.vendorSetupWizard(20, 'abc street', 'street2', 'New York', '10001', "United States (US)", "New York", "vendor@paypal.com", 'vendorBankAccount', 1234567890, 'abcBank', 'abc bank address', 1234567890, 1234567890, 123456789, 'custom@payment.com')
    }, timeout)


    it.skip('customer become a wholesale customer', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.customerSendWholesaleRequest()
        await loginPage.switchToAdmin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)
        await adminPage.adminApproveWholesaleRequest(process.env.CUSTOMER)
    }, timeout)

    it.skip('customer send return request ', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToMyAccount()
        await customerPage.sendWarrantyRequest('return', 'I would like to return this product')
        await customerPage.deletePaymentMethod()
    }, timeout)

    it.skip('customer ask for get support ', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToMyAccount()
        await customerPage.sendWarrantyRequest('return', 'I would like to return this product')
        await customerPage.deletePaymentMethod()
    }, timeout)

    it.skip('customer add customer details', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToMyAccount()
        await customerPage.addCustomerDetails('customer1', 'c1', 'customer1', 'customer1@gamil.com', process.env.CUSTOMER_PASSWORD, '02dokan02')
    }, timeout)

    it.skip('customer add payment method', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToMyAccount()
        await customerPage.addPaymentMethod(' 4242 4242 4242 4242', '12', '55', '111')
        await customerPage.deletePaymentMethod()
    }, timeout)

    /////////////////////////////////////////////////////////////// reviewed ///////////////////////////////

    it('customer add billing details', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToMyAccount()
        await customerPage.addBillingAddress('customer1', 'c1', 'c1company', 'c1companyID', 'c1vat', 'c1bank', 'c1bankIBAN', 'United States (US)', 'abc street', 'xyz street2', 'New York', 'New York', '10006', '0123456789', 'customer1@gamil.com')
    }, timeout)

    it('customer add shipping details', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToMyAccount()
        await customerPage.addShippingAddress('customer1', 'c1', 'c1company', 'United States (US)', 'abc street', 'xyz street2', 'New York', 'New York', '10006')
    }, timeout)

    it('customer can search product', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToShop()
        await customerPage.searchProduct('Handmade Plastic Table (Simple)')
    }, timeout)

    it.skip('customer can apply coupon', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToShop()
        await customerPage.addProductToCartFromShop('Handmade Plastic Table (Simple)')
        await customerPage.goToCartFromShop()
        await customerPage.applyCoupon('VC_HHYZ')
    }, timeout)

    it.skip('customer can buy product', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToShop()
        await customerPage.addProductToCartFromShop('Handmade Plastic Table (Simple)')
        await customerPage.goToCartFromShop()
        // await customerPage.applyCoupon('VC_ORUGM')
        await customerPage.goToCheckoutFromCart()
        // await customerPage.addBillingAddressInCheckout('customer1', 'c1', 'c1company', 'c1companyID', 'c1vat', 'c1bank', 'c1bankIBAN', 'United States (US)', 'abc street', 'xyz street2', 'New York', 'New York', '10006', '0123456789', 'customer1@gamil.com')
        // await customerPage.addShippingAddressInCheckout('customer1', 'c1', 'c1company', 'United States (US)', 'abc street', 'xyz street2', 'New York', 'New York', '10006')
        await customerPage.placeOrder()
    }, timeout)

})