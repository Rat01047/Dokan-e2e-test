const open = require('open')
module.exports = {

    // replace '_' to space & capitalize first letter of string
    replaceAndCapitalize: (string) => string.replace('dokan', 'vendor').replace('_', ' ').replace(/^\w{1}/, letter => letter.toUpperCase()),

    // replace '_' to space & capitalize first letter of each word
    replaceAndCapitalizeEachWord: (string) => string.replace('_', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),

    // returns a random number between min (inclusive) and max (exclusive)
    getRandomArbitrary: (min, max) => Math.random() * (max - min) + min, 
    
    // returns a random integer number between min (inclusive) and max (exclusive)
    getRandomArbitraryInteger: (min, max) => Math.floor(Math.random() * (max - min) + min),

    //random number between 0 and 1000
    randomNumber: () => Math.floor(Math.random() * 1000),

    // opens the url in the default browser 
    openUrl: (url) => open('url'),

    // opens test report in the default browser 
    openReport: () => open('./jest-stare/index.html'),

    //current day
    currentDate: (new Date()).toLocaleDateString('en-CA'),

    // add two days
    addDays: (date, days) => {
        var result = new Date(date)
        result.setDate(result.getDate() + days)
        return result.toLocaleDateString('en-CA')
    },
    
}


