const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('props', () => {
    describe('propExists', () => { 
        describe('When the prop exists', () => {
            it('asserts for if exists and fails for does not exist', async () => {
                const element = DOM().find('#App');
                element.assert.propExists('selectorID');
                expect(() => element.assert.not.propExists('selectorID')).to.throw();
            });
        });

        describe('When the prop does not exist', () => {
            it('asserts for if does not exists and fails for does exist', async () => {
                const element = DOM().find('#App');
                element.assert.not.propExists('booYa');
                expect(() => element.assert.propExists('booYa')).to.throw();
            });
        });
    });
});