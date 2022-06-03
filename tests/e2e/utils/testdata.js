require('dotenv').config()
const { faker } = require('@faker-js/faker')



module.exports = {

   //--------------------------------------------------- Fixed  test data ---------------------------------------------//
   // wooCommerce

   //shipping
   shippingMethods: ['flat_rate', 'free_shipping', 'local_pickup', 'dokan_table_rate_shipping', 'dokan_distance_rate_shipping', 'dokan_vendor_shipping'],
   taxStatus: ['taxable', 'none'],
   freeShippingRequires: ['coupon', 'min_amount', 'either', 'both'],

   //payment
   razorpayDisbursementMode: ['Immediate', 'On Order Complete', 'Delayed'],
   payPalMarketplaceDisbursementMode: ['Immediate', 'On Order Complete', 'Delayed'],
   payPalMarketplacePaymentButtonType: ['Smart Payment Buttons', 'Standard Button'],
   mangopayAvailableCreditCards: ['CB/Visa/Mastercard', 'Maestro*', 'Bancontact/Mister Cash', 'Przelewy24*', 'Diners*', 'PayLib', 'iDeal*', 'MasterPass*', 'Bankwire Direct*'],
   mangopayAvailableDirectPaymentServices: ['Sofort*', 'Giropay*'],
   mangopayTransferFunds: ['On payment completed', 'On order completed', 'Delayed'],
   mangopayTypeOfVendors: ['Individuals', 'Business', 'Either'],
   mangopayBusinessRequirement: ['Organizations', 'Soletraders', 'Businesses', 'Any'],
   stripeExpressDisbursementMode: ['On payment completed', 'On order completed', 'Delayed'],
   stripeExpressPaymentMethods: ['Credit/Debit Card', 'iDEAL'],
   stripeExpressButtonType: ['default', 'buy', 'donate', 'book'],
   stripeExpressButtonTheme: ['dark', 'light', 'light-outline'],
   stripeExpressButtonLocations: ['Checkout', 'Product', 'Cart'],
   stripeExpressButtonSize: ['default', 'medium', 'large'],

   //Dokan

   //admin
   //general settings
   sellingProductTypes: ['sell_both', 'sell_physical', 'sell_digital'],
   storeCategory: ['none', 'Single', 'Multiple'],

   //selling options settings
   commissionType: ['flat', 'percentage', 'combine'],
   shippingFeeRecipient: ['seller', 'admin'],
   taxFeeRecipient: ['seller', 'admin'],
   newProductStatus: ['publish', 'pending'],
   productCategory: ['single', 'multiple'],

   //withdraw
   quarterlyScheduleMonth: ['january', 'february', 'march'],
   quarterlyScheduleWeek: ['1', '2', '3', 'L'],
   quarterlyScheduleDay: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
   monthlyScheduleWeek: ['1', '2', '3', 'L'],
   monthlyScheduleDay: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
   biweeklyScheduleWeek: ['1', '2'],
   biweeklyScheduleDay: ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
   weeklyScheduleDay: ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'],

   //privacy policy settings
   privacyPolicy: ['2', '3', '4', '5', '6', '7', '8', '9', '10'],

   //getSupport settings
   displayOnSingleProductPage: ['above_tab', 'inside_tab', 'dont_show'],

   //rma settings
   rmaOrderStatus: ['wc-pending', 'wc-processing', 'wc-on-hold', 'wc-completed', 'wc-cancelled', 'wc-refunded', 'wc-failed'],
   enableRefundRequests: ['yes', 'no'],
   enableCouponRequests: ['yes', 'no'],

   //wholesale customer settings
   needApprovalForCustomer: ['yes', 'no'],

   //delivery time settings
   storeOpeningClosingTime: ['12:00 AM', '11:30 PM'], //TODO: has more elements -> generate using function

   //geolocation settings
   locationMapPosition: ['top', 'left', 'right'],
   showMap: ['all', 'store_listing', 'shop'],
   radiusSearchUnit: ['km', 'miles'],

   //spmv settings
   availableVendorSectionDisplayPosition: ['below_tabs', 'inside_tabs', 'after_tabs'],
   showSpmvProducts: ['show_all', 'min_price', 'max_price', 'top_rated_vendor'],

   //vendor subscription settings
   subscription: ['2', '4', '5', '6', '8', '9', '10', '11', '15', '-1'],
   productStatus: ['publish', 'pending', 'draft'],

   // products
   productTypes: ['simple', 'grouped', 'external', 'variable', 'product_pack', 'subscription', 'variable-subscription', 'booking', 'auction'],
   productTaxStatus: ['taxable', 'shipping', 'none'],
   productTaxClass: ['taxable', 'reduced-rate', 'zero-rate'],
   subscriptionExpire: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
   subscriptionPeriodInterval: ['0', '1', '2', '3', '4', '5', '6'],
   subscriptionPeriod: ['day', 'week', 'month', 'year'],
   subscriptionTrialPeriod: ['day', 'week', 'month', 'year'],
   auctionItemCondition: ['new', 'used'],
   auctionType: ['normal', 'reverse'],
   bookingDurationType: ['fixed', 'customer'],
   bookingDurationUnit: ['month', 'day', 'hour', 'minute'],
   calenderDisplayMode: ['', 'always_visible'],

   //vendor
   withdrawPaymentMethods: ['paypal', 'bank', 'dokan_custom', 'skrill'],
   reserveBalance: ['0', '5', '10', '15', '50', '100', '200', '300', '500', '1000', '2000', '3000', '5000', '10000'],

   //rma settings
   rmaType: ['no_warranty', 'included_warranty', 'addon_warranty'],
   rmaLength: ['limited', 'lifetime'],
   rmaLengthDuration: ['days', 'weeks', 'months', 'years'],

   //auction
   itemCondition: ['new', 'used'],
   actionType: ['normal', 'reverse'],

   //vendor
   //shipping policy
   shippingPolicy: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], // TODO: replace with select text values
   vendorShippingMethods: ['flat_rate', 'free_shipping', 'local_pickup', 'dokan_table_rate_shipping', 'dokan_distance_rate_shipping'],
   flatRateCalculationType: ['class', 'order'],
   flatRateCalculationType: ['item', 'line','class'], // TODO: replace with select text values, one option missing
   tableRateTaxIncludedInShippingCosts: ['yes', 'no'],
   distanceRateTransportationMode: ['driving', 'walking', 'Bicycling'],
   distanceRateAvoid: ['none', 'tolls','highways','ferries'],
   distanceRateDistanceUnit: ['metric', 'imperial'],
   //addon
   addonType: ['multiple_choice', 'checkbox','custom_text', 'custom_textarea','file_upload', 'custom_price','input_multiplier', 'heading'],
   addonDisplayAs: ['select', 'radiobutton', 'images'],
   addonFormatTitle: ['label', 'heading', 'hide'],
   addonOptionPriceType: ['flat_fee', 'quantity_based','percentage_based'],
   //vendor store settings
   vacationClosingStyle: ['instantly','datewise'],


   //------------------------------------------------ Generated  test data ------------------------------------------------------//

   customerInfo: {
      userEmail: faker.internet.email(),
      password: process.env.CUSTOMER_PASSWORD,
      firstName: faker.name.firstName('male'),
      lastName: faker.name.lastName('male'),
   },


   vendorInfo: {
      userEmail: faker.internet.email(),
      password: process.env.VENDOR_PASSWORD,
      firstName: faker.name.firstName('male'),
      lastName: faker.name.lastName('male'),
      userName: faker.name.firstName('male'),
      shopName: faker.company.companyName(),
      // shopUrl: faker.company.companyName(),
      companyName: faker.company.companyName(),
      companyId: faker.random.alphaNumeric(5),
      vatNumber: faker.random.alphaNumeric(10),
      bankName: faker.address.state(),
      bankIban: faker.finance.iban(),
      phone: faker.phone.phoneNumber('(###) ###-####'),
      street1: 'abc street',
      street2: 'xyz street',
      country: 'United States (US)',
      city: 'New York',
      zipCode: '10006',
      state: 'New York',
      accountName: 'accountName',
      accountNumber: faker.random.alphaNumeric(10),
      bankName: 'bankName',
      bankAddress: 'bankAddress',
      routingNumber: faker.random.alphaNumeric(10),
      swiftCode: faker.random.alphaNumeric(10),
      iban: faker.random.alphaNumeric(10),
   },

   vendorSetupWizard: {
      storeProductsPerPage: '12',
      street1: 'abc street',
      street2: 'xyz street',
      country: 'United States (US)',
      city: 'New York',
      zipCode: '10006',
      state: 'New York',
      paypal: faker.internet.email(),
      bankAccountName: 'accountName',
      bankAccountNumber: faker.random.alphaNumeric(10),
      bankName: 'bankName',
      bankAddress: 'bankAddress',
      bankRoutingNumber: faker.random.alphaNumeric(10),
      bankIban: faker.random.alphaNumeric(10),
      bankSwiftCode: faker.random.alphaNumeric(10),
      customPayment: '1234567890',
      skrill: faker.internet.email(),
   },

   product: {
      name: {
         simple: faker.commerce.productName() + (' (Simple)'),
         variable: faker.commerce.productName() + (' (Variable)'),
         external: faker.commerce.productName() + (' (External/Affiliate)'),
         grouped: faker.commerce.productName() + (' (Grouped)'),
         simpleSubscription: faker.commerce.productName() + (' (Simple Subscription)'),
         variableSubscription: faker.commerce.productName() + (' (Variable Subscription)'),
         dokanSubscription: 'Dokan Subscription ' + faker.random.arrayElement(['Gold', 'Silver', 'Platinum', 'Premium'],) + ' ' + faker.random.alpha({ count: 5, upcase: true },) + (' (Product Pack)'),
         booking: faker.commerce.productName() + (' (Booking)'),
         auction: faker.commerce.productName() + (' (Auction)'),
      },
      price: faker.commerce.price(100, 200, 2),
      auctionPrice: faker.commerce.price(10, 100, 0),
      category: 'Uncategorized',
      categories: faker.random.arrayElement(["Electronic Devices", "Electronic Accessories", "Men's Fashion", "Clothings", "Women's Fashion"]),
      attribute: 'size',
      attributeTerms: ['s', 'l', 'm'],
      vendor: [process.env.ADMIN, process.env.VENDOR, process.env.VENDOR1]
   },

   dokanSubscription: {

      price: faker.commerce.price(),
   },

   coupon: {
      amount: faker.datatype.number({ min: 1, max: 10 },).toString(),
      title: 'VC_' + faker.random.alpha({ count: 5, upcase: true },)
   },

   urls: {
      facebook: 'https://www.facebook.com/',
      twitter: 'https://www.twitter.com/',
      pinterest: 'https://www.pinterest.com/',
      linkedin: 'https://www.linkedin.com/',
      youtube: 'https://www.youtube.com/',
      instagram: 'https://www.instagram.com/',
      flickr: 'https://www.flickr.com/',
   },

   // some sample data
   productsName: ["Plain Cotton Tshirt", "The moon Tshirt", "Summer Tshirt"],
   prizes: [100, 150, 250],
   tshirt: ["Plain Cotton Tshirt", "The moon Tshirt", "Summer Tshirt"],
   parentCategories: ["Electronic Devices", "Electronic Accessories", "Men's Fashion", "Clothings", "Women's Fashion"],
   productCategories: ["SmartPhones", "Laptops", "Accessories", "Shirts", "T-Shirts", "Polo Shirts", "Jeans", "Pants", "Shoes", "Bags",],
   productAttributes: ["Size", "Color"],
   attributeValues: [["S", "M", "L", "XL", "XXL"], ["Red", "Blue", "Black", "Yellow", "White", "Deep blue"],],


}

