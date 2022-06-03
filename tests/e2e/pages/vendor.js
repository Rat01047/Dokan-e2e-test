const { createURL } = require("@wordpress/e2e-test-utils")
const base = require("../pages/base.js")
const selector = require("../pages/selectors.js")
const helper = require("../../e2e/utils/helpers.js")




module.exports = {



    // methods



    //-------------------------------------------------- navigation ---------------------------------------------------//



    async goToVendorDashboard() {
        await page.goto(createURL('dashboard'))

        const url = await page.url()
        expect(url).toMatch('dashboard')
    },

    //-------------------------------------------------- setup wizard ---------------------------------------------------//

    //vendor registration
    async vendorRegister(userEmail, password, firstName, lastName, shopName, companyName, companyId, vatNumber, bankName, bankIban, phone, withSetupWizard, setupWizardData) {
        await base.goto("my-account")
        await page.type(selector.vendor.vRegistration.regEmail, userEmail)
        await page.type(selector.vendor.vRegistration.regPassword, password)
        await base.clickXpath(selector.vendor.vRegistration.regVendor)
        await page.type(selector.vendor.vRegistration.firstName, firstName)
        await page.type(selector.vendor.vRegistration.lastName, lastName)
        await page.type(selector.vendor.vRegistration.shopName, shopName)
        // await page.type(selector.vendor.shopUrl, shopUrl)
        await page.click(selector.vendor.vRegistration.shopUrl)
        await page.type(selector.vendor.vRegistration.companyName, companyName)
        await page.type(selector.vendor.vRegistration.companyId, companyId)
        await page.type(selector.vendor.vRegistration.vatNumber, vatNumber)
        await page.type(selector.vendor.vRegistration.bankName, bankName)
        await page.type(selector.vendor.vRegistration.bankIban, bankIban)
        await page.type(selector.vendor.vRegistration.phone, phone)
        // let subscriptionPackIsVisible = await base.isVisible(page, selector.vendor.vWithdraw.cancelRequest) 
        // if(subscriptionPackIsVisible){
        // await page.select(selector.vendor.vRegistration.subscriptionPack, "") //TODO:select subscription pack
        // }
        await base.click(selector.vendor.vRegistration.register)

        if (withSetupWizard) {
            await this.vendorSetupWizard(
                setupWizardData.storeProductsPerPage,
                setupWizardData.street1,
                setupWizardData.street2,
                setupWizardData.city,
                setupWizardData.zipCode,
                setupWizardData.country,
                setupWizardData.state,
                setupWizardData.paypal,
                setupWizardData.bankAccountName,
                setupWizardData.bankAccountNumber,
                setupWizardData.bankName,
                setupWizardData.bankAddress,
                setupWizardData.bankRoutingNumber,
                setupWizardData.bankIban,
                setupWizardData.bankSwiftCode,
                setupWizardData.customPayment,
                setupWizardData.skrill,
            )
        }
        else {
            await base.click(selector.vendor.vSetup.notRightNow)

            let dashboardIsVisible = await base.isVisible(page, selector.vendor.vDashboard.dashboard)
            expect(dashboardIsVisible).toBe(true)
        }
    },

    async vendorSetupWizard(storeProductsPerPage, street1, street2, city, zipCode, country, state, paypal, bankAccountName, bankAccountNumber, bankName, bankAddress, bankRoutingNumber, bankIban, bankSwiftCode, customPayment, skrill) {
        await page.click(selector.vendor.vSetup.letsGo)

        await base.clearAndType(selector.vendor.vSetup.storeProductsPerPage, storeProductsPerPage)
        await page.type(selector.vendor.vSetup.street1, street1)
        await page.type(selector.vendor.vSetup.street2, street2)
        await page.type(selector.vendor.vSetup.city, city)
        await page.type(selector.vendor.vSetup.zipCode, zipCode)
        await page.click(selector.vendor.vSetup.country)
        await page.type(selector.vendor.vSetup.countryInput, country)
        await page.keyboard.press('Enter')
        await page.type(selector.vendor.vSetup.state, state)
        await page.keyboard.press('Enter')
        await page.click(selector.vendor.vSetup.email)
        await base.click(selector.vendor.vSetup.continueStoreSetup)

        await base.type(selector.vendor.vSetup.paypal, paypal)
        await base.type(selector.vendor.vSetup.bankAccountName, bankAccountName)
        await base.type(selector.vendor.vSetup.bankAccountNumber, bankAccountNumber)
        await base.type(selector.vendor.vSetup.bankName, bankName)
        await base.type(selector.vendor.vSetup.bankAddress, bankAddress)
        await base.type(selector.vendor.vSetup.bankRoutingNumber, bankRoutingNumber)
        await base.type(selector.vendor.vSetup.bankIban, bankIban)
        await base.type(selector.vendor.vSetup.bankSwiftCode, bankSwiftCode)
        await base.type(selector.vendor.vSetup.customPayment, customPayment)
        console.log(selector.vendor.vSetup.skrill)

        await base.type(selector.vendor.vSetup.skrill, skrill)
        // TODO: stripe connect
        // TODO: paypal marketplace
        await base.click(selector.vendor.vSetup.continuePaymentSetup)

        await base.click(selector.vendor.vSetup.goToStoreDashboard)

        let dashboardIsVisible = await base.isVisible(page, selector.vendor.vDashboard.dashboard)
        expect(dashboardIsVisible).toBe(true)

    },



    //-------------------------------------------------- products ---------------------------------------------------//



    //vendor add simple product
    async addSimpleProduct(productName, productPrice, category) {
        await base.click(selector.vendor.vDashboard.products)

        //add new simple product
        await page.click(selector.vendor.product.addNewProduct)
        await page.type(selector.vendor.product.productName, productName)
        await page.type(selector.vendor.product.productPrice, productPrice)
        await page.click(selector.vendor.product.productCategory)
        await page.type(selector.vendor.product.productCategoryInput, category)
        await page.keyboard.press('Enter')
        await base.click(selector.vendor.product.createProduct)

        let createdProduct = await base.getElementValue(selector.vendor.product.title)
        expect(createdProduct.toLowerCase()).toBe(productName.toLowerCase())
    },

    //vendor add variable product
    async addVariableProduct(productName, productPrice, category, attribute, attributeTerms) {
        await base.click(selector.vendor.vDashboard.products)

        //add new variable product
        await page.click(selector.vendor.product.addNewProduct)
        await page.type(selector.vendor.product.productName, productName)
        await page.type(selector.vendor.product.productPrice, productPrice)
        await page.click(selector.vendor.product.productCategory)
        await page.type(selector.vendor.product.productCategoryInput, category)
        await page.keyboard.press('Enter')
        await base.click(selector.vendor.product.createProduct)

        let createdProduct = await base.getElementValue(selector.vendor.product.title)
        expect(createdProduct.toLowerCase()).toBe(productName.toLowerCase())

        //edit product
        await page.select(selector.vendor.product.productType, 'variable')
        //add variation
        await page.select(selector.vendor.product.customProductAttribute, `pa_${attribute}`)
        await page.waitForTimeout(1000)
        await page.click(selector.vendor.product.addAttribute)
        await base.waitForSelector(selector.vendor.product.selectAll)
        await page.click(selector.vendor.product.selectAll)
        await page.click(selector.vendor.product.usedForVariations)
        await base.waitForSelector(selector.vendor.product.saveAttributes)
        await page.click(selector.vendor.product.saveAttributes)

        await base.waitForSelector(selector.vendor.product.addVariations)
        await page.select(selector.vendor.product.addVariations, 'link_all_variations')
        await page.waitForTimeout(1000)
        await page.click(selector.vendor.product.go)
        await base.waitForSelector(selector.vendor.product.confirmGo)
        await page.click(selector.vendor.product.confirmGo)
        await page.waitForTimeout(1000)
        await page.click(selector.vendor.product.okSuccessAlertGo)
        await page.waitForTimeout(1000)

        await page.select(selector.vendor.product.addVariations, 'variable_regular_price')
        await page.waitForTimeout(1000)
        await page.click(selector.vendor.product.go)
        await base.waitForSelector(selector.vendor.product.variationPrice)
        await page.type(selector.vendor.product.variationPrice, '100')
        await page.click(selector.vendor.product.okVariationPrice)

        await base.waitForSelector(selector.vendor.product.saveProduct)
        await base.click(selector.vendor.product.saveProduct)
        await page.waitForTimeout(1000)

        let productCreateSuccessMessage = await base.getSelectorText(selector.vendor.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage.replace(/\s+/g, ' ').trim()).toMatch('Success! The product has been saved successfully. View Product →')
    },

    //vendor add simple subscription product
    async addSimpleSubscription(productName, productPrice, category) {
        await base.click(selector.vendor.vDashboard.products)

        //add new simple subscription product
        await page.click(selector.vendor.product.addNewProduct)
        await page.type(selector.vendor.product.productName, productName)
        await page.type(selector.vendor.product.productPrice, productPrice)
        await page.click(selector.vendor.product.productCategory)
        await page.type(selector.vendor.product.productCategoryInput, category)
        await page.keyboard.press('Enter')
        await base.click(selector.vendor.product.createProduct)

        let createdProduct = await base.getElementValue(selector.vendor.product.title)
        expect(createdProduct.toLowerCase()).toBe(productName.toLowerCase())

        //edit product
        await page.select(selector.vendor.product.productType, 'subscription')
        await page.type(selector.vendor.product.subscriptionPrice, productPrice)
        await page.select(selector.vendor.product.subscriptionPeriodInterval, '1')
        await page.select(selector.vendor.product.subscriptionPeriod, 'month')
        await page.select(selector.vendor.product.expireAfter, '0')
        await page.type(selector.vendor.product.subscriptionTrialLength, '0')
        await page.select(selector.vendor.product.subscriptionTrialPeriod, 'day')

        await base.click(selector.vendor.product.saveProduct)

        let productCreateSuccessMessage = await base.getSelectorText(selector.vendor.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage.replace(/\s+/g, ' ').trim()).toMatch('Success! The product has been saved successfully. View Product →')
    },

    //vendor add variable subscription product
    async addVariableSubscription(productName, productPrice, category, attribute, attributeTerms) {
        await base.click(selector.vendor.vDashboard.products)

        //add new variable subscription product
        await page.click(selector.vendor.product.addNewProduct)
        await page.type(selector.vendor.product.productName, productName)
        await page.type(selector.vendor.product.productPrice, productPrice)
        await page.click(selector.vendor.product.productCategory)
        await page.type(selector.vendor.product.productCategoryInput, category)
        await page.keyboard.press('Enter')
        await base.click(selector.vendor.product.createProduct)

        let createdProduct = await base.getElementValue(selector.vendor.product.title)
        expect(createdProduct.toLowerCase()).toBe(productName.toLowerCase())

        //edit product
        await page.select(selector.vendor.product.productType, 'variable-subscription')
        await page.waitForTimeout(1000)

        //add variation
        await page.select(selector.vendor.product.customProductAttribute, `pa_${attribute}`)
        await page.click(selector.vendor.product.addAttribute)
        await base.waitForSelector(selector.vendor.product.selectAll)
        await page.click(selector.vendor.product.selectAll)
        await page.click(selector.vendor.product.usedForVariations)
        await base.waitForSelector(selector.vendor.product.saveAttributes)
        await page.click(selector.vendor.product.saveAttributes)

        await base.waitForSelector(selector.vendor.product.addVariations)
        await page.select(selector.vendor.product.addVariations, 'link_all_variations')
        await page.waitForTimeout(1000)
        await page.click(selector.vendor.product.go)
        await base.waitForSelector(selector.vendor.product.confirmGo)
        await page.click(selector.vendor.product.confirmGo)
        await page.waitForTimeout(1000)
        await page.click(selector.vendor.product.okSuccessAlertGo)
        await page.waitForTimeout(1000)

        await page.select(selector.vendor.product.addVariations, 'variable_regular_price')
        await page.waitForTimeout(1000)
        await page.click(selector.vendor.product.go)
        await base.waitForSelector(selector.vendor.product.variationPrice)
        await page.type(selector.vendor.product.variationPrice, '100')
        await page.click(selector.vendor.product.okVariationPrice)

        await base.waitForSelector(selector.vendor.product.saveProduct)
        await base.click(selector.vendor.product.saveProduct)
        await page.waitForTimeout(1000)

        let productCreateSuccessMessage = await base.getSelectorText(selector.vendor.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage.replace(/\s+/g, ' ').trim()).toMatch('Success! The product has been saved successfully. View Product →')
    },

    //vendor add external product
    async addExternalProduct(productName, productPrice, category) {
        await base.click(selector.vendor.vDashboard.products)

        //add new external product
        await page.click(selector.vendor.product.addNewProduct)
        await page.type(selector.vendor.product.productName, productName)
        await page.type(selector.vendor.product.productPrice, productPrice)
        await page.click(selector.vendor.product.productCategory)
        await page.type(selector.vendor.product.productCategoryInput, category)
        await page.keyboard.press('Enter')
        await base.click(selector.vendor.product.createProduct)

        let createdProduct = await base.getElementValue(selector.vendor.product.title)
        expect(createdProduct.toLowerCase()).toBe(productName.toLowerCase())

        //edit product
        await page.select(selector.vendor.product.productType, 'external')
        await page.type(selector.vendor.product.productUrl, await base.getBaseUrl() + '/shop/uncategorized/subscription_handcrafted-granite-chicken/')
        await page.type(selector.vendor.product.buttonText, 'Buy product')
        await base.clearAndType(selector.vendor.product.price, productPrice)

        await base.click(selector.vendor.product.saveProduct)

        let productCreateSuccessMessage = await base.getSelectorText(selector.vendor.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage.replace(/\s+/g, ' ').trim()).toMatch('Success! The product has been saved successfully. View Product →')
    },

    //vendor add auction product
    async addAuctionProduct(productName, productPrice, category) {

        await base.click(selector.vendor.vDashboard.auction)

        //add new auction product
        await base.click(selector.vendor.vAuction.addNewActionProduct)
        await page.type(selector.vendor.vAuction.productName, productName)
        // await page.type(selector.vendor.vAuction.productShortDescription, productShortDescription)
        await page.click(selector.vendor.product.productCategory)
        await page.type(selector.vendor.product.productCategoryInput, category)
        await page.keyboard.press('Enter')
        // await page.click(selector.vendor.vAuction.productCategory)
        // await base.setDropdownOptionSpan(selector.vendor.vAuction.productCategoryValues, category)

        // await page.select(selector.vendor.vAuction.itemCondition, itemCondition)
        // await page.select(selector.vendor.vAuction.actionType, actionType)
        await page.type(selector.vendor.vAuction.startPrice, productPrice)
        await page.type(selector.vendor.vAuction.bidIncrement, '50')
        await page.type(selector.vendor.vAuction.reservedPrice, productPrice + 400)
        await page.type(selector.vendor.vAuction.buyItNowPrice, productPrice + 900)
        await page.type(selector.vendor.vAuction.auctionStartDate, '2022-03-31 10:15') //TODO: handle date using datepicker or use core input filed 
        await page.type(selector.vendor.vAuction.auctionEndDate, '2022-04-10 10:12')
        // await page.keyboard.press('Enter')
        await base.click(selector.vendor.vAuction.addAuctionProduct)

        let productCreateSuccessMessage = await base.getSelectorText(selector.vendor.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage.replace(/\s+/g, ' ').trim()).toMatch('× Success! The product has been updated successfully. View Product →')//TODO: update assertion text)

    },

    //vendor add booking product
    async addBookingProduct(productName, category, bookingDurationType, bookingDuration, bookingDurationUnit, calenderDisplayMode, enableCalendarRangePicker, maxBookingsPerBlock,
        minimumBookingWindowIntoTheFutureDate, minimumBookingWindowIntoTheFutureDateUnit, maximumBookingWindowIntoTheFutureDate, maximumBookingWindowIntoTheFutureDateUnit,
        baseCost, blockCost) {

        await page.type(selector.vendor.vBooking.productName, productName)
        await page.click(selector.vendor.vBooking.category)
        await base.setDropdownOptionSpan(selector.vendor.vBooking.categoryValues, category)

        // general Booking options
        await page.select(selector.vendor.vBooking.bookingDurationType, bookingDurationType)
        await page.type(selector.vendor.vBooking.bookingDuration, bookingDuration)
        await page.select(selector.vendor.vBooking.bookingDurationUnit, bookingDurationUnit)

        await page.select(selector.vendor.vBooking.calenderDisplayMode, calenderDisplayMode)
        await page.select(selector.vendor.vBooking.enableCalendarRangePicker, enableCalendarRangePicker)

        //availability
        await page.type(selector.vendor.vBooking.maxBookingsPerBlock, maxBookingsPerBlock)
        await page.type(selector.vendor.vBooking.minimumBookingWindowIntoTheFutureDate, minimumBookingWindowIntoTheFutureDate)
        await page.select(selector.vendor.vBooking.minimumBookingWindowIntoTheFutureDateUnit, minimumBookingWindowIntoTheFutureDateUnit)
        await page.type(selector.vendor.vBooking.maximumBookingWindowIntoTheFutureDate, maximumBookingWindowIntoTheFutureDate)
        await page.select(selector.vendor.vBooking.maximumBookingWindowIntoTheFutureDateUnit, maximumBookingWindowIntoTheFutureDateUnit)

        //costs
        await page.type(selector.vendor.vBooking.baseCost, baseCost)
        await page.type(selector.vendor.vBooking.blockCost, blockCost)

        await base.click(selector.vendor.vBooking.saveProduct)

    },

    //vendor search similar product
    async searchSimilarProduct(productName) {
        await page.click(selector.vendor.vSearchSimilarProduct.search)
        await page.type(selector.vendor.SearchSimilarProduct.search, productName)
        await base.click(selector.vendor.vSearchSimilarProduct.search)
        await page.click(selector.vendor.vSearchSimilarProduct.search)
    },



    //-------------------------------------------------- coupons ---------------------------------------------------//



    //vendor add coupon
    async addCoupon(couponTitle, couponAmount) {
        await base.click(selector.vendor.vDashboard.coupons)
        await base.click(selector.vendor.vCoupon.addNewCoupon)
        await page.type(selector.vendor.vCoupon.couponTitle, couponTitle)
        await page.type(selector.vendor.vCoupon.amount, couponAmount)
        await page.click(selector.vendor.vCoupon.selectAll)
        await page.click(selector.vendor.vCoupon.applyForNewProducts)
        await page.click(selector.vendor.vCoupon.showOnStore)
        await base.click(selector.vendor.vCoupon.createCoupon)

        let createdCoupon = await base.getElementText(selector.vendor.vCoupon.createdCoupon)
        expect(createdCoupon.toLowerCase()).toBe(couponTitle.toLowerCase())
    },



    //-------------------------------------------------- withdraw ---------------------------------------------------//



    //vendor request withdraw 
    async requestWithdraw(withdrawAmount, withdrawMethod) {

        await base.click(selector.vendor.vDashboard.withdraw)

        try {
            let canRequestIsVisible = await base.isVisible(page, selector.vendor.vWithdraw.cancelRequest)
            expect(canRequestIsVisible).toBe(false)
        } catch (err) {
            throw new Error("Vendor already requested for withdraw")
        }


        let minimumWithdrawAmount = await base.getElementText(selector.vendor.vWithdraw.minimumWithdrawAmount)
        minimumWithdrawAmount = minimumWithdrawAmount.replace('$', '')
        // console.log(minimumWithdrawAmount)
        let balance = await base.getElementText(selector.vendor.vWithdraw.balance)
        balance = balance.replace('$', '')
        // console.log(balance)

        if (Number(balance) > Number(minimumWithdrawAmount)) {
            await page.click(selector.vendor.vWithdraw.requestWithdraw)
            await page.type(selector.vendor.vWithdraw.withdrawAmount, minimumWithdrawAmount)
            // await base.setDropdownOption(selector.vendor.withdraw.withdrawMethod, withdrawMethod)
            await base.click(selector.vendor.vWithdraw.submitRequest)
        }
        try {
            let canRequestIsVisible = await base.isVisible(page, selector.vendor.vWithdraw.cancelRequest)
            expect(canRequestIsVisible).toBe(true)

        } catch (err) {
            // console.error(err)
            throw new Error("Vendor balance is less than minimum withdraw amount")
        }
    },

    //vendor cancel withdraw request
    async cancelRequestWithdraw() {
        await base.click(selector.vendor.vDashboard.withdraw)
        await page.click(selector.vendor.vWithdraw.cancelRequest)

        let canRequestIsVisible = await base.isVisible(page, selector.vendor.vWithdraw.cancelRequest)
        expect(canRequestIsVisible).toBe(false)

    },

    //vendor add auto withdraw disbursement schedule
    async addAutoWithdrawDisbursementSchedule(preferredPaymentMethod, preferredSchedule, minimumWithdrawAmount, reserveBalance) {
        await base.click(selector.vendor.vDashboard.withdraw)
        await page.click(selector.vendor.vWithdraw.editSchedule)
        await page.select(selector.vendor.vWithdraw.preferredPaymentMethod, preferredPaymentMethod)
        await page.click(selector.vendor.vWithdraw[preferredSchedule])
        // let length = await base.getCount(selector.vendor.withdraw.onlyWhenBalanceIs)
        await page.select(selector.vendor.vWithdraw.onlyWhenBalanceIs, minimumWithdrawAmount)
        await page.select(selector.vendor.vWithdraw.maintainAReserveBalance, reserveBalance)
        await base.click(selector.vendor.vWithdraw.changeSchedule)
    },

    // vendor add default withdraw payment methods
    async addDefaultWithdrawPaymentMethods(preferredSchedule) {
        // TODO : locator issue
        await base.click(selector.vendor.vDashboard.withdraw)
        await base.click(selector.vendor.vWithdraw.customMethodMakeDefault(preferredSchedule))
        await page.waitForTimeout(5000)
    },

    // vendor add default withdraw payment methods
    async setupDefaultWithdrawPaymentMethods(preferredSchedule) {
        // TODO : locator issue
        await base.click(selector.vendor.vDashboard.withdraw)
        await base.click(selector.vendor.vWithdraw.customMethodSetup(preferredSchedule))
        await page.waitForTimeout(5000)
    },

    //vendor add vendor details
    async setVendorDetails(firstName, lastName, email, currentPassword, newPassword) {
        await base.clearAndType(selector.vendor.vendorDetails.firstName, firstName)
        await base.clearAndType(selector.vendor.vendorDetails.lastName, lastName)
        await base.clearAndType(selector.vendor.vendorDetails.email, email)
        await page.type(selector.vendor.vendorDetails.currentPassword, currentPassword)
        await page.type(selector.vendor.vendorDetails.NewPassword, newPassword)
        await page.type(selector.vendor.vendorDetails.confirmNewPassword, newPassword)
        await page.click(selector.vendor.vendorDetails.saveChanges)

    },

    //-------------------------------------------------- vendor settings ---------------------------------------------------//



    //vendor set store settings
    async setStoreSettings(storeName, storeProductsPerPage, phoneNo, street, street2, city, postOrZipCode, country, state, companyName,
        companyIdOrEuidNumber, vatOrTaxNumber, nameOfBank, bankIban, map, minimumOrderAmount, percentage, supportButtonText,
        minimumProductQuantityToPlaceAnOrder, maximumProductQuantityToPlaceAnOrder, minimumAmountToPlaceAnOrder, maximumAmountToPlaceAnOrder) {

        await base.click(selector.vendor.vDashboard.settings)

        //upload banner and profile picture  
        await base.removePreviousUploadedImage(selector.vendor.vStoreSettings.bannerImage, selector.vendor.vStoreSettings.removeBannerImage)
        await page.click(selector.vendor.vStoreSettings.banner)
        await base.wpUploadFile('tests/e2e/utils/sampleData/banner.png')
        await base.removePreviousUploadedImage(selector.vendor.vStoreSettings.profilePictureImage, selector.vendor.vStoreSettings.removeProfilePictureImage)
        await page.click(selector.vendor.vStoreSettings.profilePicture)
        await base.wpUploadFile('tests/e2e/utils/sampleData/avatar.png')
        // store basic info
        await base.clearAndType(selector.vendor.vStoreSettings.storeName, storeName)
        await base.clearAndType(selector.vendor.vStoreSettings.storeProductsPerPage, storeProductsPerPage)
        await base.clearAndType(selector.vendor.vStoreSettings.phoneNo, phoneNo)
        //address
        await base.clearAndType(selector.vendor.vStoreSettings.street, street)
        await base.clearAndType(selector.vendor.vStoreSettings.street2, street2)
        await base.clearAndType(selector.vendor.vStoreSettings.city, city)
        await base.clearAndType(selector.vendor.vStoreSettings.postOrZipCode, postOrZipCode)
        await page.select(selector.vendor.vStoreSettings.country, country)
        await page.select(selector.vendor.vStoreSettings.state, state)
        //company info
        await base.clearAndType(selector.vendor.vStoreSettings.companyName, companyName)
        await base.clearAndType(selector.vendor.vStoreSettings.companyIdOrEuidNumber, companyIdOrEuidNumber)
        await base.clearAndType(selector.vendor.vStoreSettings.vatOrTaxNumber, vatOrTaxNumber)
        await base.clearAndType(selector.vendor.vStoreSettings.nameOfBank, nameOfBank)
        await base.clearAndType(selector.vendor.vStoreSettings.bankIban, bankIban)
        //email
        await base.check(selector.vendor.vStoreSettings.email)
        //show more products
        await base.check(selector.vendor.vStoreSettings.moreProducts)
        //map
        await page.click(selector.vendor.vStoreSettings.map)
        await base.clearAndType(selector.vendor.vStoreSettings.map, map)
        await page.waitForTimeout(1000)
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        //terms and conditions
        await base.check(selector.vendor.vStoreSettings.termsAndConditions)
        let termsAndConditionsIframe = await base.switchToIframe(selector.vendor.vStoreSettings.termsAndConditionsIframe)
        await base.iframeClearAndType(termsAndConditionsIframe, selector.vendor.vStoreSettings.termsAndConditionsHtmlBody, 'Terms and Conditions Vendors')
        //store opening closing time
        await base.check(selector.vendor.vStoreSettings.storeOpeningClosingTime)
        await page.waitForTimeout(1000)
        let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        for (let day of days) {
            await base.clickXpath(selector.vendor.vStoreSettings.chooseBusinessDays)
            await page.waitForTimeout(2000)
            await base.type(selector.vendor.vStoreSettings.chooseBusinessDays, day)
            await page.keyboard.press('Enter')
            await base.clickXpath(selector.vendor.vStoreSettings.businessDaysTab(day))
            await page.waitForTimeout(1000)
            //individual day settings
            await base.waitForSelector(selector.vendor.vStoreSettings.openingTime(day))
            await base.clearAndType(selector.vendor.vStoreSettings.openingTime(day), '06:00 AM')
            await base.clearAndType(selector.vendor.vStoreSettings.closingTime(day), '11:30 PM')
        }
        //vacation
        let noVacationIsSetIsVisible = await base.isVisible(page, selector.vendor.vStoreSettings.noVacationIsSet)
        if (!noVacationIsSetIsVisible) {
            await base.hover(selector.vendor.vStoreSettings.vacationRow)
            await page.click(selector.vendor.vStoreSettings.deleteSavedVacationSchedule)
            await page.click(selector.vendor.vStoreSettings.confirmDeleteSavedVacationSchedule)
        }
        let vacationDayFrom = helper.addDays(helper.currentDate, helper.getRandomArbitraryInteger(31, 365))
        let vacationDayTo = helper.addDays(vacationDayFrom, 31)
        await base.check(selector.vendor.vStoreSettings.goToVacation)
        await base.select(selector.vendor.vStoreSettings.closingStyle, 'datewise')
        await base.type(selector.vendor.vStoreSettings.vacationDateRangeFrom, vacationDayFrom)
        await base.type(selector.vendor.vStoreSettings.vacationDateRangeTo, vacationDayTo)
        await base.type(selector.vendor.vStoreSettings.setVacationMessage, 'We are currently out of order')
        await page.click(selector.vendor.vStoreSettings.saveVacationEdit)
        //discount
        await base.check(selector.vendor.vStoreSettings.enableStoreWideDiscount)
        await base.clearAndType(selector.vendor.vStoreSettings.minimumOrderAmount, minimumOrderAmount)
        await base.clearAndType(selector.vendor.vStoreSettings.percentage, percentage)
        //biography
        let biographyIframe = await base.switchToIframe(selector.vendor.vStoreSettings.biographyIframe)
        await base.iframeClearAndType(biographyIframe, selector.vendor.vStoreSettings.biographyHtmlBody, 'Vendor biography')
        //store support
        await base.check(selector.vendor.vStoreSettings.showSupportButtonInStore)
        await base.check(selector.vendor.vStoreSettings.showSupportButtonInSingleProduct)
        await base.clearAndType(selector.vendor.vStoreSettings.supportButtonText, supportButtonText)
        //min-max
        await base.check(selector.vendor.vStoreSettings.enableMinMaxQuantities)
        await base.clearAndType(selector.vendor.vStoreSettings.minimumProductQuantityToPlaceAnOrder, minimumProductQuantityToPlaceAnOrder)
        await base.clearAndType(selector.vendor.vStoreSettings.maximumProductQuantityToPlaceAnOrder, maximumProductQuantityToPlaceAnOrder)
        await base.check(selector.vendor.vStoreSettings.enableMinMaxAmount)
        await base.clearAndType(selector.vendor.vStoreSettings.minimumAmountToPlaceAnOrder, minimumAmountToPlaceAnOrder)
        await base.clearAndType(selector.vendor.vStoreSettings.maximumAmountToPlaceAnOrder, maximumAmountToPlaceAnOrder)
        await page.click(selector.vendor.vStoreSettings.clear)
        await page.click(selector.vendor.vStoreSettings.selectAll)
        await base.selectOptionByText(selector.vendor.vStoreSettings.selectCategory, 'Uncategorized')

        //update settings
        await page.click(selector.vendor.vStoreSettings.updateSettings)

        let successMessage = await base.getSelectorText(selector.vendor.vSocialProfileSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Your information has been saved successfully')

    },


    //vendor add addons
    async addAddon() {
        await base.click(selector.vendor.vDashboard.settings)
        await base.click(selector.vendor.vSettings.addons)

        //add addon
        await base.click(selector.vendor.vAddonSettings.createNewAddon)
        await base.clearAndType(selector.vendor.vAddonSettings.name, 'Add-ons Group #' + helper.randomNumber())
        await base.clearAndType(selector.vendor.vAddonSettings.priority, '10')
        await page.click(selector.vendor.vAddonSettings.productCategories,)
        await page.type(selector.vendor.vAddonSettings.productCategories, 'Uncategorized')
        await page.keyboard.press('Enter')

        //Add-on fields
        await page.click(selector.vendor.vAddonSettings.addField)
        await base.waitForSelector(selector.vendor.vAddonSettings.type)
        await page.select(selector.vendor.vAddonSettings.type, 'multiple_choice')
        await page.select(selector.vendor.vAddonSettings.displayAs, 'select')
        await base.clearAndType(selector.vendor.vAddonSettings.titleRequired, 'Add-on Title')
        await page.select(selector.vendor.vAddonSettings.formatTitle, 'label')
        await page.click(selector.vendor.vAddonSettings.enableDescription)
        await base.clearAndType(selector.vendor.vAddonSettings.addDescription, 'Add-on description')
        await page.click(selector.vendor.vAddonSettings.requiredField)
        await base.clearAndType1(selector.vendor.vAddonSettings.enterAnOption, 'Option 1')
        await page.select(selector.vendor.vAddonSettings.optionPriceType, 'flat_fee')
        await base.clearAndType(selector.vendor.vAddonSettings.optionPriceInput, '30')
        await base.click(selector.vendor.vAddonSettings.publish)

        let successMessage = await base.getSelectorText(selector.vendor.vAddonSettings.addonUpdateSuccessMessage)
        expect(successMessage).toMatch('Add-on saved successfully')
    },
    //vendor edit addons
    async editAddon(addon) {
        await base.click(selector.vendor.vDashboard.settings)
        await base.click(selector.vendor.vSettings.addons)

        //add addon
        await base.click(selector.vendor.vAddonSettings.editAddon(addon))
        await base.clearAndType(selector.vendor.vAddonSettings.name, 'Add-ons Group #' + helper.randomNumber())
        await base.clearAndType(selector.vendor.vAddonSettings.priority, '10')
        await page.click(selector.vendor.vAddonSettings.productCategories,)
        await page.type(selector.vendor.vAddonSettings.productCategories, 'Uncategorized')
        await page.keyboard.press('Enter')

        //Add-on fields
        await page.click(selector.vendor.vAddonSettings.addField)
        await base.waitForSelector(selector.vendor.vAddonSettings.type)
        await page.select(selector.vendor.vAddonSettings.type, 'multiple_choice')
        await page.select(selector.vendor.vAddonSettings.displayAs, 'select')
        await base.clearAndType(selector.vendor.vAddonSettings.titleRequired, 'Add-on Title')
        await page.select(selector.vendor.vAddonSettings.formatTitle, 'label')
        await page.click(selector.vendor.vAddonSettings.enableDescription)
        await base.clearAndType(selector.vendor.vAddonSettings.addDescription, 'Add-on description')
        await page.click(selector.vendor.vAddonSettings.requiredField)
        await base.clearAndType1(selector.vendor.vAddonSettings.enterAnOption, 'Option 1')
        await page.select(selector.vendor.vAddonSettings.optionPriceType, 'flat_fee')
        await base.clearAndType(selector.vendor.vAddonSettings.optionPriceInput, '30')
        await base.click(selector.vendor.vAddonSettings.update)

        let successMessage = await base.getSelectorText(selector.vendor.vAddonSettings.addonUpdateSuccessMessage)
        expect(successMessage).toMatch('Add-on saved successfully')
    },


    //vendor set payment settings
    async setPaymentSettings() {

        await base.click(selector.vendor.vDashboard.settings)
        await base.click(selector.vendor.vSettings.payment)

        //paypal
        await base.clearAndType(selector.vendor.vPaymentSettings.paypal, paypal)

        //bank transfer
        await base.clearAndType(selector.vendor.vPaymentSettings.bankAccountName, bankAccountName)
        await base.clearAndType(selector.vendor.vPaymentSettings.bankAccountNumber, bankAccountNumber)
        await base.clearAndType(selector.vendor.vPaymentSettings.bankName, bankName)
        await base.clearAndType(selector.vendor.vPaymentSettings.bankAddress, bankAddress)
        await base.clearAndType(selector.vendor.vPaymentSettings.bankRoutingNumber, bankRoutingNumber)
        await base.clearAndType(selector.vendor.vPaymentSettings.bankIban, bankIban)
        await base.clearAndType(selector.vendor.vPaymentSettings.bankSwiftCode, bankSwiftCode)


        // //Stripe
        // await base.click(selector.vendor.vPaymentSettings.ConnectWithStripe)

        // //paypal marketplace
        // await base.clearAndType(selector.vendor.vPaymentSettings.paypalMarketplace, paypalMarketplace)
        // await base.click(selector.vendor.vPaymentSettings.paypalMarketplaceSigUp)

        //razorpay
        //     await base.click(selector.vendor.vPaymentSettings.rzSignup)
        //  // existing account info
        //     await page.click(selector.vendor.vPaymentSettings.rzIHaveAlreadyAnAccount)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzAccountId, rzAccountId)
        //     await page.click(selector.vendor.vPaymentSettings.rzConnectExistingAccount)
        //  //new account info
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzAccountName, rzAccountName)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzAccountEmail, rzAccountEmail)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzYourCompanyName, rzYourCompanyName)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzYourCompanyType, rzYourCompanyType)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzBankAccountName, rzBankAccountName)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzBankAccountNumber, rzBankAccountNumber)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzBankIfscCode, rzBankIfscCode)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzBankAccountType, rzBankAccountType)
        //     await base.click(selector.vendor.vPaymentSettings.rzConnectAccount)

        //mangopay

        //custom payment method
        await base.clearAndType(selector.vendor.vPaymentSettings.customPayment, customPayment)

        //skrill
        await base.clearAndType(selector.vendor.skrill.email, skrillEmail)

        //update settings
        await page.click(selector.vendor.vPaymentSettings.updateSettings)

    },

    //vendor send id verification request
    async sendIdVerificationRequest() {
        // await base.goto('dashboard/settings/verification/')
        await base.click(selector.vendor.vDashboard.settings)
        await base.click(selector.vendor.vSettings.verification)
        await page.waitForTimeout(2000)

        //id verification
        let cancelRequestIsVisible = await base.isVisible(page, selector.vendor.vVerificationSettings.cancelIdVerificationRequest)
        if (cancelRequestIsVisible) {
            await page.click(selector.vendor.vVerificationSettings.cancelIdVerificationRequest)
            await page.waitForTimeout(2000)
        }
        await page.click(selector.vendor.vVerificationSettings.startIdVerification)
        await page.waitForTimeout(1000)
        let previousUploadedImageIsVisible = await base.isVisible(page, selector.vendor.vVerificationSettings.previousUploadedPhoto)
        if (previousUploadedImageIsVisible) {
            await base.hover(selector.vendor.vVerificationSettings.previousUploadedPhoto)
            await page.click(selector.vendor.vVerificationSettings.removePreviousUploadedPhoto)
            await page.waitForTimeout(2000)
        }
        await base.waitForSelector(selector.vendor.vVerificationSettings.uploadPhoto)
        await page.click(selector.vendor.vVerificationSettings.uploadPhoto)
        await page.waitForTimeout(2000)
        let uploadedMediaIsVisible = await base.isVisible(page, selector.vendor.vVerificationSettings.uploadedMedia)
        if (uploadedMediaIsVisible) {
            await page.click(selector.vendor.vVerificationSettings.uploadedMedia)
            await page.waitForTimeout(1000)
        } else {
            await base.uploadImage(selector.vendor.vVerificationSettings.selectFiles, 'tests/e2e/utils/sampleData/avatar.png')
        }
        await base.clickXpath(selector.vendor.vVerificationSettings.select)
        await page.click(selector.vendor.vVerificationSettings.submitId)
        await page.waitForTimeout(2000)

        let successMessage = await base.getSelectorText(selector.vendor.vVerificationSettings.idUpdateSuccessMessage)
        expect(successMessage).toMatch('Your ID verification request is Sent and pending approval')
    },

    //vendor send address verification request
    async sendAddressVerificationRequest() {
        // await base.goto('dashboard/settings/verification/')
        await base.click(selector.vendor.vDashboard.settings)
        await base.click(selector.vendor.vSettings.verification)
        await page.waitForTimeout(2000)

        //company verification
        let cancelRequestIsVisible = await base.isVisible(page, selector.vendor.vVerificationSettings.cancelAddressVerificationRequest)
        if (cancelRequestIsVisible) {
            await page.click(selector.vendor.vVerificationSettings.cancelAddressVerificationRequest)
            await page.waitForTimeout(1000)
        }
        await page.click(selector.vendor.vVerificationSettings.startAddressVerification)
        await page.waitForTimeout(1000)
        await base.clearAndType(selector.vendor.vVerificationSettings.street, 'abc street')
        await base.clearAndType(selector.vendor.vVerificationSettings.street2, 'xyz street')
        await base.clearAndType(selector.vendor.vVerificationSettings.city, 'New York')
        await base.clearAndType(selector.vendor.vVerificationSettings.postOrZipCode, '10006')
        await base.select(selector.vendor.vVerificationSettings.country, 'US')
        await base.select(selector.vendor.vVerificationSettings.state, 'NY')
        await page.click(selector.vendor.vVerificationSettings.submitAddress)
        await page.waitForTimeout(2000)

        let successMessage = await base.getSelectorText(selector.vendor.vVerificationSettings.addressUpdateSuccessMessage)
        expect(successMessage).toMatch('Your Address verification request is Sent and Pending approval')
    },

    //vendor send company verification request
    async sendCompanyVerificationRequest() {
        // await base.goto('dashboard/settings/verification/')
        await base.click(selector.vendor.vDashboard.settings)
        await base.click(selector.vendor.vSettings.verification)
        await page.waitForTimeout(2000)

        //company verification
        let cancelRequestIsVisible = await base.isVisible(page, selector.vendor.vVerificationSettings.cancelCompanyVerificationRequest)
        if (cancelRequestIsVisible) {
            await page.click(selector.vendor.vVerificationSettings.cancelCompanyVerificationRequest)
            await page.waitForTimeout(1000)
        }
        await page.click(selector.vendor.vVerificationSettings.startCompanyVerification)
        await page.waitForTimeout(1000)
        await page.click(selector.vendor.vVerificationSettings.uploadFiles)
        await page.waitForTimeout(2000)
        let uploadedMediaIsVisible = await base.isVisible(page, selector.vendor.vVerificationSettings.uploadedMedia)
        if (uploadedMediaIsVisible) {
            await page.click(selector.vendor.vVerificationSettings.uploadedMedia)
            await page.waitForTimeout(1000)
        } else {
            await base.uploadImage(selector.vendor.vVerificationSettings.selectFiles, 'tests/e2e/utils/sampleData/avatar.png')
        }
        await base.clickXpath(selector.vendor.vVerificationSettings.select)
        await page.click(selector.vendor.vVerificationSettings.submitCompanyInfo)
        await page.waitForTimeout(2000)

        let successMessage = await base.getSelectorText(selector.vendor.vVerificationSettings.companyInfoUpdateSuccessMessage)
        expect(successMessage).toMatch('Your company verification request is sent and pending approval')
    },

    //vendor set verification settings
    async setVerificationSettings() {
        await base.goto('dashboard/settings/verification/')
        await this.sendIdVerificationRequest()
        await base.goto('dashboard/settings/verification/')
        await this.sendAddressVerificationRequest()
        await base.goto('dashboard/settings/verification/')
        await this.sendCompanyVerificationRequest()
    },

    //vendor set delivery settings
    async setDeliveryTimeSettings() {
        await base.click(selector.vendor.vDashboard.settings)
        await base.click(selector.vendor.vSettings.deliveryTime)

        //delivery support
        await base.check(selector.vendor.vDeliveryTimeSettings.homeDelivery)
        await base.check(selector.vendor.vDeliveryTimeSettings.storePickup)
        await base.clearAndType(selector.vendor.vDeliveryTimeSettings.deliveryBlockedBuffer, '0')

        // let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        let days = ['sunday',] //TODO: not working for multiple days
        for (let day of days) {
            //checkbox
            await base.check(selector.vendor.vDeliveryTimeSettings.deliveryDayCheckbox(day))
            //tab
            await base.clickXpath(selector.vendor.vDeliveryTimeSettings.deliveryDayTab(day))
            //individual day settings
            await base.select(selector.vendor.vDeliveryTimeSettings.openingTime(day), '06:00 AM')
            await base.select(selector.vendor.vDeliveryTimeSettings.closingTime(day), '12:00 PM')

            await base.clearAndType1(selector.vendor.vDeliveryTimeSettings.timeSlot(day), '300')
            await base.clearAndType1(selector.vendor.vDeliveryTimeSettings.orderPerSlot(day), '100')
            // await base.clearAndType1(selector.vendor.vDeliveryTimeSettings.timeSlot, '30')
            // await base.clearAndType1(selector.vendor.vDeliveryTimeSettings.orderPerSlot, '10')
        }
        await base.click(selector.vendor.vDeliveryTimeSettings.deliveryTimeUpdateSettings)

        let successMessage = await base.getSelectorText(selector.vendor.vDeliveryTimeSettings.deliveryTimeUpdateSettingsSuccessMessage)
        expect(successMessage).toMatch('Delivery settings has been saved successfully!')
    },



    //-------------------------------------------------- vendor shipping settings ---------------------------------------------------//



    //vendor set all shipping settings
    async setALLShippingSettings() {
        await this.goToVendorDashboard()
        await this.setShippingSettings('US', 'Flat Rate', 'flat_rate')
        await this.setShippingSettings('US', 'Free Shipping', 'free_shipping')
        await this.setShippingSettings('US', 'Local Pickup', 'local_pickup')
        await this.setShippingSettings('US', 'Table Rate', 'dokan_table_rate_shipping')
        await this.setShippingSettings('US', 'Distance Rate', 'dokan_distance_rate_shipping')
    },

    //set shipping policies
    async setShippingPolicies(processingTime, shippingPolicy, refundPolicy) {
        await base.click(selector.vendor.vShippingSettings.clickHereToAddShippingPolicies)
        await page.select(selector.vendor.vShippingSettings.processingTime, processingTime)//TODO:locator don't work
        await base.clearAndType(selector.vendor.vShippingSettings.shippingPolicy, shippingPolicy)//TODO:locator don't work
        await base.type(selector.vendor.vShippingSettings.refundPolicy, refundPolicy)//TODO:locator don't work
        await base.click(selector.vendor.vShippingSettings.shippingPoliciesSaveSettings)

        let successMessage = await base.getSelectorText(selector.vendor.vShippingSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Settings save successfully')
    },

    //vendor set shipping settings
    async setShippingSettings(shippingZone, shippingMethod, selectShippingMethod) {
        //TODO: admin need to enable shipping settings switch to admin & enable
        await base.click(selector.vendor.vDashboard.settings)
        await base.click(selector.vendor.vSettings.shipping)

        // await this.setShippingPolicies('3', 'shipping policy', 'refund policy') //TODO:locator don't work

        // edit shipping zone
        await base.hover(selector.vendor.vShippingSettings.shippingZoneCell(shippingZone))
        await base.clickXpath(selector.vendor.vShippingSettings.editShippingZone(shippingZone))
        await page.waitForTimeout(3000)

        let methodIsVisible = await base.isVisible(page, selector.vendor.vShippingSettings.shippingMethodCell(shippingMethod))
        if (!methodIsVisible) {
            await base.clickXpath(selector.vendor.vShippingSettings.addShippingMethod)
            await page.waitForTimeout(2000)
            await page.select(selector.vendor.vShippingSettings.shippingMethod, selectShippingMethod)
            await page.click(selector.vendor.vShippingSettings.shippingMethodPopupAddShippingMethod)
            await page.waitForTimeout(2000)
        }

        //edit shipping method
        await base.hover(selector.vendor.vShippingSettings.shippingMethodCell(shippingMethod))
        await base.clickXpath(selector.vendor.vShippingSettings.editShippingMethod(shippingMethod))
        await page.waitForTimeout(2000)

        switch (selectShippingMethod) {
            case 'flat_rate':
                //flat rate
                await base.clearAndType(selector.vendor.vShippingSettings.flatRateMethodTitle, shippingMethod)
                await base.clearAndType(selector.vendor.vShippingSettings.flatRateCost, '20')
                await page.select(selector.vendor.vShippingSettings.flatRateTaxStatus, 'taxable')
                await base.clearAndType(selector.vendor.vShippingSettings.flatRateDescription, 'Flat rate')
                await page.select(selector.vendor.vShippingSettings.flatRateCalculationType, 'class')
                break

            case 'free_shipping':
                //free shipping
                await base.clearAndType(selector.vendor.vShippingSettings.freeShippingTitle, shippingMethod)
                await base.clearAndType(selector.vendor.vShippingSettings.freeShippingMinimumOrderAmount, '200')
                break

            case 'local_pickup':
                //local pickup
                await base.clearAndType(selector.vendor.vShippingSettings.localPickupTitle, shippingMethod)
                await base.clearAndType(selector.vendor.vShippingSettings.localPickupCost, '20')
                await page.select(selector.vendor.vShippingSettings.localPickupTaxStatus, 'taxable')
                await base.clearAndType(selector.vendor.vShippingSettings.flatRateDescription, 'Local Pickup')
                break

            case 'dokan_table_rate_shipping':
                //dokan table rate shipping
                await base.clearAndType(selector.vendor.vShippingSettings.tableRateShippingMethodTitle, shippingMethod)
                await base.select(selector.vendor.vShippingSettings.tableRateShippingTaxStatus, 'taxable')
                await base.select(selector.vendor.vShippingSettings.tableRateShippingTaxIncludedInShippingCosts, 'no')
                await base.clearAndType(selector.vendor.vShippingSettings.tableRateShippingHandlingFee, '10')
                await base.clearAndType(selector.vendor.vShippingSettings.tableRateShippingMaximumShippingCost, '200')
                //rates
                // await page.select(selector.vendor.vShippingSettings.tableRateShippingCalculationType, 'item')
                await base.clearAndType(selector.vendor.vShippingSettings.tableRateShippingHandlingFeePerOrder, '10')
                await base.clearAndType(selector.vendor.vShippingSettings.tableRateShippingMinimumCostPerOrder, '10')
                await base.clearAndType(selector.vendor.vShippingSettings.tableRateShippingMaximumCostPerOrder, '200')

                await base.clickXpath(selector.vendor.vShippingSettings.tableRateShippingUpdateSettings)
                let tableRateSuccessMessage = await base.getSelectorText(selector.vendor.vShippingSettings.tableRateShippingUpdateSettingsSuccessMessage)
                expect(tableRateSuccessMessage).toMatch('Table rates has been saved successfully!')
                return

            case 'dokan_distance_rate_shipping':
                //dokan distance rate shipping
                await base.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingMethodTitle, shippingMethod)
                await base.select(selector.vendor.vShippingSettings.distanceRateShippingTaxStatus, 'taxable')
                await base.select(selector.vendor.vShippingSettings.distanceRateShippingTransportationMode, 'driving')
                await base.select(selector.vendor.vShippingSettings.distanceRateShippingAvoid, 'none')
                await base.select(selector.vendor.vShippingSettings.distanceRateShippingDistanceUnit, 'metric')
                await base.check(selector.vendor.vShippingSettings.distanceRateShippingShowDistance)
                await base.check(selector.vendor.vShippingSettings.distanceRateShippingShowDuration)
                //shipping address
                await base.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingAddress1, 'abc street')
                await base.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingAddress2, 'xyz street')
                await base.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingCity, 'New York')
                await base.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingZipOrPostalCode, '10006')
                await base.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingStateOrProvince, 'New York')
                await base.select(selector.vendor.vShippingSettings.distanceRateShippingCountry, 'United States (US)')

                await base.clickXpath(selector.vendor.vShippingSettings.distanceRateShippingUpdateSettings)
                let distanceRateSuccessMessage = await base.getSelectorText(selector.vendor.vShippingSettings.distanceRateShippingUpdateSettingsSuccessMessage)
                expect(distanceRateSuccessMessage).toMatch('Distance rates has been saved successfully!')
                return

            default:
                break
        }

        await page.click(selector.vendor.vShippingSettings.shippingSettingsSaveSettings)
        await page.waitForTimeout(1000)
        await base.clickXpath(selector.vendor.vShippingSettings.saveChanges)

        let successMessage = await base.getSelectorText(selector.vendor.vShippingSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Zone settings save successfully')
    },

    //vendor set social profile settings
    async setSocialProfile(urls) {
        await base.click(selector.vendor.vDashboard.settings)
        await base.click(selector.vendor.vSettings.socialProfile)

        await base.clearAndType(selector.vendor.vSocialProfileSettings.facebook, urls.facebook)
        await base.clearAndType(selector.vendor.vSocialProfileSettings.twitter, urls.twitter)
        await base.clearAndType(selector.vendor.vSocialProfileSettings.pinterest, urls.pinterest)
        await base.clearAndType(selector.vendor.vSocialProfileSettings.linkedin, urls.linkedin)
        await base.clearAndType(selector.vendor.vSocialProfileSettings.youtube, urls.youtube)
        await base.clearAndType(selector.vendor.vSocialProfileSettings.instagram, urls.instagram)
        await base.clearAndType(selector.vendor.vSocialProfileSettings.flicker, urls.flickr)
        // await page.click(selector.vendor.vSocialProfileSettings.updateSettings) //TODO: save settings button click don't work
        await page.keyboard.press('Enter')

        let successMessage = await base.getSelectorText(selector.vendor.vSocialProfileSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Your information has been saved successfully')
    },

    //vendor set rma settings
    async setRmaSettings(label, type, length, lengthValue, lengthDuration) {
        //TODO: admin need to enable rma settings switch to admin & enable
        await base.click(selector.vendor.vDashboard.settings)
        await base.click(selector.vendor.vSettings.rma)

        await base.clearAndType(selector.vendor.vRmaSettings.label, label)
        await page.select(selector.vendor.vRmaSettings.type, type)
        await page.select(selector.vendor.vRmaSettings.length, length)
        await base.type(selector.vendor.vRmaSettings.lengthValue, lengthValue)
        await page.select(selector.vendor.vRmaSettings.lengthDuration, lengthDuration)

        let refundReasonIsVisible = await base.isVisible(page, selector.vendor.vRmaSettings.refundReasons)
        if (refundReasonIsVisible) {
            await base.clickMultiple(selector.vendor.vRmaSettings.refundReasons)
        }
        let iframe = await base.switchToIframe(selector.vendor.vRmaSettings.refundPolicyIframe)
        await base.iframeClearAndType(iframe, selector.vendor.vRmaSettings.refundPolicyHtmlBody, 'Refund Policy Vendor')
        await page.click(selector.vendor.vRmaSettings.rmaSaveChanges)

        let successMessage = await base.getSelectorText(selector.vendor.vRmaSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Settings saved successfully')

    },


}
