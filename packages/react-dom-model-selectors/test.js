const domExport = require('./src/domExport');

exports.Elements = require('./src/Elements');
exports.DOM = domExport;
exports.waitFor = require('./src/waitFor');
exports.refreshDOM = require('./src/cachedDOM').refreshDOM;
exports.setUseDOMCache = require('./src/useDOMCache').set;