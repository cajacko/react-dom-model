const shouldUseDOMCache = require('./shouldUseDOMCache');
const getDOM = require('./getDOM');
const getTestIDsBySelector = require('./getTestIDsBySelector');

let cachedDom = null;

const getElements = (testIDs, dom, get) => {
  return {
    testIDs,
    dom,
    then: (callback) => {
      return callback(getElements(testIDs, dom, get), get);
    }
  }
}

const getWithDom = (dom) => (selector) => {
  const testIDs = getTestIDsBySelector(selector, dom);

  return getElements(testIDs, dom, getWithDom(dom));
}

const getTreeJSONOrCache = (getTreeJSON) => {
  if (!cachedDom || !shouldUseDOMCache.get()) {
    cachedDom = getDOM(getTreeJSON);
  }

  return cachedDom;
}

const getWithFunc = (getTreeJSON) => (selector) => {
  const dom = getTreeJSONOrCache(getTreeJSON);

  return getWithDom(dom)(selector);
}

exports.resetCache = () => {
  cachedDom = null;
}

exports.get = getWithFunc;