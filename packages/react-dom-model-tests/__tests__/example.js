const { get } = require("react-dom-model-detox/test");

describe('Detox', () => {
  it('works', () => {
    expect(get('#App').length).toBe(1);
  });
});
