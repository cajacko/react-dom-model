const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('textIs', () => {
    describe('When we check for text that is correct', () => {
        it('textIs asserts and not.textIs throws', async () => {
            const element = DOM().find('#ToggleButtonText');

            element.assert.textIs('Yes');
            expect(() => element.assert.not.textIs('Yes')).to.throw();
        });
    });

    describe('When we check for text that is not correct', () => {
        it('textIs throws and not.textIs asserts', async () => {
            const element = DOM().find('#ToggleButtonText');

            element.assert.not.textIs('No');
            expect(() => element.assert.textIs('No')).to.throw();
        });
    });
});
