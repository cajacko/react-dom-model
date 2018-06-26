const Elements = require('./Elements');

class ElementsBase extends Array {
    constructor(DOM, ExtendElements, nodeID) {
      super(0);
  
      this.DOM = DOM;
      this.ExtendElements = ExtendElements || Elements;
      this.nodeID = nodeID;
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
  
    getCount(groupByTestID) {
      if (this.nodeID) return 1;
  
      if (!groupByTestID) return this.length;
  
      let testIDs = [];
  
      this.forEach((element) => {
        const testID = element.getTestID();
  
        if (!testID) {
          throw new Error('You are using getCount(groupByTestID) with groupByTestID as true. This requires that every component your selector finds is using the selectors export to set the testID');
        }
  
        if (!testIDs.includes(testID)) testIDs.push(testID);
      });
  
      return testIDs.length;
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
  
    getProps(allowMultiple) {
      if (this.nodeID) {
        return this.getNode().props;
      }
  
      this.exists();
  
      if (this.getCount() === 1) {
        return this[0].getProps();
      }
  
      if (!allowMultiple) {
        throw new Error('Multiple elements found for the given selector, pass true to getProps(true) to return all the props as an array. Or narrow your selector');
      }
  
      return this.map((element) => {
        return element.getProps(allowMultiple);
      });
    }
  }
  
  module.exports = ElementsBase;