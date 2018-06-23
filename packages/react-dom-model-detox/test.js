const { get } = require('react-dom-model-selectors/test');
const { getTreeJSON } = require('react-dom-model');

exports.detox = require('detox');
exports.init = require('./src/init');
exports.cleanup = require('./src/cleanup');
exports.reloadApp = require('./src/reloadApp');
exports.get = get(getTreeJSON);
