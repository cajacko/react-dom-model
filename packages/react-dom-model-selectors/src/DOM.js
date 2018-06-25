const Elements = require('./Elements');

const ReactNativeComponents = ['View', 'TouchableHighlight', 'Text'];
const NativeComponents = ['RCTView', 'RCTText'];

class DOM {
  constructor(ExtendElements) {
    this.Elements = ExtendElements || Elements;
    this.nodeByNodeID = {};
    // this.propsByNodeID = {};
    // this.stateByNodeID = {};
    this.nodeIDsByTestID = {};
    this.nodeIDsBySelectorID = {};
    this.nodeIDsByClasses = {};
    this.nodeIDsByType = {};
    // this.textByNodeID = {};
    // this.allChildrenNodeIDsByNodeIDs = {};
    this.selectorIDByNodeID = {};
    this.testIDByNodeID = {};
    this.classesByNodeID = {};
    this.typeByNodeID = {};
    this.childrenNodeIDsByNodeID = {};
    // this.parentNodeIDByNodeID = {};
    // this.siblingNodeIDsByNodeID = {};    
    
    this.addNode = this.addNode.bind(this);
  }

  addToPropArray(prop, key, val) {
    if (!this[prop][key]) this[prop][key] = [];

    this[prop][key].push(val);
  }

  addNode(node) {
    const { id, name, children, props: { testID, selectorID, selectorClasses } } = node;

    this.nodeByNodeID[id] = node;
    this.addToPropArray('nodeIDsByType', name, id);
    this.typeByNodeID[id] = name;

    if (children) {
      this.childrenNodeIDsByNodeID[id] = children;
    }

    if (testID) {
      this.addToPropArray('nodeIDsByTestID', testID, id);
      this.testIDByNodeID[id] = testID;
    }

    if (selectorID) {
      this.addToPropArray('nodeIDsBySelectorID', selectorID, id);
      this.selectorIDByNodeID[id] = selectorID;
    }

    if (selectorClasses) {
      selectorClasses.forEach((selectorClass) => {
        this.addToPropArray('nodeIDsByClasses', selectorClass, id);
        this.addToPropArray('classesByNodeID', id, selectorClass);
      })
    }
  }

  find(selector) {
    const elements = new this.Elements(this, this.Elements);

    if (selector.includes('#')) {
      const id = selector.replace('#', '');
  
      if (this.nodeIDsBySelectorID[id]) {
        elements.add(this.nodeIDsBySelectorID[id]);
      }
    } else if (selector.includes('.')) {
      const className = selector.replace('.', '');
  
      if (this.nodeIDsByClasses[className]) {
        elements.add(this.nodeIDsByClasses[className]);
      }
    }

    elements.finishFind();

    return elements;
  }
}

module.exports = DOM;