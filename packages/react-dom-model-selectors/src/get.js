const shouldUseDOMCache = require('./shouldUseDOMCache');

let cachedDom = null;

const getTestIDsBySelector = (selector, { testIDByID }) => {
  const testIDs = [];

  if (selector.includes('#')) {
    const id = selector.replace('#', '');

    if (testIDByID[id]) return testIDByID[id];

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

const getDOM = (getTreeJSON) => {
  const testIDByID = {}; 
  const propsById = {}; 
  const childrenById = {}; 
  const typeByID = {};

  const tree = getTreeJSON(({ component, props, children }) => {
    if (!props && !props.testID) return;
    const { testID } = props;

    if (props.selectorID) {
      if (!testIDByID[props.selectorID]) testIDByID[props.selectorID] = [];

      if (!testIDByID[props.selectorID].includes(testID)) {
        testIDByID[props.selectorID].push(testID);
      }
      
    }
  });

  return {
    tree,
    testIDByID,
    propsById,
    childrenById,
    typeByID,
  };
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