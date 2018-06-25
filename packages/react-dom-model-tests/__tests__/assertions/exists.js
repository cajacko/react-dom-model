const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('exists', () => {
    describe('When an element exists with the selector', () => { 
        it('asserts for exists and fails for does not exist', async () => {
            const dom = DOM();
            dom.find('.exists').assert.exists();
            expect(() => dom.find('.exists').assert.not.exists()).to.throw();
        });
    });
});

describe('does not exist', () => {
    describe('When an element does not exist with the selector', () => { 
        it('asserts for does not exist and fails for exists', async () => {
            const dom = DOM();
            dom.find('.doesNotExist').assert.not.exists();
            expect(() => dom.find('.doesNotExist').assert.exists()).to.throw();
        });
    });
});
  