const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('state', async () => {
    describe('stateKeyExists', async () => { 
        describe('When the state key exists', async () => {
            it('asserts for if exists and fails for does not exist', async () => {
                const element = DOM().find('App');
                await element.assert.stateKeyExists('toggleButtonState');
                await assert.isRejected(element.assert.not.stateKeyExists('toggleButtonState'));
            });
        });

        describe('When the state key does not exist', async () => {
            it('asserts for if does not exists and fails for does exist', async () => {
                const element = DOM().find('App');
                await element.assert.not.stateKeyExists('booYa');
                await assert.isRejected(element.assert.stateKeyExists('booYa'));
            });
        });
    });

    describe('stateEquals', async () => {
        describe('When the state prop does equal the val', async () => {
            it('asserts for stateEquals and fails for not.stateEquals', async () => {
                const element = DOM().find('App');
                await element.assert.stateEquals('toggleButtonState', true);
                await assert.isRejected(element.assert.not.stateEquals('toggleButtonState', true));
            });
        });

        describe('When the state prop does not equal the val', async () => {
            it('asserts for not.stateEquals and fails for stateEquals', async () => {
                const element = DOM().find('App');
                await element.assert.not.stateEquals('toggleButtonState', 'BoomDoggle');
                await assert.isRejected(element.assert.stateEquals('toggleButtonState', 'BoomDoggle'));
            });
        });

        describe('When asserting an object state prop with different key order', async () => {
            it('It compares for object equality not for the same instance', async () => {
                const element = DOM().find('App');
                await element.assert.stateEquals('testState', { second: false, first: true, });
            });
        });

        describe('When no key is given', async () => {
            it('asserts against the entire state object', async () => {
                const element = DOM().find('App');
                await element.assert.stateEquals({
                    toggleButtonState: true,
                    testState: {
                        first: true,
                        second: false, 
                    }
                });
            });
        });
    });
});