const DOM = require('./DOM');

module.exports = (getTreeJSON, ExtendDOM, ExtendElements) => () => {
    const dom = ExtendDOM ? new ExtendDOM(ExtendElements) : new DOM(ExtendElements);
    const tree = getTreeJSON(dom.addNode);
    return dom;
}