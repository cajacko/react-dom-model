const { init, device, cleanup, element, by, expect } = require("detox");
// const { isReady, getTreeJSON, close } = require('react-dom-model');

describe('Detox', () => {
  it('works', () => {
    return expect(element(by.id('testID'))).toBeVisible();
  });
})

// describe("getTreeJSON", () => {
//   beforeEach(() => {
//     return isReady;
//   });

//   afterEach(() => {
//     return close();
//   });

//   it("Works", () => {
//     const tree = getTreeJSON();
//     console.log(tree);
//   });
// });
