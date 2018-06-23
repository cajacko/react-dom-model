const { get, resetCache } = require('./src/get');

exports.get = get
exports.setUseDOMCache = require('./src/shouldUseDOMCache').set;
exports.refreshDOM = resetCache;