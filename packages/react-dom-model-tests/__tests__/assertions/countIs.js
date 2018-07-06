const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('countIs', async () => {
  describe('When counting the nodes', async () => {
    it('The returned count is correct and higher that counting grouped by testID', async () => {
      const dom = DOM();

      await dom.find('#App').assert.countIs(1, true);
      await dom.find('#App').assert.countIs(2);
    });
  });

  describe('When counting nodes with a specific selector', async () => {
      it('Has a count of 1', async () => {
        await DOM().find('ScrollView#App').assert.countIs(1);
      });
  });

  describe('not', async () => {
    describe('When looking for the count', async () => {
      it('assert.countIs passes and assert.not.countIs passes with a different val', async () => {
        const dom = DOM();

        await dom.find('#App').assert.countIs(1, true);
        await dom.find('#App').assert.not.countIs(2, true);
        await dom.find('#App').assert.countIs(2);
        await dom.find('#App').assert.not.countIs(3);
      });
    });

    describe('When looking for "not" the count but the count is equal', async () => {
      it('Will throw', async () => {
        const dom = DOM();

        await dom.find('#App').assert.countIs(1, true);
        await assert.isRejected(dom.find('#App').assert.not.countIs(1, true));
        await dom.find('#App').assert.countIs(2);
        await assert.isRejected(dom.find('#App').assert.not.countIs(2));
      });
    });
  });
});
