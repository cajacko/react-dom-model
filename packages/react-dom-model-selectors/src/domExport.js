const DOM = require('./DOM');
const useDOMCache = require('./useDOMCache');
const { get, set } = require('./cachedDOM');

module.exports = (getTreeJSON, ExtendDOM, ExtendElements) => () => {
    const cachedDOM = get();

    if (useDOMCache.get() && cachedDom) return cachedDom;

    const dom = ExtendDOM ? new ExtendDOM(ExtendElements) : new DOM(ExtendElements);

    getTreeJSON(dom.addNode);

    set(dom);

    return dom;
}