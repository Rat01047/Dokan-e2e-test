require('dotenv').config()
const loginPage = require('../pages/login.js')
const vendorPage = require('../pages/vendor.js')
const data = require('../utils/testData.js')
const timeout = process.env.TIME_OUT
jest.retryTimes(process.env.RETRY_TIMES)

describe('vendor functionality test', () => {
   // beforeAll(async () => {})
   // afterAll(async () => {await browser.close())
   // beforeEach(async () => {})
   // afterEach(async () => {await browser.close())


   it('vendor can register', async () => {
      await vendorPage.vendorRegister(data.vendorInfo.userEmail, data.vendorInfo.password, data.vendorInfo.firstName, data.vendorInfo.lastName,
         data.vendorInfo.shopName, data.vendorInfo.companyName, data.vendorInfo.companyId, data.vendorInfo.vatNumber, data.vendorInfo.bankName, data.vendorInfo.bankIban, data.vendorInfo.phone, true, data.vendorSetupWizard)
      await loginPage.vendorLogout()
   }, timeout)

   it('vendor can login', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      // await loginPage.switchToAdmin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
   }, timeout)

   it('vendor can logout', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await loginPage.vendorLogout()
   }, timeout)

   it('vendor can add simple product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.addSimpleProduct(data.product.name.simple, data.product.price, data.product.category)
   }, timeout)

   it('vendor can add variable product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.addVariableProduct(data.product.name.variable, data.product.price, data.product.category, data.product.attribute, data.product.attributeTerms)
   }, timeout)

   it('vendor can add simple subscription product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.addSimpleSubscription(data.product.name.simpleSubscription, data.product.price, data.product.category)
   }, timeout)

   it('vendor can add variable subscription product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.addVariableSubscription(data.product.name.variableSubscription, data.product.price, data.product.category, data.product.attribute, data.product.attributeTerms)
   }, timeout)

   it('vendor can add external product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.addExternalProduct(data.product.name.external, data.product.price, data.product.category)
   }, timeout)

   it('vendor can add auction product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.addAuctionProduct(data.product.name.auction, data.product.auctionPrice, data.product.category,)
   }, timeout)

   it.skip('vendor can add booking product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.addBookingProduct(data.product.name.booking, data.product.price, data.product.category)
   }, timeout)

   it('vendor can add coupon', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.addCoupon(data.coupon.title, data.coupon.amount)
   }, timeout)

   it('vendor can request withdraw', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.requestWithdraw()
   }, timeout)

   it.skip('vendor can cancel request withdraw', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.cancelRequestWithdraw()
   }, timeout)

   it.skip('vendor can add auto withdraw disbursement schedule ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.addAutoWithdrawDisbursementSchedule('dokan_custom', 'weekly', '5', '15')
   }, timeout)

   it.skip('vendor can add default withdraw payment methods ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      // await vendorPage.addDefaultWithdrawPaymentMethods('Skrill')
      await vendorPage.addDefaultWithdrawPaymentMethods('PayPal')
   }, timeout)

   it.skip('vendor can setup default withdraw payment methods ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.setupDefaultWithdrawPaymentMethods('weekly')
   }, timeout)

   // vendor settings

   it.only('vendor can set store settings ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      // await loginPage.switchUser(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
      await vendorPage.setStoreSettings('NYshop', '12', '0123456789', 'abc street', 'xyz street2', 'New York', '1006', 'US', 'NY', 'companyName',
         'companyIdOrEuidNumber', '123456', 'nameOfBank', '123456789XVB', 'New York', '200', '10', 'Get Support',
         '1', '20', '10', '1000000')
   }, timeout)

   it('vendor can add addons', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.addAddon()
   }, timeout)

   it.skip('vendor can edit addon request ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.editAddon('Add-ons Group #370')
   }, timeout)

   it('vendor can send id verification request ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.sendIdVerificationRequest()
   }, timeout)

   it('vendor can send address verification request ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.sendAddressVerificationRequest()
   }, timeout)

   it('vendor can send company verification request ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.sendCompanyVerificationRequest()
   }, timeout)

   it('vendor can set delivery time settings ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.setDeliveryTimeSettings()
   }, timeout)

   it('vendor can set flat rate shipping ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.setShippingSettings('US', 'Flat Rate', 'flat_rate')
   }, timeout)

   it('vendor can set free shipping shipping ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.setShippingSettings('US', 'Free Shipping', 'free_shipping')
   }, timeout)

   it('vendor can set local pickup shipping ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.setShippingSettings('US', 'Local Pickup', 'local_pickup')
   }, timeout)

   it('vendor can set table rate shipping shipping ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.setShippingSettings('US', 'Table Rate', 'dokan_table_rate_shipping')
   }, timeout)

   it('vendor can set dokan distance rate shipping ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.setShippingSettings('US', 'Distance Rate', 'dokan_distance_rate_shipping')
   }, timeout)

   it('vendor can set social profile settings ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.setSocialProfile(data.urls)
   }, timeout)

   it('vendor can set rma settings ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.setRmaSettings('Warranty', 'included_warranty', 'limited', '1', 'weeks')
   }, timeout)


}) 