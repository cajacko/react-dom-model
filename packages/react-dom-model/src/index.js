const { isReady, waitForIsReady } = require('./connections');
const { clearAll } = require('./intervals');

let store = null;
let close = null;

exports.waitForIsReady = waitForIsReady;
exports.isReady = isReady;

exports.init = () => {
  close = require('./react-devtools-core/src/standalone');

  return waitForIsReady();
}

exports.setStore = (storeInstance) => {
  store = storeInstance;
}

const getTreeWithChildren = (tree, parser) => {
  const children = tree && tree.children;

  if (!children || !children.length || !Array.isArray(children)) {
    if (parser) parser(tree);
    return tree;
  }

  tree.children = tree.children.map((id) => {
    const _node = store.get(id);
    const node = _node && _node.toJS();

    if (parser) parser(node);

    return getTreeWithChildren(node, parser);
  });

  return tree;
}

const getTree = (parser) => {
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
  return getTree(parser);
}

exports.close = () => {
  clearAll();

  if (close) return close();

  return Promise.resolve();
}
