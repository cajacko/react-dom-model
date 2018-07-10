const Elements = require('./Elements');

const ReactNativeComponents = ['View', 'TouchableHighlight', 'Text'];
const NativeComponents = ['RCTView', 'RCTText'];

class DOM {
  constructor(ExtendElements) {
    this.Elements = ExtendElements || Elements;
    this.nodeByNodeID = {};
    this.nodeIDsByTestID = {};
    this.nodeIDsBySelectorID = {};
    this.nodeIDsByClasses = {};
    this.nodeIDsByType = {};
    this.positionByNodeID = {};
    this.selectorIDByNodeID = {};
    this.testIDByNodeID = {};
    this.classesByNodeID = {};
    this.typeByNodeID = {};
    this.childrenNodeIDsByNodeID = {};
    this.parentNodeIDByNodeID = {};

    this.addNode = this.addNode.bind(this);
  }

  addToPropArray(prop, key, val) {
    if (!this[prop][key]) this[prop][key] = [];

    this[prop][key].push(val);
  }

  addNode(node) {
    const { id, name, children, props } = node;

    this.nodeByNodeID[id] = node;
    this.addToPropArray('nodeIDsByType', name, id);
    this.typeByNodeID[id] = name;

    if (children) {
      const childrenArray = Array.isArray(children) ? children : [children];
      this.childrenNodeIDsByNodeID[id] = childrenArray;

      childrenArray.forEach((nodeID, i) => {
        this.positionByNodeID[nodeID] = i + 1;

        this.parentNodeIDByNodeID[nodeID] = id;
      });
    }

    if (props) {
      const { testID, selectorID, selectorClasses } = props;

      if (testID) {
        this.addToPropArray('nodeIDsByTestID', testID, id);
        this.testIDByNodeID[id] = testID;
      }

      if (selectorID) {
        this.addToPropArray('nodeIDsBySelectorID', selectorID, id);
        this.selectorIDByNodeID[id] = selectorID;
      }

      if (selectorClasses) {
        selectorClasses.forEach(selectorClass => {
          this.addToPropArray('nodeIDsByClasses', selectorClass, id);
          this.addToPropArray('classesByNodeID', id, selectorClass);
        });
      }
    }
  }

  find(selector) {
    const elements = new this.Elements(this, this.Elements, selector);

    const ancestorSelectors = [];

    selector.split(' ').forEach(ancestors => {
      const separatedAncestor = ancestors
        .replace('.', ' .')
        .replace('#', ' #')
        .replace(':', ' :');
      const sameNodeSelectors = separatedAncestor.split(' ').filter(string => string !== '');

      ancestorSelectors.push(sameNodeSelectors);
    });

    let nodeIds = [];

    const hasNodes = !ancestorSelectors.find((sameNodeSelectors, k) => {
      let sameNodeSelectorNodeId = [];

      const filterSameNodes = (newNodes, j) => {
        if (j === 0) {
          sameNodeSelectorNodeId = newNodes;
        } else {
          sameNodeSelectorNodeId = sameNodeSelectorNodeId.filter(nodeID =>
            newNodes.includes(nodeID)
          );
        }
      };

      const nothingFound = !!sameNodeSelectors.find((sameNodeSelector, i) => {
        if (sameNodeSelector.includes('#')) {
          const id = sameNodeSelector.replace('#', '');

          if (this.nodeIDsBySelectorID[id]) {
            filterSameNodes(this.nodeIDsBySelectorID[id], i);
            return false;
          }
        } else if (sameNodeSelector.includes('.')) {
          const className = sameNodeSelector.replace('.', '');

          if (this.nodeIDsByClasses[className]) {
            filterSameNodes(this.nodeIDsByClasses[className], i);
            return false;
          }
        } else if (sameNodeSelector.includes(':')) {
          if (!sameNodeSelector.includes(':nth-child')) {
            throw new Error(
              'If a selector contains a ":" it is expected to read ":nth-child(x)" with a number instead of the x'
            );
          }

          if (i === 0) {
            throw new Error(":nth-child can't be the first statement in a selector block");
          }

          const nthChild = sameNodeSelector.match(/(\d+\.?\d*)/g)[0];
          const position = parseInt(nthChild, 10);

          if (isNaN(position)) {
            throw new Error(`Could not get int from ${sameNodeSelector}`);
          }

          sameNodeSelectorNodeId = sameNodeSelectorNodeId.filter(
            nodeID => this.positionByNodeID[nodeID] === position
          );

          if (sameNodeSelectorNodeId.length) return false;
        } else if (this.nodeIDsByType[sameNodeSelector]) {
          filterSameNodes(this.nodeIDsByType[sameNodeSelector], i);
          return false;
        }

        return true;
      });

      if (nothingFound) return true;

      if (k === 0) {
        nodeIds = sameNodeSelectorNodeId;
        return false;
      }

      nodeIds = this.filterAncestors(nodeIds, sameNodeSelectorNodeId);

      if (!nodeIds.length) return true;

      return false;
    });

    if (hasNodes) {
      elements.add(nodeIds);
    }

    elements.finishFind();

    return elements;
  }

  filterAncestors(ancestorNodeIDs, childrenNodeIDs) {
    return childrenNodeIDs.filter(nodeID =>
      this.nodeIDHasAtLeastOneAncestorNodeID(nodeID, ancestorNodeIDs)
    );

    return childrenNodeIDs;
  }

  nodeIDHasAtLeastOneAncestorNodeID(nodeID, ancestorNodeIDs) {
    const parentID = this.parentNodeIDByNodeID[nodeID];

    if (!parentID) return false;

    if (ancestorNodeIDs.includes(parentID)) return true;

    return this.nodeIDHasAtLeastOneAncestorNodeID(parentID, ancestorNodeIDs);
  }
}

module.exports = DOM;
