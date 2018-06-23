let useCache = false;

exports.get = () => useCache;

exports.set = (newVal) => {
  useCache = newVal;
}