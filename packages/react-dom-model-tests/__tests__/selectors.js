const { DOM } = require("react-dom-model-detox/test");

describe('selectors', async () => {
  describe('id\'s', async () => {
    describe('When we get a single ID that exists', async () => {
      it('returned length is 1', async () => {
        await DOM().find('#App').assert.countIs(1, true);
      });
    });

    describe('When we get a single ID that does not exist', async () => {
      it('returned length is 0', async () => {
        await DOM().find('#DoesNotExist').assert.countIs(0, true);
      });
    });
  });

  describe('classes', async () => {
    describe('When we get a single class with multiple elements found', async () => {
      it('returns a length of 2', async () => {
        await DOM().find('.twoClassesExample').assert.countIs(2, true);
      });
    });

    describe('When we get a single class with no elements found', async () => {
      it('returns a length of 0', async () => {
        await DOM().find('.noClasses').assert.countIs(0);
      });
    });
  });

  describe('type', async () => {
    describe('When we get a type with an element found', async () => {
      it('returns a length of 1', async () => {
        await DOM().find('App').assert.countIs(1);
      });
    });

    describe('When we get a type with no elements found', async () => {
      it('returns a length of 0', async () => {
        await DOM().find('UnknownType').assert.countIs(0);
      });
    });
  });

  // TODO: Check it fails
  describe('nth-child', async () => {
    describe('When we get a match that is the 2nd child', async () => {
      it('Count is 1 and has the expected ID', async () => {
        const element = DOM().find('.twoClassesExample:nth-child(2)');
        await element.assert.countIs(1);
        await element.assert.hasID('Text2');
      });
    })
  })

  describe('Combining selectors on the same  node', async () => {
    describe('When we combine a type and an ID', async () => {
      it('Count is 1 and has the expected ID', async () => {
        const element = DOM().find('ScrollView#App');
        await element.assert.countIs(1);
        await element.assert.hasID('App');
      });
    });

    // TODO:
    // Type#ID
    // Type#ID.class
    // Type#ID.class.class
    // Type.class 
    // Type.class.class
    // Type.class#ID
    // Type.class#ID.class
    // #ID.class
    // #ID.class.class
    // .class#ID
    // .class#ID.class
    // .class.class
    // .class.class#ID
  });

  describe('Nested selectors', async () => {
    describe('When we nest classes', async () => {
      it('Count is 1 and has the expected ID', async () => {
        const element = DOM().find('.parentClass .childClass');
        await element.assert.countIs(1, true);
        await element.assert.hasID('childClassID1');
      });
    })

    // TODO:
    // Type Type
    // Type Type Type
    // Type Type .class
    // Type Type #ID
    // Type .class
    // Type .class Type
    // Type .class .class
    // Type .class #ID
    // Type #ID
    // Type #ID Type
    // Type #ID .class
    // Type #ID #ID
    // .class Type
    // .class Type Type
    // .class Type .class
    // .class Type #ID
    // .class .class
    // .class .class Type
    // .class .class .class
    // .class .class #ID
    // .class #ID
    // .class #ID Type
    // .class #ID .class
    // .class #ID #ID
    // #ID Type
    // #ID Type Type
    // #ID Type .class
    // #ID Type #ID
    // #ID .class Type
    // #ID .class .class
    // #ID .class #ID
    // #ID #ID Type
    // #ID #ID .class
    // #ID #ID #ID
  });

  // TODO: Mix of all selectors
  // Normal Combined
  // Normal Combined Normal
  // Normal Combined Combined
  // Normal Combined Nth
  // Normal Nth
  // Normal Nth Normal
  // Normal Nth Combined
  // Normal Nth Nth
  // Combined Normal
  // Combined Normal Normal
  // Combined Normal Combined
  // Combined Normal Nth
  // Combined Nth
  // Combined Nth Normal
  // Combined Nth Combined
  // Combined Nth Nth
  // Nth Normal
  // Nth Normal Normal
  // Nth Normal Combined
  // Nth Normal Nth
  // Nth Combined
  // Nth Combined Normal
  // Nth Combined Combined
  // Nth Combined Nth
  // Nth Nth
  // Nth Nth Normal
  // Nth Nth Combined
  // Nth Nth Nth
});
