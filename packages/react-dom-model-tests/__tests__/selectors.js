const { DOM } = require("react-dom-model-detox/test");

// Same node chain
// Children chain
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
  });

  // TODO: More combinations with this
  describe('nth-child', () => {
    describe('When we get a match that is the 2nd child', () => {
      it('Count is 1 and has the expected ID', () => {
        const element = DOM().find('.twoClassesExample:nth-child(2)');
        element.assert.countIs(1);
        element.assert.hasID('Text2');
      });
    })
  })

  // TODO: More of these
  describe('Combining selectors on the same  node', () => {
    describe('When we combine a type and an ID', () => {
      it('Count is 1 and has the expected ID', () => {
        const element = DOM().find('ScrollView#App');
        element.assert.countIs(1);
      });
    })
  });
});
