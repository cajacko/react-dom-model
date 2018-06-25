const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('visibility', () => {
    describe('isVisible', () => { 
        describe('When the element is visible', () => {
            it('not.isVisible has and error and isVisible has no error', async () => {
                await DOM().find('.visibleAtFirst').assert.isVisible();
                await assert.isRejected(DOM().find('.visibleAtFirst').assert.not.isVisible());
            });
        });
    });

    describe('not.isVisible', () => { 
        describe('When the element is not visible', () => {
            it('not.isVisible has no error and isVisible has an error', async () => {
                await DOM().find('.notVisibleAtFirst').assert.not.isVisible();
                await assert.isRejected(DOM().find('.notVisibleAtFirst').assert.isVisible());
            });
        });

        describe('When the element does not exist', () => {
            it('stills asserts as true', async () => {
                await DOM().find('#DoesNotExist').assert.not.isVisible();
            });
        });
    });
});
  