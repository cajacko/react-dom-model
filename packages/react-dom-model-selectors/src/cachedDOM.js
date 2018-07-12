let cachedDOM = null;

exports.get = () => cachedDOM;

exports.set = () => {
    cachedDOM = dom;
}

exports.refreshDOM = () => {
    cachedDOM = null;
}