const { isReady, waitForIsReady } = require('./connections');

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

const processTree = (tree) => {
  if (tree.props && tree.props.children) delete tree.props.children;

  return {
    component: tree.name,
    props: tree.props,
    children: tree.children,
  }
}

const getTreeWithChildren = (tree1, parser) => {
  const tree = processTree(tree1);
  const { children } = tree;

  if (!children || !children.length || !Array.isArray(children)) {
    if (parser) parser(tree);
    return tree;
  }

  tree.children = tree.children.map((id) => {
    const node = store.get(id).toJS();

    if (parser) parser(processTree(node));

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
  if (close) close();
}
