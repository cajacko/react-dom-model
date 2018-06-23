const { device } = require("detox");
const { waitForIsReady } = require('react-dom-model');

module.exports = () => device.reloadReactNative().then(waitForIsReady);