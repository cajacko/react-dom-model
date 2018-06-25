const { tap, by, element } = require("detox");
const { Elements } = require('react-dom-model-selectors/test');

class ExtendElements extends Elements {
  async tap() {
    return await new Promise((resolve) => {
      const testID = this.getOnlyTestID();

      element(by.id(testID)).tap().then(() => {
        // Allows the dom model time to update
        setTimeout(() => resolve(), 500);
      });
    });
  }
}

module.exports = ExtendElements;