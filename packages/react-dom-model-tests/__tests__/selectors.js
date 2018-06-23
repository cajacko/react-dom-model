const { get } = require("react-dom-model-detox/test");

// #elementID
// #elementID.elementClass
// #elementID .elementClass
// #elementID ComponentType
// #elementID.elementClass ComponentType
// #elementID ComponentType.elementClass
// #elementID ComponentType .elementClass
// .elementClass
// .elementClass.elementClass2
// .elementClass .elementClass2
// .elementClass ComponentType
// .elementClass #elementID
// .elementClass#elementID
// .elementClass ComponentType#elementID
// .elementClass ComponentType #elementID
// ComponentType
// ComponentType.elementClass
// ComponentType#elementID
// ComponentType .elementClass

describe('selectors', () => {
  describe('id\'s', () => {
    describe('When we get a single ID that exists', () => {
      it('returned length is 1', () => {
        expect(get('#App').length).toBe(1);
      });
    });

    describe('When we get a single ID that does not exist', () => {
      it('returned length is 0', () => {
        expect(get('#DoesNotExist').length).toBe(0);
      });
    });
  });
});
