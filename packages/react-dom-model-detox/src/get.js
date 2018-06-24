const { get } = require('react-dom-model-selectors/test');
const { getTreeJSON } = require('react-dom-model');
const actions = require('./actions');

module.exports = (selector) => {
  const element = get(getTreeJSON)(selector);
  return {
    ...element,
    ...actions(element)
  }
}