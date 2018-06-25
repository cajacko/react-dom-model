const { Elements } = require('react-dom-model-selectors/test');
const { by, element } = require("detox");

class ExtendElements extends Elements {
  constructor(...args) {
    super(...args);

    const detoxActions = ['tap', 'scroll', 'scrollTo', 'typeText', 'multiTap', 'longPress', 'tapAtPoint', 'replaceText', 'clearText', 'swipe', 'setColumnToValue'];

    detoxActions.forEach((action) => {
      this[action] = async (...params) => new Promise((resolve, reject) => {
        const testID = this.getOnlyTestID();

        element(by.id(testID))[action](...params).then(() => {
          // Allows the dom model time to update
          setTimeout(() => resolve(), 500);
        }).catch(reject);
      });
    });
  }
}

module.exports = ExtendElements;