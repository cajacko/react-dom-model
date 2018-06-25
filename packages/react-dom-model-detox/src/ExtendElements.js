const { Elements } = require('react-dom-model-selectors/test');
const { by, element, expect } = require("detox");

class ExtendElements extends Elements {
  constructor(...args) {
    super(...args);

    const detoxActions = ['tap', 'scroll', 'scrollTo', 'typeText', 'multiTap', 'longPress', 'tapAtPoint', 'replaceText', 'clearText', 'swipe', 'setColumnToValue'];

    detoxActions.forEach((action) => {
      this[action] = this.delayedAction(action);
    });

    this.assert.isVisible = this.expect('toBeVisible');
    this.assert.not.isVisible = this.toBeNotVisible();
  }

  toBeNotVisible() {
    return (...args) => {
      try {
        this.assert.not.exists();
        return Promise.resolve();
      } catch (e) {
        return this.expect('toBeNotVisible')(...args);
      }
    }
  }

  getElement(testID) {
    return element(by.id(testID))
  }

  delayedAction(action) {
    return async (...params) => this.delayedPromise((testID) => {
      return this.getElement(testID)[action](...params);
    });
  }

  expect(action) {
    return async (...params) => {
      const testID = this.getOnlyTestID();

      return expect(this.getElement(testID))[action](...params);
    };
  }

  delayedPromise(callback) {
    return new Promise((resolve, reject) => {
      const testID = this.getOnlyTestID();

      callback(testID).then(() => {
        // Allows the dom model time to update
        setTimeout(() => resolve(), 500);
      }).catch(reject);
    });
  }
}

module.exports = ExtendElements;