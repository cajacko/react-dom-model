const { DOM } = require('react-dom-model-selectors/test');
const { getTreeJSON } = require('react-dom-model');
const ExtendElements = require('./src/ExtendElements');

exports.detox = require('detox');
exports.init = require('./src/init');
exports.cleanup = require('./src/cleanup');
exports.reloadApp = require('./src/reloadApp');
exports.DOM = DOM(getTreeJSON, null, ExtendElements);
