const { expect } = require('chai');
const { get, assert } = require("react-dom-model-detox/test");

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
// .elementClass:nth-child(2)

describe('selectors', () => {
  describe('id\'s', () => {
    describe('When we get a single ID that exists', () => {
      it('returned length is 1', () => {
        assert(get('#App')).countIs(1);
      });
    });

    describe('When we get a single ID that does not exist', () => {
      it('returned length is 0', () => {
        assert(get('#DoesNotExist')).countIs(0);
      });
    });
  });
});
