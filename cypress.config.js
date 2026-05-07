const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-gpu');
          return launchOptions;
        }
      });
    },
  },
});