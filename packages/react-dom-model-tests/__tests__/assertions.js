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
      })
    });
  });
  