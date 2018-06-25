const { DOM } = require("react-dom-model-detox/test");

// Type
// nth-child
// Children chain
// Same node chain
// Complex combinations

describe('selectors', () => {
  describe('id\'s', () => {
    describe('When we get a single ID that exists', () => {
      it('returned length is 1', () => {
        DOM().find('#App').assert.countIs(1, true);
      });
    });

    describe('When we get a single ID that does not exist', () => {
      it('returned length is 0', () => {
        DOM().find('#DoesNotExist').assert.countIs(0, true);
      });
    });
  });

  describe('classes', () => {
    describe('When we get a single class with multiple elements found', () => {
      it('returns a length of 2', () => {
        DOM().find('.twoClassesExample').assert.countIs(2, true);
      });
    });

    describe('When we get a single class with no elements found', () => {
      it('returns a length of 0', () => {
        DOM().find('.noClasses').assert.countIs(0);
      });
    });
  });

  describe('type', () => {
    describe('When we get a type with an element found', () => {
      it('returns a length of 1', () => {
        DOM().find('App').assert.countIs(1);
      });
    });

    describe('When we get a type with no elements found', () => {
      it('returns a length of 0', () => {
        DOM().find('UnknownType').assert.countIs(0);
      });
    });
  })
});
