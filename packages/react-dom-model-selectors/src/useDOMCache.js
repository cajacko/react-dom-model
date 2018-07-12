let useDOMCache = true;

exports.set = (newUseDOMCache) => {
    useDOMCache = newUseDOMCache;
}

exports.get = () => useDOMCache;