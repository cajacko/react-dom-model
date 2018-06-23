const ReactNativeComponents = ['View', 'TouchableOpacity'];

const getTestIDsBySelector = (selector, { testIDByID }) => {
  const testIDs = [];

  if (selector.includes('#')) {
    const id = selector.replace('#', '');

    if (testIDByID[id]) return testIDByID[id];

    return testIDs;
  }

  return testIDs;
}

const getWithDom = (dom) => (selector) => {
  const testIDs = getTestIDsBySelector(selector, dom);

  // return {
  //   ...response,
  //   then: (callback) => {
  //     return callback(getWithDom(dom));
  //   }
  // }

  const response = {
    testIDs,
    dom,
  }

  return response;
}

const getWithFunc = (getTreeJSON) => (selector) => {
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

  return getWithDom({
    tree,
    testIDByID,
    propsById,
    childrenById,
    typeByID
  })(selector);
}

module.exports = getWithFunc;