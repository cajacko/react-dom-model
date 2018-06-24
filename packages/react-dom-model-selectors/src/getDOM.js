const ReactNativeComponents = ['View', 'TouchableHighlight', 'Text'];
const NativeComponents = ['RCTView', 'RCTText'];

module.exports = (getTreeJSON) => {
    const testIDsBySelectorID = {}; 
    const nodesByTestID = {};
    const textByTestID = {};

    let latestNode = null;
  
    const tree = getTreeJSON((node) => {
      const { component, props, children } = node;

      if (!props || !props.testID) return;

      const { testID } = props;
  
      if (props.selectorID) {
        if (!testIDsBySelectorID[props.selectorID]) testIDsBySelectorID[props.selectorID] = [];
  
        if (!testIDsBySelectorID[props.selectorID].includes(testID)) {
            testIDsBySelectorID[props.selectorID].push(testID);
        }
      }

      if (component === 'RCTText') {
        textByTestID[testID] = children;
      }
    });
  
    return {
      tree,
      testIDsBySelectorID,
      nodesByTestID,
      textByTestID
    };
  }