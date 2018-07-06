const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('textIs', async () => {
    describe('When we check for text that is correct', async () => {
        it('textIs asserts and not.textIs throws', async () => {
            const element = DOM().find('#ToggleButtonText');

            await element.assert.textIs('Yes');
            await assert.isRejected(element.assert.not.textIs('Yes'));
        });
    });

    describe('When we check for text that is not correct', async () => {
        it('textIs throws and not.textIs asserts', async () => {
            const element = DOM().find('#ToggleButtonText');

            await element.assert.not.textIs('No');
            await assert.isRejected(element.assert.textIs('No'));
        });
    });
});
