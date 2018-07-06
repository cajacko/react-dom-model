const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('props', async () => {
    describe('propExists', async () => { 
        describe('When the prop exists', async () => {
            it('asserts for if exists and fails for does not exist', async () => {
                const element = DOM().find('#App');
                await element.assert.propExists('selectorID');
                await assert.isRejected(element.assert.not.propExists('selectorID'));
            });
        });

        describe('When the prop does not exist', async () => {
            it('asserts for if does not exists and fails for does exist', async () => {
                const element = DOM().find('#App');
                await element.assert.not.propExists('booYa');
                await assert.isRejected(element.assert.propExists('booYa'));
            });
        });
    });

    describe('propEquals', async () => {
        describe('When the prop does equal the val', async () => {
            it('asserts for propEquals and fails for not.propEquals', async () => {
                const element = DOM().find('#App');
                await element.assert.propEquals('selectorID', 'App');
                await assert.isRejected(element.assert.not.propEquals('selectorID', 'App'));
            });
        });

        describe('When the prop does not equal the val', async () => {
            it('asserts for not.propEquals and fails for propEquals', async () => {
                const element = DOM().find('#App');
                await element.assert.not.propEquals('selectorID', 'BoomDoggle');
                await assert.isRejected(element.assert.propEquals('selectorID', 'BoomDoggle'));
            });
        });

        describe('When asserting an object prop with different key order', async () => {
            it('It compares for object equality not for the same instance', async () => {
                const element = DOM().find('#App');
                await element.assert.propEquals('testProps', { second: false, first: true });
            });
        });

        describe('When no key is given', async () => {
            it('asserts against the entire props object', async () => {
                const element = DOM().find('#Text1');
                await element.assert.propEquals({
                    exampleProp: true,
                });
            });
        });
    });
});