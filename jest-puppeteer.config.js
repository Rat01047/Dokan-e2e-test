require('dotenv').config()
module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false', // Enable non-headless mode
    slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0, // slow down test execution by provided seconds
    devtools: process.env.DEVTOOLS !== 'false', // Enable devtools
    args: [
      "--no-sandbox", // Disables the sandbox for all process types that are normally sandBoxed. 
      "--start-fullscreen",  // Browser windowSize
      "--disable-gpu",
      // "--ignore-certificate-errors",
      // "--window-size=1920,1080",
      // "--start-maximized",
      // "--force-device-scale-factor",
    ], // chrome arguments

    defaultViewport: null, //  Ignore default viewport size
    // defaultViewport: {width:1920,height:1080} // viewport for each page. Defaults to an 800x600 viewport.


  },
};
