require('dotenv').config()
const { createURL } = require("@wordpress/e2e-test-utils")
const base = require("./base.js")
const vendorPage = require("./vendor.js")
const vDashboardLocators = require("./vdashboard-locators.js")
const vdashboardLocators = require('./vdashboard-locators.js')


module.exports = {

    // ACTIONS ***->

/*
*DASHBOARD Page
*/

    //Dashboard Page Explore
    async vDashboardExplore() {
        //Check Dashboard Page
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.dashboardPageContent)
        //FATAL Error Check
        await base.checkPHPError()
        
        //Check Banner (PR0)
        if(process.env.DOKAN_PRO == 'true'){
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.banner)
        console.log('Dokan-Pro: Banner')
        } 
        //Check Sales Count
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.salesCount)
        //Check Sales Chart of Month
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.salesChart)
        //Check Order Details
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.orderDetails)
        //Check Latest Announcements (PR0)
        if(process.env.DOKAN_PRO == 'true'){
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.latestAnnouncement)
        console.log('Dokan-Pro: Latest Announcement')
        }
        //Check Reviews Details (PR0)
        if(process.env.DOKAN_PRO == 'true'){
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.reviewsDetails)
        console.log('Dokan-Pro: Reviews Details')
        }
        //Check Product Details
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.productsDetails)
        
        console.log('Checked all the DIVs')
    },
  


/*
*PRODUCTS Page
*/

    //Product Page Explore
    async vProductExplore() {
        //Check Dashboard Page
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsPageContent)
        //FATAL Error Check
        await base.checkPHPError()
        
        //No Product
        var availableNoProducts = await base.isVisible(vDashboardLocators.vProductsPage.noProduct)
        if(availableNoProducts){
            console.log('No Product was Added')
            return

        }

        //ELSE -> Product Present
        //Check All + InStock ----- Add Product
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsAll) //All Page
        console.log('All Page')
        //----------------Pages----------------//
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsOnline) //Online Page
            await base.clickXpathAndWait(vDashboardLocators.vProductsPage.productsOnline)
            console.log('Online Page')
            //await this.visibilityChecker(vDashboardLocators.vProductsPage.productsOnlineStatus)
         await this.visibilityChecker(vDashboardLocators.vProductsPage.productsDraft) //Draft Page
            await base.clickXpathAndWait(vDashboardLocators.vProductsPage.productsDraft)
            console.log('Draft Page')
           // await this.visibilityChecker(vDashboardLocators.vProductsPage.productdDraftStatus)
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsInStock) //In Stock Page
            await base.clickXpathAndWait(vDashboardLocators.vProductsPage.productsInStock)
            console.log('In Stock Page')
           // await this.visibilityChecker(vDashboardLocators.vProductsPage.productInStockStatus)
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsOutOfStock) //Out of Stock Page
            await base.clickXpathAndWait(vDashboardLocators.vProductsPage.productsOutOfStock)
            console.log('Out of Stock Page')
           // await this.visibilityChecker(vDashboardLocators.vProductsPage.productOutOfStockStatus)
        

        await this.visibilityChecker(vDashboardLocators.vProductsPage.addNewProductButton)
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsImportButton)
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsExportButton)

        //Filter
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsFilterDates)
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsFilterCatergory)
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsFilterType)
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsFilterButton)
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsFilterSelect)
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsSearchProducts)
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsSearchButton)

        //Bulk Action + Product Status
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsBulkActions)
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsApplyButton)
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsStatus)

    },

    //Product Add Page Explore
    async vProductAddExplore() {
        //Check Product Add Pop-up
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productsAddPageContent)
        //FATAL Error Check
        await base.checkPHPError()

        //Product Name + Image + Price
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productCoverImage)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productName)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productPrice)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productDiscountedPrice)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productGalleryImage)

        //Product Category + Tag + Description
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.selectCategory)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.selecteTags)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productDescription)

        //Add Button + Create & Add
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.createProductButton)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.createAndAddNewButton)

        console.log('Product Add Page')
    },

    //Product Deatils Page Explore
    async vProductDetailsExplore() {

        //await base.clickXpathAndWait(vDashboardLocators.vProductsDetailsPage.productClick1)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditPageTitle)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditStatus)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.viewEditProductButton)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditTitle)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditImage)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditGalleryImage)
       
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditPermalink)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditEditButton)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditType)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditDownloadableTick)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditVirtualTick)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditPrice)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditDiscountedPrice)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditCategory)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditTags)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShortDescription)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditDescription)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditInventoryBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditSKU)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditStockStatus)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditInventoryTick1)
            await base.clickXpath(vDashboardLocators.vProductsDetailsPage.productEditStockQuantityEnable) //Click to Enable
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditStockQuantity)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditStockThreshold)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAllowBackorders)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditInventoryTick2)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditGeolocationBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditGeolocationTick1)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.prodcutEditGeolocationStoreSettings)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsExpandAll)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsCloseAll)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsAddField)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsImport)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsExport)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsAdditional)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsTick1)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxTick1)
            //await base.clickXpathAndWait(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxTick1) //Click to Disable
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxWeight)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxLength)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxWidth)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxHeight)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxClass)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxSettings)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditLinkedProductsBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditLinkedProductsUpsells)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditLinkedProductsCrosssells)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAttributeBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAttributeCustom)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAttributeAdd)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAttributeSave)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditRMAOptionsBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditRMAOptionsTick1)
            await base.clickXpath(vDashboardLocators.vProductsDetailsPage.productEditRMAOptionsOverride) //Click to Enable
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditRMAOptionsLabel)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditRMAOptionsType)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditRMAOptionsPolicy)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditWholesaleBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditWholesaleTick1)
            await base.clickXpath(vDashboardLocators.vProductsDetailsPage.productEditWholesaleEnable) //Click to Enable
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditWholesalePrice)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditWholesaleQuantity)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMinMaxBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMinMaxTick1)
            await base.clickXpath(vDashboardLocators.vProductsDetailsPage.productEditMinMaxEnable) //Click to Enable
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMinQuantity)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMaxQuantity)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMinAmount)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMaxAmount)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMinMaxOrderRules)
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMinMaxCategoryRules)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditOtherOptionsBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditOtherOptionsStatus)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditOtherOptionsVisibilityOptions)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditOtherOptionsPurchaseNote)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditOtherOptionsEnableReviews)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAdvertiseProductBlock)
            await base.clickXpath(vDashboardLocators.vProductsDetailsPage.productEditAdvertiseEnable) //Click to Open Modal
            await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAdvertiseEnablePopup)
            await base.clickXpath(vDashboardLocators.vProductsDetailsPage.productEditAdvertiseEnablePopupCancel) //Click to Close Modal

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditSaveChangesButton)
        
        console.log('Product Details Page')
        
    },



