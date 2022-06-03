const loginPage = require('../pages/login.js')
const vendorPage = require('../pages/vendor.js')
const vDashboardPage = require('../pages/vdashboard.js')
const vDashboardLocators = require("../pages/vdashboard-locators.js")


const data = require('../utils/testData.js')  //Fakerjs
const base = require("../pages/base.js")  //Actions
const { goto, waitForSelector } = require('../pages/base.js')

const timeout = 900000




describe('Vendor Exploration test', () => {

//VENDOR EXPLORATION

/*
*Option-1
*/    

//Vendor > Dashboard 
    // it('Login Test', async () => {
    //     await loginPage.loginTest(process.env.RATVENDOR2, process.env.RATVENDOR2_PASSWORD)
    //     console.log('Login Test')
    // }, timeout);

    it('Nagivate', async () => {
        await base.goto('shop')
        console.log('Navigate to Shop Page')
    }, timeout);


//----------------------------------Test-------------------------------------------//


    // it('Explore Vendor DASHBOARD', async () => {
    //     await loginPage.login(process.env.RATVENDOR2, process.env.RATVENDOR2_PASSWORD)
    //     await base.goto('dashboard')

    //     //Explore Dashboard
    //     await vDashboardPage.vDashboardExplore();
    // }, timeout);



// /*
// *Option-2 
// */

// //Vendor > Dashboard > Products Page
//     it('Explore Vendor > PRODUCTS', async () => {
//         await loginPage.login(process.env.RATVENDOR2, process.env.RATVENDOR2_PASSWORD)
//         await base.goto('dashboard/products')
//         //Explore Products
//         await vDashboardPage.vProductExplore();
//     }, timeout);
         
//     //Product Add
//     it('Explore Vendor > PRODUCTS > ADD', async () => {
//         await loginPage.login(process.env.RATVENDOR2, process.env.RATVENDOR2_PASSWORD)
//         await base.goto('dashboard/products')
//             await base.clickXpath(vDashboardLocators.vProductsPage.addNewProductButton)
//         //Explore Products > Add
//         await vDashboardPage.vProductAddExplore();
//     }, timeout);

//     //Product Details
//     it('Explore Vendor > PRODUCTS > DETAILS', async () => {
//         await base.goto('dashboard/products')
//             await base.clickXpathAndWait(vDashboardLocators.vProductsDetailsPage.productClick1)
//         //Explore Products > Details
//         await vDashboardPage.vProductDetailsExplore();
//     }, timeout);



// /*
// *Option-3
// */    

//     //Vendor > Dashboard > Orders Page
//     it('Explore Vendor > Orders', async () => {
//         await loginPage.login(process.env.RATVENDOR2, process.env.RATVENDOR2_PASSWORD)
//         await base.goto('dashboard/orders')
//         //Explore Products
//         await vDashboardPage.vOrdersExplore();
//     }, timeout);

//     //Order Details
//     it('Explore Vendor > Orders', async () => {
//         await loginPage.login(process.env.RATVENDOR2, process.env.RATVENDOR2_PASSWORD)
//         await base.goto('dashboard/orders')
//         //Explore Products
//         await vDashboardPage.vOrdersDetailsExplore();
//     }, timeout);





});