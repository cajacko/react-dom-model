const { Elements, DOM } = require('react-dom-model-selectors/test');
const { by, element, expect } = require("detox");

class ExtendElements extends Elements {
  constructor(...args) {
    super(...args);

    const detoxActions = ['tap', 'scroll', 'scrollTo', 'typeText', 'multiTap', 'longPress', 'tapAtPoint', 'replaceText', 'clearText', 'swipe', 'setColumnToValue'];

    detoxActions.forEach((action) => {
      this[action] = this.delayedAction(action);
    });

    this.addAssertion('isVisible', this.expect('toBeVisible'), this.toBeNotVisible());
  }

  scrollUntilIsVisible(DOM, selector, scrollIncrements = 400, timeout = 10000) {
    const startTime = Date.now();
    DOM().find(selector).assert.exists();

    const isVisisble = () => {
      const element = DOM().find(selector);
      return element.assert.isVisible().then(() => true).catch(() => false);
    };

    const loop = () => {
      return isVisisble().then((elementIsVisible) => {
        const now = Date.now();

        if (now - startTime > timeout) {
          return Promise.reject(new Error('Timeout'));
        }

        if (elementIsVisible) return Promise.resolve();

        return this.scroll(scrollIncrements, 'down').then(loop);
      });
    }

    return loop();
  }

  toBeNotVisible() {
    return (...args) => {
      const checkNotVisible = () => this.expect('toBeNotVisible')(...args);

      try {
        const promise = this.assert.not.exists();
        return Promise.resolve(promise).catch(() => checkNotVisible());
      } catch (e) {
        return checkNotVisible();
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