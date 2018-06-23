const { cleanup } = require("detox");
const { close } = require('react-dom-model');

module.exports = () => Promise.all([
    cleanup(),
    close()
]);