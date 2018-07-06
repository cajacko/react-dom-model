const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('exists', async () => {
    describe('When an element exists with the selector', async () => { 
        it('asserts for exists and fails for does not exist', async () => {
            const dom = DOM();
            await dom.find('.exists').assert.exists();
            await assert.isRejected(dom.find('.exists').assert.not.exists());
        });
    });
});

describe('does not exist', async () => {
    describe('When an element does not exist with the selector', async () => { 
        it('asserts for does not exist and fails for exists', async () => {
            const dom = DOM();
            await dom.find('.doesNotExist').assert.not.exists();
            await assert.isRejected(dom.find('.doesNotExist').assert.exists());
        });
    });
});
  