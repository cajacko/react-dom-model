let cachedDOM = null;

exports.get = () => cachedDOM;

exports.set = (dom) => {
    cachedDOM = dom;
}

exports.refreshDOM = () => {
    cachedDOM = null;
}