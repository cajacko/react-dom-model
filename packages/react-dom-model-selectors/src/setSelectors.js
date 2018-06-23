module.exports = (...classes) => {
    console.log('setSelectors');

    if (!classes || !classes.length) throw new Error('No selectors passed to setSelectors');

    const selectorID = classes.splice(0, 1)[0];

    return {
        selectorID,
        selectorClasses: classes,
        testID: selectorID,
    }
}