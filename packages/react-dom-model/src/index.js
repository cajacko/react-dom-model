const { isReady, waitForIsReady } = require('./connections');

let store = null;
let close = null;

console.log('react-dom-model - 1');

exports.waitForIsReady = waitForIsReady;
exports.isReady = isReady;

exports.init = () => {
  console.log('react-dom-model - 2');
  close = require('./react-devtools-core/src/standalone');

  return waitForIsReady();
}

exports.setStore = (storeInstance) => {
  console.log('react-dom-model - 3');
  store = storeInstance;
}

const getTreeWithChildren = (tree, parser) => {
  console.log('react-dom-model - 4');
  const { children } = tree;

  if (!children || !children.length || !Array.isArray(children)) {
    if (parser) parser(tree);
    return tree;
  }

  tree.children = tree.children.map((id) => {
    const node = store.get(id).toJS();

    if (parser) parser(node);

    return getTreeWithChildren(node, parser);
  });

  return tree;
}

const getTree = (parser) => {
  console.log('react-dom-model - 5');
  if (!store) throw new Error('getTree called when store is not set, use the isReady promise to check we\'re good to go');

  var roots = store.roots;
  
  const ids = roots.toJS();

  if (!ids || !ids.length) throw new Error('Could not get any roots, are you sure we\'re connected to the debugger');

  const tree = ids.map((id) => {
    const node = store.get(id).toJS();

    return getTreeWithChildren(node, parser);
  });

  return tree;
}

exports.getTreeJSON = (parser) => {
  console.log('react-dom-model - 6');
  return getTree(parser);
}

exports.close = () => {
  console.log('react-dom-model - 7');
  if (close) close();
}
