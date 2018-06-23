const { get } = require('react-dom-model-selectors/test');
const { getTreeJSON } = require('react-dom-model');

module.exports = (selector) => {
    const elements = get(getTreeJSON)(selector);

    console.log(elements.testIDs);

    return elements.testIDs;
}