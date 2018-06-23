const { init } = require("detox");

module.exports = (detox) => {
    return init(detox, {
        initGlobals: false,
        launchApp: true
      });
}