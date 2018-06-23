const ReactNativeComponents = ['View', 'TouchableOpacity'];

module.exports = (getTreeJSON) => (selector) => {
  const testIDByID = {}; 
  const propsById = {}; 
  const childrenById = {}; 
  const typeByID = {};

  const data = getTreeJSON(({ component, props, children }) => {
    // if (!props && !props.testID) return;
    // const { testID } = props;

    // if (props.selectorID) testIDByID[props.selectorID] = testID;
  });

  console.log(data);

  console.log('selector', selector);

  return [1];
}