const { Elements, DOM } = require('react-dom-model-selectors/test');
const { by, element, expect } = require("detox");
const defaultActionTimeout = require('./defaultActionTimeout');

class ExtendElements extends Elements {
  constructor(...args) {
    super(...args);

    this.shouldDelayActions = true;

    const detoxActions = ['tap', 'scroll', 'scrollTo', 'typeText', 'multiTap', 'longPress', 'tapAtPoint', 'replaceText', 'clearText', 'swipe', 'setColumnToValue'];

    detoxActions.forEach((action) => {
      this[action] = this.delayedAction(action);
    });

    this.addAssertion('isVisible', this.expect('toBeVisible'), this.toBeNotVisible());
  }



  scrollUntilIsVisible(DOM, selector, scrollIncrements = 400, timeout = this.timeout || 10000) {
    this.setShouldDelayActions(false);

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
          return Promise.reject(this.error(`scrollUntilIsVisible timed out for selector: ${selector}`, { isVisibleSelector: selector }));
        }

        if (elementIsVisible) return Promise.resolve();

        return this.scroll(scrollIncrements, 'down').then(loop);
      });
    }

    const response = (shouldResolve) => (data) => {
      this.setShouldDelayActions(true);

      if (shouldResolve) return Promise.resolve(data);

      return Promise.reject(data);
    }

    return loop().then(response(true)).catch(response(false));
  }

  setShouldDelayActions(shouldDelayActions) {
    this.shouldDelayActions = shouldDelayActions;
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
    return element(by.id(testID));
  }

  delayedAction(action) {
    return async (...params) => this.delayedPromise((testID) => {
      return this.getElement(testID)[action](...params);
    }, this.timeout || defaultActionTimeout.get(), !this.shouldDelayActions);
  }

  expect(action) {
    return async (...params) => {
      const testID = this.getOnlyTestID();

      return expect(this.getElement(testID))[action](...params).catch(this.rejectError({ action: action }));
    };
  }

  delayedPromise(callback, timeout, skipDelay) {
    return new Promise((resolve, reject) => {
      const testID = this.getOnlyTestID();

      callback(testID).then(() => {
        if (skipDelay) {
          resolve();
        } else {
          // Allows the dom model time to update
          setTimeout(() => resolve(), timeout);
        }
      }).catch(reject);
    });
  }
}

module.exports = ExtendElements;