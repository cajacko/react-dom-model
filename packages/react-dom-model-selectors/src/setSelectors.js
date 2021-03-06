let testID = 0;
// First prop must exist, and must be a unique ID

module.exports = (...classes) => {
    testID += 1;

    if (!classes || !classes.length) throw new Error('No selectors passed to setSelectors');

    const selectorID = classes.splice(0, 1)[0];

    return {
        selectorID,
        selectorClasses: classes,
        testID: `reactDOMModelSelector-${testID}`,
    }
}