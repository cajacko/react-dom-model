const shouldUseDOMCache = require('./shouldUseDOMCache');
const getDOM = require('./getDOM');

let cachedDom = null;

const getTestIDsBySelector = (selector, { testIDsBySelectorID }) => {
  const testIDs = [];

  if (selector.includes('#')) {
    const id = selector.replace('#', '');

    if (testIDsBySelectorID[id]) return testIDsBySelectorID[id];

    return testIDs;
  }

  return testIDs;
}

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