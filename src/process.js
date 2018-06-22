let store = null;
let reactHasLoaded = false;
let hasSetStore = null;
let whenReactHasLoaded = null;

const ReactNativeComponents = ['View', 'TouchableOpacity'];

const isReady = new Promise((resolve) => {
  const resolveIfReady = () => {
    if (store && reactHasLoaded) {
      resolve();
    }
  }

  hasSetStore = resolveIfReady;
  whenReactHasLoaded = resolveIfReady;
})

exports.getStore = (storeInstance) => {
  store = storeInstance;
  hasSetStore();
}

exports.reactHasLoaded = () => {
  reactHasLoaded = true;
  whenReactHasLoaded();
}

exports.isReady = isReady;

const processTree = (tree) => {
  if (tree.props && tree.props.children) delete tree.props.children;

  return {
    component: tree.name,
    props: tree.props,
    children: tree.children,
  }
}

const getTreeWithChildren = (tree1, idsBySelector, propsById, childrenById, typeByID) => {
  const tree = processTree(tree1);
  const { children } = tree;

  if (!children || !children.length || !Array.isArray(children)) return tree;

  tree.children = tree.children.map((id) => {
    const node = store.get(id).toJS();

    if (tree.props && tree.props.selectors) {
      tree.props.selectors.split(' ').forEach((selector) => {
        if (!ReactNativeComponents.includes(tree.component)) return;
        if (!tree.props || !tree.props.testID) return;

        const { testID } = tree.props;

        if (!idsBySelector[selector]) idsBySelector[selector] = [];

        if (!idsBySelector[selector].includes(testID)) {
          idsBySelector[selector].push(testID);
        }

        propsById[testID] = tree.props;
        typeByID[testID] = tree.component;
        childrenById[testID] = tree.children;
      });
    }

    return getTreeWithChildren(node, idsBySelector, propsById, childrenById, typeByID);
  });

  return tree;
}

const getTree = () => {
  if (!store) throw new Error('getTree called when store is not set, use the isReady promise to check we\'re good to go');

  var roots = store.roots;
  
  const ids = roots.toJS();

  if (!ids || !ids.length) return [];

  const idsBySelector = {};
  const propsById = {};
  const childrenById = {};
  const typeByID = {};

  const tree = ids.map((id) => {
    const node = store.get(id).toJS();

    return getTreeWithChildren(node, idsBySelector, propsById, childrenById, typeByID);
  });

  return { tree, idsBySelector, propsById, childrenById, typeByID };
}

exports.getTreeJSON = () => {
  return getTree();
}

