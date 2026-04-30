const { defineConfig } = require("cypress");

console.log('CONFIG FILE LOADED');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      console.log('SETUP NODE EVENTS CALLED');
      on('before:browser:launch', (browser, launchOptions) => {
        console.log('BROWSER LAUNCHING:', browser.name);
        if (browser.family === 'chromium') {
          launchOptions.args.push('--user-data-dir=C:\\cypress-chrome-profile');
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--no-sandbox');
          return launchOptions;
        }
      });
    },
  },
});