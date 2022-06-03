
// const puppeteer = require('puppeteer')
const { createURL } = require("@wordpress/e2e-test-utils")


// This page contains all necessary puppeteer automation methods 
module.exports = {

    //check whether element is ready or not
    async isLocatorReady(selector, page) {
        const isVisibleHandle = await page.evaluateHandle((e) => {
            const style = window.getComputedStyle(e)
            return (style && style.display !== 'none' &&
                style.visibility !== 'hidden' && style.opacity !== '0')
        }, selector)
        var visible = await isVisibleHandle.jsonValue()
        const box = await selector.boxModel()
        if (visible && box) {
            return true
        }
        return false
    },

    //check whether element is visible or not
    async isVisible(page, selector) {
        return await page.evaluate((selector) => {
            if (selector.startsWith('//')) {
                var element = document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
            } else {
                var element = document.querySelector(selector)
            }
            if (element) {
                let style = window.getComputedStyle(element)
                return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
            } else {
                return false
            }
        }, selector)
    },

    //click element and wait until network idle
    async click(selector) {
        if (selector.startsWith('//')) {
            await this.clickXpathAndWait(selector)
        } else {
            await Promise.all([page.click(selector), page.waitForNavigation({ waitUntil: 'networkidle2' })])
            // await Promise.all([page.click(selector), page.waitForNavigation({ waitUntil: 'networkidle0' })])
            // await Promise.all([page.click(selector), page.waitForNavigation({ waitUntil: 'domcontentloaded' })])
            // await Promise.race([await element.click(), page.waitForNavigation({ waitUntil: 'networkidle2' })])
        }
    },

    //click xpath element and wait until network idle
    async clickXpathAndWait(selector) {
        await page.waitForXPath(selector)
        let [element] = await page.$x(selector)
        await Promise.all([await element.click(), page.waitForNavigation({ waitUntil: 'networkidle2' })])
        // await Promise.all([page.click(selector), page.waitForNavigation({ waitUntil: 'networkidle0' })])
        // await Promise.all([page.click(selector), page.waitForNavigation({ waitUntil: 'domcontentloaded' })])
        // await Promise.race([await element.click(), page.waitForNavigation({ waitUntil: 'networkidle2' })])
    },

    //click xpath element
    async clickXpath(selector) {
        let [element] = await page.$x(selector)
        await element.click()
    },

    //wait for element and then click
    async waitAndClick(selector) {
        if (selector.startsWith('//')) {
            await page.waitForXPath(selector)
            let [element] = await page.$x(selector)
            await element.click()  // just click
        } else {
            await page.waitForSelector(selector)
            await page.click(selector)  // just click
        }
    },

    //wait for element and then click and wait until network idle
    async waitAndClickAndWait(selector) {
        if (selector.startsWith('//')) {
            await page.waitForXPath(selector)
            let [element] = await page.$x(selector)
            await element.click()
            await Promise.all([await element.click(), page.waitForNavigation({ waitUntil: 'networkidle2' })]) // click then wait
        } else {
            await page.waitForSelector(selector)
            await page.click(selector)
            await Promise.all([page.click(selector), page.waitForNavigation({ waitUntil: 'networkidle2' })]) // click then wait
        }
    },

    //wait for element
    async waitForSelector(selector) {
        if (selector.startsWith('//')) {
            await page.waitForXPath(selector)
        } else {
            await page.waitForSelector(selector)
        }
    },

    //wait for element to visible and then click
    async waitVisibleAndClick(selector) {
        if (selector.startsWith('//')) {
            await page.waitForXPath(selector, { visible: true })
            let [element] = await page.$x(selector)
            await element.click()
        } else {
            await page.waitForSelector(selector, { visible: true })
            await page.click(selector)
        }
    },

    //hover on element
    async hover(selector) {
        if (selector.startsWith('//')) {
            let [element] = await page.$x(selector)
            await element.hover()
        } else {
            let element = await page.$(selector)
            await element.hover()
            // await page.hover(selector)
        }
        await page.waitForTimeout(1000)
    },

    // //check checkbox, if checked uncheck then check
    // async check(selector) {
    //     let element = await page.$(selector)
    //     // const hasChecked = await page.$eval(selector, (element) => element.hasAttribute('checked'))
    //     const isCheckBoxChecked = await (await element.getProperty("checked")).jsonValue()
    //     if (isCheckBoxChecked) {
    //         await page.click(selector)
    //         await page.waitForTimeout(10)
    //         await page.click(selector)
    //     }
    //     else {
    //         await page.click(selector)
    //     }
    // },

    // //or

    //check checkbox, if checked uncheck then check
    async check(selector) {
        let element = await this.getElement(selector)
        const isCheckBoxChecked = await (await element.getProperty("checked")).jsonValue()
        if (isCheckBoxChecked) {
            await element.click()
            await page.waitForTimeout(10)
            await element.click()
        }
        else {
            await element.click()
        }
    },


    // // uncheck checkbox, if unchecked then skip
    // async uncheck(selector) {
    //     let element = await page.$(selector)
    //     const isCheckBoxChecked = await (await element.getProperty("checked")).jsonValue()
    //     if (isCheckBoxChecked) {
    //         await page.click(selector)
    //     }
    // },

    // //or

    // uncheck checkbox, if unchecked then skip
    async uncheck(selector) {
        let element = await page.$(selector)
        const isCheckBoxChecked = await (await element.getProperty("checked")).jsonValue()
        if (isCheckBoxChecked) {
            await element.click()
        }
    },

    //wait for select element then set value based on options value
    async select(selector, value) {
        let element = await this.getElement(selector)
        await element.select(value)
    },

    //set value based on select options text
    async selectOptionByText(selectSelector, OptionSelector, textContent) {
        let elements = await page.$$(OptionSelector)
        for (let element of elements) {
            const text = await page.evaluate(element => element.textContent, element)
            if (textContent.toLowerCase() == (text.trim()).toLowerCase()) {
                let value = await (await element.getProperty('value')).jsonValue()
                // console.log(value)
                await page.select(selectSelector, value)
            }
        }
    },

    // or 

    //set value based on select options text  optimize version
    async selectByText(selector, text) {  // TODO: don't work for text ,fix this
        // let optionValue = await page.$$eval('option', options => options.find(o => o.innerText == text)?.value)
        let optionValue = await page.$$eval('option', options => options.find(o => o.innerText === 'NYshop')?.value) //TODO:working
        // console.log(optionValue)
        // await page.select(selector, optionValue)

        // await page.evaluate((selector,text) => {
        //     const example = document.querySelector(selector)
        //     const example_options = example.querySelectorAll('option')
        //     const selected_option = [...example_options].find(option => option.text === text)
        //     selected_option.selected = true
        // })

        // await page.evaluate(() => { $(`${selector} option:contains('${text}')`)[0].selected = true })
    },

    //upload image via file chooser
    async uploadImage(selector, image) {
        let element = await this.getElement(selector)
        const [fileChooser] = await Promise.all([page.waitForFileChooser(), element.click()])
        await fileChooser.accept([image])
        await page.waitForTimeout(3000)
    },

    //goto subUrl
    async goto(subpath) {
        await Promise.all([page.goto(createURL(subpath)), page.waitForNavigation({ waitUntil: 'networkidle2' })])
    },

    //reload page and wait until network idle
    async reload() {
        await page.reload({ waitUntil: 'networkidle2' })
    },

    //get element text
    async getSelectorText(selector) {
        if (selector.startsWith('//')) {
            await page.waitForXPath(selector)
            let [element] = await page.$x(selector)
            let text = await (await element.getProperty('textContent')).jsonValue()
            // console.log(text)
            return text
        } else {
            await page.waitForSelector(selector)
            let text = await page.$eval(selector, (element) => element.textContent)
            // let text =  await page.$eval(selector, element => element.innerText)
            // console.log(text)
            return text
        }
    },

    //click multiple elements with same selector/class/xpath
    async clickMultiple(selector) {
        let elements = await this.getElements(selector)
        for (let element of elements) {
            await element.click()
        }
    },

    //get element handle for xpath or css selector 
    async getElement(selector) {
        if (selector.startsWith('//')) {
            await page.waitForXPath(selector)
            let [element] = await page.$x(selector)
            return element
        } else {
            await page.waitForSelector(selector)
            let element = await page.$(selector)
            return element
        }
    },

    // get element text
    async getElementText(selector) {
        let element = await this.getElement(selector)
        let text = await (await element.getProperty('textContent')).jsonValue()
        // console.log(text)
        return text
    },

    // get element property value
    async getElementValue(selector) {
        let element = await this.getElement(selector)
        let value = await (await element.getProperty('value')).jsonValue()
        // console.log(value)
        return value
    },

    // get element class value
    async getElementClassValue(selector) {
        let element = await this.getElement(selector)
        let classValue = await (await element.getProperty('className')).jsonValue()
        // console.log(classValue)
        return classValue
    },

    // get multiple elements
    async getElements(selector) {
        let elements = await page.$$(selector)
        return elements
    },

    // get element count
    async getElementCount(selector) {
        let elements = await page.$$(selector)
        let length = elements.length
        // console.log(length)
        return length
    },
    // or
    async getCount(selector) {
        let count = await page.$$eval(selector, ele => ele.length)
        // console.log(count)
        return count
    },

    // get dropdown options  span dropdown
    async getDropdownOptions(selector) {
        let elements = await page.$$(selector)
        let options = []
        for (let element of elements) {
            const text = await page.evaluate(element => element.textContent, element)
            options.push(text)
            // console.log(text)
        }
        return options
    },

    // or

    async getMultipleElementTexts(selector) {
        let texts = await page.$$eval(selector, elements => elements.map(item => item.textContent))
        // console.log(texts)
        return texts
    },

    // set dropdown option  span dropdown
    async setDropdownOptionSpan(selector, value) {
        let elements = await page.$$(selector)
        for (let element of elements) {
            const text = await page.evaluate(element => element.textContent, element)
            // console.log(text)
            if (value.toLowerCase() == (text.trim()).toLowerCase()) {
                // console.log(text)
                await element.click()
            }
        }
    },

    // get value
    async getValue(selector) {
        let value = await page.$eval(selector, (element) => element.value)
        // console.log(value)
        return value
    },
    // clear input field
    async clearInputField(selector) {
        await page.$eval(selector, el => el.value = '')
    },
    // or
    async clearInputField1(selector) {
        await page.click(selector, { clickCount: 3 })
        await page.keyboard.press('Backspace')

    },

    async type(selector, value) {
        let element = await this.getElement(selector)
        await element.type(value)
        // let [element] = await page.$x(selector)
        // await element.type(value)
    },

    // clear input field and type 
    async clearAndType1(selector, value) {
        let element = await this.getElement(selector)
        // await element.focus()
        await element.click({ clickCount: 3 })
        await page.keyboard.press('Backspace')
        await element.type(value)
    },

    // or

    // clear input field and type
    async clearAndType(selector, value) {
        await page.$eval(selector, el => el.value = '')
        await page.type(selector, value)
    },

    //scroll element into view
    async scrollIntoView(selector) {  //TODO: don't work
        if (selector.startsWith('//')) {
            let [element] = await page.$x(selector)
            await page.evaluate((element) => { element.scrollIntoView() }, element)
        } else {
            // console.log('css selector')
            let element = await page.$(selector)
            await page.evaluate((element) => { element.scrollIntoView() }, element)
        }
    },

    // close single tab
    async closeSingleTab() {
        await page.close()
        // close browser or close all tab
        await browser.close()
    },

    // close all tab i.e. close browser
    async closeAllTab() {
        await browser.close()
    },

    //switch to another 
    async switchTab() { },//TODO: add this

    //open link in new tab
    async openNewTab() {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        // await browser.newPage() 
        // const page2 = await browser.newPage()        // open new tab
        // await page2.bringToFront() 
        // const page = page2
    },

    //iframe
    async switchToIframe(selector) {
        await page.waitForSelector(selector)
        const frameHandle = await page.$(selector)
        const iframe = await frameHandle.contentFrame()
        return iframe
    },

    //iframe: clear and type iframe input element 
    async iframeClearAndType(iframe, selector, value) {
        await iframe.$eval(selector, el => el.textContent = '')
        // await iframe.$eval(selector, el => el.value = '')
        await iframe.type(selector, value)
    },

    //get base url
    async getBaseUrl() {
        let url = await page.url()
        //   return url.match(/^https?:\/\/[^#?\/]+/)[0] //using regex
        return new URL(url).origin //using Web API's built-in URL
    },

    //handle alert
    async alert(action) {
        page.on('dialog', async dialog => {
            // console.log(dialog.message())
            if (action == 'accept') {
                await dialog.accept()
            } else if (action == 'cancel') {
                await dialog.dismiss()
            }
        })
    },

    async alertWithValue(value) {//TODO: dont work fix this
        page.on('dialog', async dialog => {
            // console.log(dialog.message())
            // await dialog.accept()
        })
        page.evaluate(() => alert('500'))
    },

    //TODO: add function for grab console error




    //---------------------------------------------- Dokan specific functions ------------------------------------//


    //delete element if exist (only first will delete) dokan specific :rma,report abuse
    async deleteIfExists(selector) {
        if (await page.$x(selector) !== null) {
            let [element] = await page.$x(selector)
            await element.click()
        } else {
            return
        }
    },

    //delete element if exist until all instance deleted
    // async deleteListElement(selector, value) {
    //     let elements = await page.$$(selector)
    //     for (let element of elements) {
    //         const text = await page.evaluate(element => element.textContent, element)
    //         var children = await page.$x(element)
    //         console.log(children)
    //         // console.log(text)
    //         // if (value.toLowerCase() == (text.trim()).toLowerCase()) {
    //         //     // console.log(text)
    //         //     // await element.click()
    //         //     console.log(element.childNodes.length)
    //         // }
    //     }
    // },

    //check for php error
    async checkPHPError() {
        // let pageContent = await page.content()
        // let pageContent = pageContent.toLowerCase()  
        let pageContent = await page.content()

        if ((pageContent.includes('Warning')) || (pageContent.includes('Fatal error')) || (pageContent.includes('Notice:'))) {
            await page.screenshot({ path: 'tests/e2e/screenshot/phpError' + Date.now() + '.png', fullPage: true })
        }
        else {
            console.log('no php error')
        }
    },

    // check if page not exits
    async checkPageNotExist() {
        let pageContent = await page.content()

        if (pageContent.includes('Oops! That page can’t be found.')) {
            await page.screenshot({ path: 'tests/e2e/screenshot/pageNotExists' + Date.now() + '.png', fullPage: true })
            //TODO: save permalink
        }
        else {
            console.log('Page exists')
        }
    },


    // upload image
    async wpUploadFile(filePath) {
        //wp image upload
        let wpUploadFiles = "//div[@class='supports-drag-drop' and @style='position: relative;']//button[@id='menu-item-upload']"
        let uploadedMedia = ".attachment-preview"
        let selectFiles = "//div[@class='supports-drag-drop' and @style='position: relative;']//button[@class='browser button button-hero']"
        let select = "//div[@class='supports-drag-drop' and @style='position: relative;']//button[contains(@class, 'media-button-select')]"
        let crop = "//div[@class='supports-drag-drop' and @style='position: relative;']//button[contains(@class, 'media-button-insert')]"
        await page.waitForTimeout(1000)
        let uploadedMediaIsVisible = await this.isVisible(page, uploadedMedia)
        if (uploadedMediaIsVisible) {
            await this.clickXpath(wpUploadFiles)
            // await page.click(uploadedMedia)   
            await page.waitForTimeout(1000)
        }
        // else {
        await this.uploadImage(selectFiles, filePath)
        await this.clickXpath(select)
        await page.waitForTimeout(2000)
        let cropIsVisible = await this.isVisible(page, crop)
        if (cropIsVisible) {
            await this.clickXpath(crop)
            await page.waitForTimeout(3000)
        }
        // }
    },

    // upload image if no image is uploaded
    async wpUploadFileIfNotUploaded(filePath) {
        //wp image upload
        let wpUploadFiles = "//div[@class='supports-drag-drop' and @style='position: relative;']//button[@id='menu-item-upload']"
        let uploadedMedia = ".attachment-preview"
        let selectFiles = "//div[@class='supports-drag-drop' and @style='position: relative;']//button[@class='browser button button-hero']"
        let select = "//div[@class='supports-drag-drop' and @style='position: relative;']//button[contains(@class, 'media-button-select')]"
        let crop = "//div[@class='supports-drag-drop' and @style='position: relative;']//button[contains(@class, 'media-button-insert')]"

        let uploadedMediaIsVisible = await this.isVisible(page, uploadedMedia)
        if (uploadedMediaIsVisible) {
            // await page.click(wpUploadFiles)
            await page.click(uploadedMedia)
            await page.waitForTimeout(1000)
        }
        else {
            await this.uploadImage(selectFiles, filePath)
            await this.clickXpath(select)
            await page.waitForTimeout(1000)
            let cropIsVisible = await this.isVisible(page, crop)
            if (cropIsVisible) {
                await this.clickXpath(crop)
                await page.waitForTimeout(1000)
            }
        }
    },

    // remove previous uploaded image if exists
    async removePreviousUploadedImage(previousUploadedImageSelector, removePreviousUploadedImageSelector) {
        let previousUploadedImageIsVisible = await this.isVisible(page, previousUploadedImageSelector)
        if (previousUploadedImageIsVisible) {
            await this.hover(previousUploadedImageSelector)
            await page.click(removePreviousUploadedImageSelector)
            await page.waitForTimeout(2000)
        }
    },

    async getCurrentUser() {
        const cookies = await page.cookies();
        const cookie = cookies.find(c => {
          var _c$name;
          return !!(c !== null && c !== void 0 && (_c$name = c.name) !== null && _c$name !== void 0 && _c$name.startsWith('wordpress_logged_in_'));
        });
        if (!(cookie !== null && cookie !== void 0 && cookie.value)) {
          return;
        }
        return decodeURIComponent(cookie.value).split('|')[0];
      }



    



    //--------------------------------------------------- extra -----------------------------------------------//

    // //hover on element
    // async hover(selector) {
    //     if (selector.startsWith('//')) {
    //         let [element] = await page.$x(selector)
    //         await element.hover()
    //     } else {
    //         await page.hover(selector)
    //     }
    //     await page.waitForTimeout(1000)
    // },

    // //  or  make all methods like below

    // //get element handle for xpath or css selector 
    // async getElement(selector) {
    //     if (selector.startsWith('//')) {
    //         await page.waitForXPath(selector)
    //         let [element] = await page.$x(selector)
    //         return element
    //     } else {
    //         await page.waitForSelector(selector)
    //         let element = await page.$(selector)
    //         return element
    //     }
    // },

    // //hover on element
    // async hover(selector) {
    //     let element = this.getElement()
    //     await element.hover()
    //     await page.waitForTimeout(1000)
    // },









    // let [element] = await page.$(selector.vendor.vDeliveryTimeSettings.deliveryTimeUpdateSettings)
    // await page.evaluate(element => element.scrollIntoView(), element)

    // await page.$eval(selector.vendor.vDeliveryTimeSettings.deliveryTimeUpdateSettings, element => element.scrollIntoView());




    // // get Title of a page
    // await page.title()
    // // Get url of current tab in puppeteer
    // await page.url()
    // // Content of page / Page Source
    // await page.content()


    // Network handle methods

    //option 1
    // You can wait on both simultaneously and handle whichever occurs first:

    // await Promise.race([
    //   page.waitForNavigation({ waitUntil: "networkidle0" }),
    //   page.waitForSelector(".Error")
    // ])

    // age.waitForResponse( response => response.status() === 200 )   //option 2

    // await page.waitForNavigation({ waitUntil: 'domcontentloaded' })   //option 3

    // Since v1.6.0 there's page.waitForResponse.  ///option 4

    //option 1 5
    // Create promise object before event trigger
    // If you want to satisfy any one of the condition to wait use

    // const watchDog2 = [
    //                 page.waitForSelector('.form .error'),
    //                 page.waitForNavigation({ waitUntil: 'networkidle2' })
    // ]
    // await continueButton.evaluate(continueButton => continueButton.click())
    // await await Promise.race(watchDog2)




    // I have figure it out. It seems that I've been using page.hover(selector) in a wrong way. This is only an action for page to do on the dom.
    // The code should look like this

    // const hoverScreenshot = async (page, dataHook, directory) => {
    //   await page.hover(`[data-hook="${dataHook}`)
    //   const element = await page.$(`[data-hook="${dataHook}`);
    //   await page.waitFor(50);
    //   await element.screenshot({
    //     omitBackground: true,
    //     path: `e2e/screenshots/${directory}/${dataHook}-hover.png`
    //   });
    // })

}