require('dotenv').config()
const loginPage = require('../pages/login.js')
const customerPage = require('../pages/customer.js')
const data = require('../utils/testData.js')
const timeout = process.env.TIME_OUT
jest.retryTimes(process.env.RETRY_TIMES)

describe('Environment setup test', () => {
    // beforeAll(async () => {})
    // afterAll(async () => {await browser.close()})
    // beforeEach(async () => {})
    // afterEach(async () => {await browser.close()})




    it('environment setup', async () => {
        //TODO: WP SETUP
        //TODO: WOOCOMMERCE SETUP
        //TODO: Plugins activation confirmation
        //TODO: Modules activation confirmation
        //TODO: DOKAN settings setup
        //TODO: Test vendors & customers setup
        //TODO: Product Category & attributes setup
        //TODO: Vendor settings setup
        //TODO: Test product add
        //TODO:
        //TODO:

    }, timeout)




})