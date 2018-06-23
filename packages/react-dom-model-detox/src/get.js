const { get } = require('react-dom-model-selectors/test');
const { getTreeJSON } = require('react-dom-model');

module.exports = (selector) => {
    return get(getTreeJSON)(selector);
}