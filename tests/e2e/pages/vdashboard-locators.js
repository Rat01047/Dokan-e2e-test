const { createURL } = require("@wordpress/e2e-test-utils")
const base = require("./base.js")
const vendorPage = require("./vendor.js")


module.exports = {

/**LOCATORS**/   
/*
Dashboard Page Locators
*/
    vDashboardPage: {
        // dashboard Home
        dashboardPageContent: '//div[@class="dokan-dashboard-content"]',
        banner: '//div[@class="dokan-panel dokan-panel-default dokan-profile-completeness"]',
        salesCount: '//div[@class="dashboard-widget big-counter"]',
        salesChart: '//div[@class="dashboard-widget sells-graph"]',

        orderDetails: '//div[@class="dashboard-widget orders"]',
        latestAnnouncement: '//div[@class="dashboard-widget dokan-announcement-widget"]',

        reviewsDetails: '//div[@class="dashboard-widget reviews"]',
        productsDetails: '//div[@class="dashboard-widget products"]'
    },



/*
Products Page Locators
*/
    vProductsPage: {
        productsPageContent: '//div[@class="dokan-dashboard-content dokan-product-listing"]',
        
        noProduct: '//h4[normalize-space()="No Products Found!"]',
        
        productsAll: '//li[@class="active"]',
        productsOnline: '//a[normalize-space()="Online (5)"]',
            productsOnlineStatus: '//tbody/tr[2]/td[3]/label[1]',
        productsInStock: '//a[normalize-space()="In stock (5)"]',
            productsInStockStatus: '//tbody/tr[2]/td[6]',
        productsDraft: '//a[normalize-space()="Draft (1)"]',
            productdsDraftStatus: '//label[normalize-space()="Draft"]',
        productsOutOfStock:'//a[normalize-space()="Out of stock (1)"]',
            productsOutOfStockStatus: '//td[@data-title="Stock"]',


        addNewProductButton: '//a[@class="dokan-btn dokan-btn-theme dokan-add-new-product"]',
        productsImportButton: '//a[@class="dokan-btn"][normalize-space()="Import"]',
        productsExportButton: '//a[normalize-space()="Export"]',
        
        productsFilterDates: '//select[@id="filter-by-date"]',
        productsFilterCatergory: '//form[@class="dokan-form-inline dokan-w8 dokan-product-date-filter"]//select[@id="product_cat"]',
        productsFilterType: '//select[@id="filter-by-type"]',
        productsFilterButton: '//button[normalize-space()="Filter"]',
        productsFilterSelect: '//select[@name="filter_by_other"]',
        productsSearchProducts: '//input[@placeholder="Search Products"]',
        productsSearchButton: '//button[@name="product_listing_search"]',

        productsBulkActions: '//select[@id="bulk-product-action-selector"]',
        productsApplyButton: '//input[@id="bulk-product-action"]',

        productOne: '//td[@class="column-primary"]//strong',
        productsStatus: '//label[normalize-space()="Online"]'

    },

    vProductsAddPage: {
        productsAddPageContent: '//form[@id="dokan-add-new-product-form"]',

        productCoverImage: '//div[@class="instruction-inside"]',
        productName: '//input[@placeholder="Product name.."]',
        productPrice: '//div[@class="dokan-input-group"]//input[@id="_regular_price"]',
        productDiscountedPrice: '//div[@class="dokan-input-group"]//input[@id="_sale_price"]',
        productGalleryImage: '//li[@class="add-image add-product-images tips"]',

        selectCategory: '//div[@class="product-full-container"]//span[@id="select2-product_cat-container"]',
        selecteTags: '//input[@placeholder="Select product tags"]',
        productDescription: '//textarea[@placeholder="Enter some short description about this product..."]',
       
        createProductButton: '//input[@id="dokan-create-new-product-btn"]',
        createAndAddNewButton: '//input[@id="dokan-create-and-add-new-product-btn"]',

    },

    vProductsDetailsPage: {
        productClick1: '//a[normalize-space()="One Plus 10T Pro"]',
        productClick2: '//a[normalize-space()="iPhone 13"]',
       
        productEditPageTitle: '//header[@class="dokan-dashboard-header dokan-clearfix"]//h1[@class="entry-title"]',
        productEditStatus: '//span[@class="dokan-label dokan-label-success dokan-product-status-label"]',
        viewEditProductButton: '//span[@class="dokan-right"]',

        //Product basics
        productEditTitle: '//input[@id="post_title"]',
        productEditImage: '//div[@class="image-wrap"]',
        productEditGalleryImage: '//li[@class="add-image add-product-images tips"]',

        productEditPermalink: '//span[@id="sample-permalink"]',
        productEditEditButton: '//button[normalize-space()="Edit"]',

        productEditType: '//select[@id="product_type"]',
        // productEditTypeItem1: '',
        // productEditItem2: '',
        // productEditItem3: '',
        // productEditItem4: '',
        // productEditItem5: '',
        // productEditItem6: '',

        productEditDownloadableTick: '//div[@class="content-half-part downloadable-checkbox"]',
        productEditVirtualTick: '//div[@class="content-half-part virtual-checkbox"]',
    
        productEditPrice: '//input[@id="_regular_price"]',
        productEditDiscountedPrice: '//input[@id="_sale_price"]',

        productEditCategory: '//span[@id="select2-product_cat-container"]',
        productEditTags: '//input[@placeholder="Select product tags"]',
        productEditShortDescription: '//div[@class="dokan-product-short-description"]',
        productEditDescription: '//div[@class="dokan-product-description"]',

        //Inventory
        productEditInventoryBlock: '//div[contains(@class,"dokan-product-inventory dokan-edit-row")]',
        productEditSKU: '//input[@id="_sku"]',
        productEditStockStatus: '//select[@id="_stock_status"]',
        productEditInventoryTick1: '//label[normalize-space()="Enable product stock management"]',
            productEditStockQuantityEnable: '//label[normalize-space()="Enable product stock management"]',  //Click Checkbox
            productEditStockQuantity: '//input[@name="_stock"]',
            productEditStockThreshold: '//input[@name="_low_stock_amount"]',
            productEditAllowBackorders: '//select[@id="_backorders"]',
        productEditInventoryTick2: '//label[@for="_sold_individually"]',

        //Geolocation
        productEditGeolocationBlock: '//div[@class="dokan-geolocation-options dokan-edit-row dokan-clearfix"]',
        productEditGeolocationTick1: '//label[normalize-space()="Same as store"]',
        prodcutEditGeolocationStoreSettings: '//a[normalize-space()="store settings"]',

        //Add-Ons
        productEditAddonsBlock: '//div[@id="dokan-product-addons-options"]',
        productEditAddonsExpandAll: '//a[normalize-space()="Expand all"]',
        productEditAddonsCloseAll: '//a[normalize-space()="Close all"]',
        productEditAddonsAddField: '//button[normalize-space()="Add Field"]',
        productEditAddonsImport: '//button[normalize-space()="Import"]',
        productEditAddonsExport: '//button[normalize-space()="Export"]',

        productEditAddonsAdditional: '//a[normalize-space()="add-ons"]',
        productEditAddonsTick1: '//label[@for="_product_addons_exclude_global"]',

        //Shipping and Tax
        productEditShippingTaxBlock: '//h2[normalize-space()="Shipping and Tax"]',
        productEditShippingTaxTick1: '//label[normalize-space()="This product requires shipping"]',
            productEditShippingTaxTick1: '//input[@id="_disable_shipping"]', //Click to Disable
            productEditShippingTaxWeight: '//input[@id="_weight"]',
            productEditShippingTaxLength: '//input[@id="_length"]',
            productEditShippingTaxWidth: '//input[@id="_width"]',
            productEditShippingTaxHeight: '//input[@id="_height"]',
        productEditShippingTaxClass: '//select[@id="product_shipping_class"]',
        productEditShippingTaxSettings: '//a[normalize-space()="shipping settings"]',

        //Linked Products
        productEditLinkedProductsBlock: '//div[contains(@class,"dokan-linked-product-options dokan-edit-row dokan-clearfix hide_if_external")]',
        productEditLinkedProductsUpsells: '//div[@class="content-half-part dokan-form-group hide_if_variation"]',     
        productEditLinkedProductsCrosssells: '//div[contains(@class,"dokan-linked-product-options dokan-edit-row dokan-clearfix hide_if_external")]//div[contains(@class,"dokan-section-content")]//div[1]',

        //Attribute
        productEditAttributeBlock: '//div[contains(@class,"dokan-attribute-variation-options dokan-edit-row dokan-clearfix hide_if_external")]',
        productEditAttributeCustom: '//select[@id="predefined_attribute"]',
        productEditAttributeAdd: '//a[normalize-space()="Add attribute"]',
        productEditAttributeSave: '//a[normalize-space()="Save attribute"]',

        //RMA Options
        productEditRMAOptionsBlock: '//div[contains(@class,"dokan-rma-options dokan-edit-row dokan-clearfix hide_if_external")]',
        productEditRMAOptionsTick1: '//label[@for="dokan_rma_product_override"]',
            productEditRMAOptionsOverride: '//input[@id="dokan_rma_product_override"]', //Click Checkbox
            productEditRMAOptionsLabel: '//input[@id="dokan-rma-label"]',
            productEditRMAOptionsType: '//select[@id="dokan-warranty-type"]',
            productEditRMAOptionsPolicy: '//div[@id="wp-warranty_policy-wrap"]',            

        //Wholesale Options
        productEditWholesaleBlock: '//div[contains(@class,"dokan-wholesale-options dokan-edit-row dokan-clearfix show_if_simple show_if_external")]',
        productEditWholesaleTick1: '//div[@class="dokan-wholesale-options dokan-edit-row dokan-clearfix show_if_simple show_if_external"]//div[@class="dokan-form-group"]',
            productEditWholesaleEnable: '//label[normalize-space()="Enable wholesale for this product"]', //Click Checkbox
            productEditWholesalePrice: '//input[@id="dokan-wholesale-price"]',
            productEditWholesaleQuantity: '//input[@id="dokan-wholesale-qty"]',


        //Min-Max Options
        productEditMinMaxBlock: '//div[contains(@class,"dokan-edit-row dokan-clearfix dokan-border-top dokan-form-group dokan-product-type-container show_if_simple")]',
        productEditMinMaxTick1: '//label[normalize-space()="Enable Min Max Rule for this product"]',
            productEditMinMaxEnable: '//label[normalize-space()="Enable Min Max Rule for this product"]', //Click Checkbox
            productEditMinQuantity: '//input[@id="min_quantity"]',
            productEditMaxQuantity: '//input[@id="max_quantity"]',
            productEditMinAmount: '//input[@id="min_amount"]',
            productEditMaxAmount: '//input[@id="max_amount"]',
            productEditMinMaxOrderRules: '//label[normalize-space()="Order rules: Do not count"]',
            productEditMinMaxCategoryRules: '//label[normalize-space()="Category rules: Exclude"]',


        //Other Options
        productEditOtherOptionsBlock: '//div[contains(@class,"dokan-other-options dokan-edit-row dokan-clearfix")]',
        productEditOtherOptionsStatus: '//select[@id="post_status"]',
        productEditOtherOptionsVisibilityOptions: '//select[@id="_visibility"]',
        
        productEditOtherOptionsPurchaseNote: '//textarea[@id="_purchase_note"]',
        productEditOtherOptionsEnableReviews: '//label[normalize-space()="Enable product reviews"]',

        //Advertise Product
        productEditAdvertiseProductBlock: '//div[contains(@class,"dokan-edit-row dokan-proudct-advertisement dokan-clearfix")]',
            productEditAdvertiseEnable: '//label[@for="dokan_advertise_single_product"]', //Click Checkbox
            productEditAdvertiseEnablePopup: '//div[@class="swal2-popup swal2-modal swal2-icon-warning swal2-show"]',
            productEditAdvertiseEnablePopupCancel: '//button[@class="swal2-cancel swal2-styled swal2-default-outline"]', //Click Cancel Button


        //Save Changes
        productEditSaveChangesButton: '//input[@id="publish"]'


    },



/*
Orders Page Locators
*/
    vOrdersPage: {
        ordersPageContent: '//article[@class="dokan-orders-area"]',

        noOrder: '//div[@class="dokan-error"]',

        ordersAll: '//a[normalize-space()="All (4)"]',
        ordersCompleted: '//a[normalize-space()="Completed (1)"]',
        ordersProcessing: '//a[normalize-space()="Processing (1)"]', 
        ordersOnHold: '//a[normalize-space()="On-hold (1)"]',
        ordersPending: '//a[normalize-space()="Pending (0)"]', 
        ordersCancelled: '//a[normalize-space()="Cancelled (1)"]',
        ordersRefunded: '//a[normalize-space()="Refunded (0)"]',
        ordersFailed: '//a[normalize-space()="Failed (0)"]',

        ordersFilterDate: '//input[@id="order_date_filter"]',
        ordersFilterCustomer: '//span[@class="select2-selection__placeholder"]',
        ordersFilterButton: '//span[@class="select2-selection__placeholder"]',
        ordersExpandAllButton: '//input[@name="dokan_order_export_all"]',
        ordersExportFilteredButton: '//input[@name="dokan_order_export_filtered"]',

        ordersBulkAction: '//select[@id="bulk-order-action-selector"]',
        orderBulkActionApply: '//input[@id="bulk-order-action"]',

        ordersOrderList: '//table[@class="dokan-table dokan-table-striped"]',

    },

    vOrdersDetailsPage: {

        ordersCompletedOrder1: '//strong[normalize-space()="Order 26"]',  //Order in the List

        orderDetailsPage: '//div[@class="dokan-dashboard-content dokan-orders-content"]',

        orderDetailsHeading: '//strong[normalize-space()="Order#26"]',
        oderDetailsBody: '//div[@id="woocommerce-order-items"]',
        orderDetailsBackButton: '//a[contains(text(),"← Orders")]',
        orderDetailsRequestRefund: '//button[normalize-space()="Request Refund"]',
            orderDetailsRefundItems: '//div[@class="wc-order-data-row wc-order-refund-items"]',

        orderDetailsBillingAddress: '//div[@class="dokan-left dokan-order-billing-address"]',
        orderDetailsShippingAddress: '//div[@class="dokan-left dokan-order-shipping-address"]',

        orderDetailsDownladableProductsSection: '//div[@class="order_download_permissions wc-metaboxes-wrapper"]',
        orderDetailsDownladableProductsSelect: '//input[@placeholder="Choose a downloadable product…"]',
        orderDetailsGrantAccess: '//button[normalize-space()="Grant Access"]',

        orderDetailsGeneralDetailsSection: '//div[@class="dokan-panel-body general-details"]',
        orderDetailsOrderNotesSection: '//div[@id="dokan-order-notes"]',
        orderDetailsAddNotesTextBox: '//textarea[@id="add-note-content"]',

        orderDetailsAddNotesCustomer: '//select[@id="order_note_type"]',
        orderDetailsAddNotesButton: '//input[@name="add_order_note"]',

        orderDetailsTrackingNumber: '//input[@id="dokan-add-tracking-number"]',
            orderDetailsTrackingNumberName: '//input[@id="shipping_provider"]',
            orderDetailsTrackingNumberValue: '//input[@id="tracking_number"]',
            orderDetailsTrackingNumberDate: '//input[@id="shipped-date"]',
            orderDetailsTrackingNumberAddDetails: '//input[@id="add-tracking-details"]',
            orderDetailsTrackingNumberClose: '//button[@id="dokan-cancel-tracking-note"]'

    }










}
