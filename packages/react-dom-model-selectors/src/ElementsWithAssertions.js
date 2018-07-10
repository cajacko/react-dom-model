const { expect } = require('chai');
const ElementsBase = require('./ElementsBase');
const waitFor = require('./waitFor');

const propKeysToDeleteInAssert = [
  'selectorClasses',
  'selectorID',
  'testID',
  'children',
  'accessible',
  'allowFontScaling',
  'ellipsizeMode'
];

class ElementsWithAssertions extends ElementsBase {
  constructor(...args) {
    super(...args);

    const assert = (func) => (...args) => func(...args);

    this.assert = { not: {} };

    const assertions = ['countIs', 'textIs', 'exists', 'hasClass', 'hasID', 'propExists', 'propEquals', 'stateKeyExists', 'stateEquals'];

    assertions.forEach((assertionFuncName) => {
      this.addAssertion(assertionFuncName,  (...args) => this[assertionFuncName](...args));
    });

    this.assert.waitFor = (timeout = this.timeout || 5000) => {
      const waitForAssert = { not: {} };

      Object.keys(this.assert).forEach((key) => {
        if (key === 'waitFor' || key === 'not') return;

        waitForAssert[key] = waitFor(this.assert[key], timeout);
      });

      Object.keys(this.assert.not).forEach((key) => {
        if (key === 'waitFor' || key === 'not') return;

        waitForAssert.not[key] = waitFor(this.assert.not[key], timeout);
      });

      return waitForAssert;
    }
  }

  addAssertion(key, func, notFunc) {
    const assert = (localFunc, isNot) => (...args) => {
      const doAssert = () => {
        try {
          const promise = localFunc(...args);

          return Promise.resolve(promise);
        } catch (e) {
          return Promise.reject(e);
        }
      }

      if (!isNot) return doAssert();

      return doAssert().then(() => {
        return this.error(`assert.${key} ran without an error. We're using "not" so it should have failed.`, { assertion: key });
      }).catch(() => null).then((error) => {
        if (error) throw error;
      });
    }

    this.assert[key] = assert(func);

    if (notFunc) {
      this.assert.not[key] = assert(notFunc);
    } else {
      this.assert.not[key] = assert(func, true);
    }
  }

  countIs(count, groupByTestID) {
    const length = this.getCount(groupByTestID);

    if (length === count) return;

    if (groupByTestID) {
      throw this.error(`Count is: ${length}, expected: ${count}. Note groupByTestID has been set to true. So we can only count components using the selectors export`, { expectedCount: count, actualCount: length });
    }

    throw this.error(`Node count is: ${length}, expected: ${count}`);
  }

  exists() {
    if (this.nodeID) return;

    if (this.length < 1) {
      throw this.error(`No elements exist for the given selector: ${this.selector}`);
    }
  }

  textIs(text) {
    const texts = [];
    this.assertSingleOrAtLeastOne((element) => {
      const { children } = element.getNode();

      texts.push(children);

      if (children !== text) {
        throw this.error(`The given text does match the elements text.\nGiven: ${text}\nReceived: ${String(children)}`, {expected: text, received: children});
      }
    }, `The given text does match any of the elements text.`, {expected: text, received: texts});
  }

  hasClass(className) {
    const classes = [];
    this.assertSingleOrAtLeastOne((element) => {
      const { props } = element.getNode();

      if (!props || !props.selectorClasses || !props.selectorClasses.includes(className)) {
        classes.push(props.selectorClasses);

        throw this.error(`The node does not contain the class ${className}`, { class: className });
      }
    }, `None of the found elements have the class: ${className}`, { class: className, classes: classes });
  }

  hasID(id) {
    const ids = [];

    this.assertSingleOrAtLeastOne((element) => {
      const { props } = element.getNode();

      if (!props || !props.selectorID || props.selectorID !== id) {
        ids.push(props.selectorID);

        throw this.error(`The node does not contain the id: ${id}`, { id: id });
      }
    }, `None of the found elements have the id: ${id}`, { id: id, ids: ids});
  }

  propExists(key) {
    this.argExists('props', key);
  }

  propEquals(key, value) {
    this.argEquals('props', key, value);
  }

  stateKeyExists(key) {
    this.argExists('state', key);
  }

  stateEquals(key, value) {
    this.argEquals('state', key, value);
  }

  argExists(arg, propKey) {
    this.assertSingleOrAtLeastOne((element) => {
      const node = element.getNode();

      const props = node[arg];

      if (!props || props[propKey] === undefined) {
        throw this.error(`The node does not have the ${arg}: ${propKey}`, { [arg]: propKey });
      }
    }, `None of the found elements have the ${arg}: ${propKey} specified`, { [arg]: propKey });
  }

  argEquals(arg, arg1, arg2) {
    let key;
    let val;

    if (arg2) {
      key = arg1;
      val = arg2;
    } else {
      val = arg1;
    }

    this.assertSingleOrAtLeastOne((element) => {
      const node = element.getNode();

      const props = node[arg];

      let error = false;

      try {
        if (!key) {
          propKeysToDeleteInAssert.forEach((propKey) => {
            delete props[propKey]
          });

          expect(props).to.deep.equal(val);
        } else {
          expect(props[key]).to.deep.equal(val);
        }
      } catch (e) {
        error = true;
      };

      if (!props || error) {
        if (key) {
          throw this.error(`The nodes ${key} ${arg} does not equal the supplied value`, { [key]: props[key], expected: val });
        }
        
        throw this.error(`The nodes ${arg} does not equal the supplied value`, { [arg]: props, expected: val });
      }
    }, key ? 
      `None of the found elements have the a "${key}" ${arg} that matches the supplied value` : 
      `None of the found elements have ${arg} that matches the supplied value`
    );
  }

  assertSingleOrAtLeastOne(func, errorText, errorProps) {
    if (this.nodeID) {
      func(this);
    } else {
      let atLeastOne = this.atLeastOnePasses((element) => {
        func(element);
      });

      if (!atLeastOne) {
        throw this.error(errorText, errorProps);
      }
    }
  }
  
  atLeastOnePasses(func) {
    let atLeastOnePasses = false;

    this.forEach((elements) => {
      try {
        func(elements);
        atLeastOnePasses = true;
      } catch (e) {}
    });

    return atLeastOnePasses;
  }
}

module.exports = ElementsWithAssertions;