const { get } = require('react-dom-model-selectors/test');

exports.detox = require('detox');
exports.init = require('./src/init');
exports.cleanup = require('./src/cleanup');
exports.reloadApp = require('./src/reloadApp');
exports.get = get;
