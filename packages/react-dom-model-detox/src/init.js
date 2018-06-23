const detox = require("detox");
const { init,waitForIsReady } = require('react-dom-model');

const initDetox = (detoxConfig) => {
    return detox.init(detoxConfig, {
        initGlobals: false,
        launchApp: true
      });
}

module.exports = (detoxConfig) => {
    return Promise.all([
        initDetox(detoxConfig),
        init(),
    ]);
}