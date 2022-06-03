require('dotenv').config()
const loginPage = require('../pages/login.js')
const adminPage = require('../pages/admin.js')
const data = require('../utils/testData.js')
const timeout = process.env.TIME_OUT
jest.retryTimes(process.env.RETRY_TIMES)


describe('admin functionality test', () => {
   // beforeAll(async () => {})
   // afterAll(async () => {await browser.close()})
   // beforeEach(async () => {})
   // afterEach(async () => {await browser.close()})

    it.only('admin can add test settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.setWpSettings()
        await adminPage.setWoocommerceSettings()
        await adminPage.setPaymentSettings()
        await adminPage.setDokanSettings()
    },timeout)

    it('admin can login', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
    },timeout)

    it('admin can logout', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await loginPage.adminLogout()
    },timeout)

    it('admin can add vendor', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addVendor(data.vendorInfo.firstName, data.vendorInfo.lastName, data.vendorInfo.shopName, data.vendorInfo.phone, data.vendorInfo.userEmail
            , data.vendorInfo.userName, data.vendorInfo.password, data.vendorInfo.companyName, data.vendorInfo.companyId, data.vendorInfo.vatNumber, data.vendorInfo.bankName, data.vendorInfo.bankIban,
            data.vendorInfo.street1, data.vendorInfo.street2, data.vendorInfo.city, data.vendorInfo.zipCode, data.vendorInfo.country, data.vendorInfo.state, data.vendorInfo.accountName, data.vendorInfo.accountNumber,
            data.vendorInfo.bankName, data.vendorInfo.bankAddress, data.vendorInfo.routingNumber, data.vendorInfo.swiftCode, data.vendorInfo.iban, data.vendorInfo.userEmail)

    },timeout)

    it('admin can add simple product', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addSimpleProduct(data.product.name.simple, data.product.price, data.product.category, data.product.vendor[1])
    },timeout)

    it.skip('admin can add variable product', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addVariableProduct(data.product.name.variable, data.product.price,  data.product.category, data.product.vendor[1],data.product.category, data.product.attribute, data.product.attributeTerms)
    },timeout)

    it('admin can add simple subscription ', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addSimpleSubscription(data.product.name.simpleSubscription, data.product.price, data.product.category, data.product.vendor[1])
    },timeout)

    it.skip('admin can add variable subscription ', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addVariableSubscription(data.product.name.variableSubscription, data.product.price, data.product.category, data.product.vendor[1],data.product.category, data.product.attribute, data.product.attributeTerms)
    },timeout)

    it('admin can add external product', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addExternalProduct(data.product.name.external, data.product.price, data.product.category, data.product.vendor[1])
    },timeout)

    it('admin can add dokan subscription ', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addDokanSubscription(data.dokanSubscription.dokanSubscription, data.dokanSubscription.price, data.product.category, data.product.vendor[0])
    },timeout)

    it('admin can add auction product', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addAuctionProduct(data.product.name.auction, data.product.price, data.product.category, data.product.vendor[1])
    },timeout)

    it('admin can add booking product', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addBookingProduct(data.product.name.booking, data.product.price, data.product.category, data.product.vendor[1])
    },timeout)

    it('admin can add categories', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addCategory('Shirts')
    },timeout)

    it('admin can add attributes', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addAttributes(data.product.attribute, data.product.attributeTerms)
    },timeout)


    //settings

    //tax settings
    it('admin can set standard tax rate', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        // await adminPage.addStandardTaxRate()
    },timeout)

    //shipping settings
    it('admin can set flat rate shipping', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.addShippingMethod('US', 'country:US', 'flat_rate', 'Flat rate')
    },timeout)

    it('admin can set free shipping', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.addShippingMethod('US', 'country:US', 'free_shipping', 'Free shipping')
    },timeout)

    it('admin can set local pickup shipping', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.addShippingMethod('US', 'country:US', 'local_pickup', 'Local pickup')
    },timeout)

    it('admin can set table rate shipping', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.addShippingMethod('US', 'country:US', 'dokan_table_rate_shipping', 'Vendor Table Rate')
    },timeout)

    it('admin can set distance rate shipping', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.addShippingMethod('US', 'country:US', 'dokan_distance_rate_shipping', 'Vendor Distance Rate')
    },timeout)

    it('admin can set vendor shipping', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.addShippingMethod('US', 'country:US', 'dokan_vendor_shipping', 'Vendor Shipping')
    },timeout)

    //payment
    it('admin can add basic payment methods', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupBasicPaymentMethods()
    },timeout)

    it('admin can add strip payment method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupStripeConnect()
    },timeout)

    it('admin can add paypal marketplace payment method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupPaypalMarketPlace()
    },timeout)

    it('admin can add dokan mangopay payment method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupDokanMangoPay()
    },timeout)

    it('admin can add dokan razorpay payment method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupDokanRazorpay()
    },timeout)

    it('admin can add strip express payment method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupStripeExpress()
    },timeout)


    // dokan settings

    it('admin can set dokan general settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanGeneralSettings()
    },timeout)

    it('admin can set dokan selling settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanSellingSettings()
    },timeout)

    it('admin can set dokan withdraw settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanWithdrawSettings()
    },timeout)

    it('admin can set dokan appearance settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanAppearanceSettings()
    },timeout)

    it('admin can set dokan privacy policy settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanPrivacyPolicySettings()
    },timeout)

    it('admin can set dokan store support settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanStoreSupportSettings()
    },timeout)

    it('admin can set dokan rma settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanRmaSettings()
    },timeout)

    it('admin can set dokan wholesale settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanWholesaleSettings()
    },timeout)

    it('admin can set dokan eu compliance settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanEuComplianceSettings()
    },timeout)

    it('admin can set dokan delivery time settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanDeliveryTimeSettings()
    },timeout)

    it('admin can set dokan product advertising settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanProductAdvertisingSettings()
    },timeout)

    it('admin can set dokan geolocation settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanGeolocationSettings()
    },timeout)

    it('admin can set dokan product report abuse settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanProductReportAbuseSettings()
    },timeout)

    it('admin can set dokan spmv settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanSpmvSettings()
    },timeout)

    it('admin can set dokan vendor subscription settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanVendorSubscriptionSettings()
    },timeout)

    it.skip('admin approve wholesale request', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.adminApproveWholesaleRequest('Tamia')
    },timeout)





})