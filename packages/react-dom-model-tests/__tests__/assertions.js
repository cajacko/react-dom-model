// react-dom-model-detox

// isVisible
// isNotVisible

// react-dom-model-selector

// exists
// doesNotExist
// countIs
// hasClass
// hasID
// propExists
// propEquals
// stateEquals
// stateExists
// textIs

const { expect } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('assertions', () => {
  describe('countIs', () => {
    describe('When counting the nodes', () => {
      it('The returned count is correct and higher that counting grouped by testID', () => {
        const dom = DOM();

        dom.find('#App').assert.countIs(1, true);
        dom.find('#App').assert.countIs(2);
      });
    });

    describe('When counting nodes with a specific selector', () => {
        it('Has a count of 1', () => {
          // DOM().find('View#App').assert.countIs(1);
        });
    });

    describe('not', () => {
      describe('When looking for the count', () => {
        it('assert.countIs passes and assert.not.countIs passes with a different val', () => {
          const dom = DOM();
  
          dom.find('#App').assert.countIs(1, true);
          dom.find('#App').assert.not.countIs(2, true);
          dom.find('#App').assert.countIs(2);
          dom.find('#App').assert.not.countIs(3);
        });
      });

      describe('When looking for "not" the count but the count is equal', () => {
        it('Will throw', () => {
          const dom = DOM();

          dom.find('#App').assert.countIs(1, true);
          expect(() => dom.find('#App').assert.not.countIs(1, true)).to.throw();
          dom.find('#App').assert.countIs(2);
          expect(() => dom.find('#App').assert.not.countIs(2)).to.throw();
        });
      });
    });
  });
});
  