/*
*ORDERS Page
*/

    //Orders Page Explore
    async vOrdersExplore() {
        //Check Dashboard Page
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersPageContent)
        //FATAL Error Check
        await base.checkPHPError()
        
        //No Orders
        var availableNoOrders = await base.isVisible(vDashboardLocators.vOrdersPage.noOrder)
        if(availableNoOrders){
            console.log('No Order was Placed')
            return

        }

        /*ELSE -> Orders Present
        *
        *
        *Orders Page */
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersAll) //All Page
        console.log('All Page')
        //----------------Pages----------------//
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersCompleted) //Completed Page
            await base.clickXpathAndWait(vDashboardLocators.vOrdersPage.ordersCompleted)
            console.log('Completed Page')
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersProcessing) //Processing Page
            await base.clickXpathAndWait(vDashboardLocators.vOrdersPage.ordersProcessing)
            console.log('Processing Page')
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersOnHold) //On Hold Page
            await base.clickXpathAndWait(vDashboardLocators.vOrdersPage.ordersOnHold)
            console.log('On Hold Page')
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersPending) //Pending Page
            await base.clickXpathAndWait(vDashboardLocators.vOrdersPage.ordersPending)
            console.log('Pending Page')
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersCancelled) //Cancelled Page
            await base.clickXpathAndWait(vDashboardLocators.vOrdersPage.ordersCancelled)
            console.log('Cancelled Page')
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersRefunded) //Refunded Page
            await base.clickXpathAndWait(vDashboardLocators.vOrdersPage.ordersRefunded)
            console.log('Refunded Page')
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersFailed) //Failed Page
            await base.clickXpathAndWait(vDashboardLocators.vOrdersPage.ordersFailed)
            console.log('Failed Page')
        
        //Return to All
        await base.clickXpathAndWait(vDashboardLocators.vOrdersPage.ordersAll) //Click to return to All
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersFilterDate)
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersFilterCustomer)
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersFilterButton)

        //Filter
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersExpandAllButton)
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersExportFilteredButton)

        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersBulkAction)
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.orderBulkActionApply)

        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersOrderList)

        console.log('Orders Page')

    },

    //Order Details Page Explore
    async vOrdersDetailsExplore() {
       
       
        await base.clickXpathAndWait(vDashboardLocators.vOrdersPage.ordersAll) //Click to return to All
        
        //Details Page
        await base.clickXpathAndWait(vdashboardLocators.vOrdersDetailsPage.ordersCompletedOrder1)

        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsPage)

        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsHeading)
        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.oderDetailsBody)
        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsBackButton)

        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsRequestRefund)
            await base.clickXpath(vdashboardLocators.vOrdersDetailsPage.orderDetailsRequestRefund)
            await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsRefundItems)

        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsBillingAddress)
        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsShippingAddress)

        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsDownladableProductsSection)
        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsDownladableProductsSelect)
        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsGrantAccess)

        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsGeneralDetailsSection)
        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsOrderNotesSection)
        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsAddNotesTextBox)

        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsAddNotesCustomer)
        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsAddNotesButton)

        await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsTrackingNumber)
            await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsTrackingNumberName)
            await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsTrackingNumberValue)
            await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsTrackingNumberDate)
            await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsTrackingNumberAddDetails)
            await this.visibilityChecker(vdashboardLocators.vOrdersDetailsPage.orderDetailsTrackingNumberClose)

            console.log('Orders Details Page')

    },






    


/*
.
.
.
.
.
*/

/* 
*Checker FUNCTION 
*/

    //-[Checker FUNCTION]
    async visibilityChecker(locator) {
        var availableLocator = await base.isVisible(locator)
        expect(availableLocator).toBe(true);
    }


    
}
