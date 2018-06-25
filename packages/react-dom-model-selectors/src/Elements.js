class Elements extends Array {
  constructor(DOM, ExtendElements, nodeID) {
    super(0);

    this.DOM = DOM;
    this.ExtendElements = ExtendElements || Elements;
    this.nodeID = nodeID;

    const assert = (func) => (...args) => func(...args);

    this.assert = { not: {} };
    const assertions = ['countIs', 'textIs'];

    assertions.forEach((assertionFuncName) => {
      this.assert[assertionFuncName] = (...args) => this[assertionFuncName](...args);

      this.assert.not[assertionFuncName] = (...args) => {
        let shouldThrow = false;

        try {
          this[assertionFuncName](...args);
          shouldThrow = true;
        } catch (e) {}

        if (shouldThrow) {
          throw new Error(`assert.${assertionFuncName} ran without an error. We're using "not" so it should have failed`);
        }
      }
    });
  }

  add(nodeIDs) {
    if (nodeIDs && nodeIDs.length) {
      nodeIDs.forEach((nodeID) => {
        const element = new this.ExtendElements(this.DOM, this.ExtendElements, nodeID)
        this.push(element);
      });
    }
  }

  finishFind() {
    if (this.length === 1) {
      this.nodeID = this[0].nodeID;
    }
  }

  countIs(count, groupByTestID) {
    if (this.nodeID) {
      if (count === 1) return;

      throw new Error(`You are asserting that a single element has a count of more than 1. That\'s silly.`);
    }

    if (groupByTestID) {
      let testIDs = [];

      this.forEach((element) => {
        const testID = element.getTestID();

        if (!testID) {
          throw new Error('You are using countIs(count, groupByTestID) with groupByTestID as true. This requires that every component your selector finds is using the selectors export to set the testID');
        }

        if (!testIDs.includes(testID)) testIDs.push(testID);
      });

      if (testIDs.length === count) return;

      throw new Error(`Count is: ${testIDs.length}, expected: ${count}. Note groupByTestID has been set to true. So we can only count components using the selectors export`);
    } else {
      if (this.length === count) return;

      throw new Error(`Node count is: ${this.length}, expected: ${count}`);
    }
  }

  getNode() {
    return this.DOM.nodeByNodeID[this.nodeID];
  }

  getTestID() {
    return this.DOM.testIDByNodeID[this.nodeID];
  }

  getOnlyTestID() {
    if (this.onlyTestID) return this.onlyTestID;

    this.exists();

    let testID = this.getTestID();
      
    if (!testID) {
      this.forEach((element) => {
        const elementTestID = element.getTestID();

        if (!testID && elementTestID) {
          testID = elementTestID;
        } else if (testID && elementTestID && testID !== elementTestID) {
          throw new Error('Multiple Test ID\'s found for elements with the given selector. This action can only be made on 1 testID. Focus your selector to pick just 1');
        }
      });
  
      if (!testID) {
        throw new Error('No testID found for the given selector. This action requires that you use selectors export to put an id on an element');
      }
    }

    this.onlyTestID = testID;

    return this.onlyTestID;
  }

  exists() {
    if (this.nodeID) return;

    if (this.length < 1) {
      throw new Error('No elements exist for the given selector');
    }
  }

  textIs(text) {
    if(this.nodeID) {
      const node = this.getNode();

      if (node.children !== text) {
        throw new Error(`The given text does match the elements text.\nGiven: ${text}\nReceived: ${String(node.text)}`);
      }
    } else {
      let textMatches = false;

      this.forEach((elements) => {
        try {
          elements.textIs(text);
          textMatches = true;
        } catch (e) {}
      });

      if (!textMatches) {
        throw new Error(`The given text does match any of the elements text.`);
      }
    }
  }
}

module.exports = Elements;