const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('state', () => {
    describe('stateKeyExists', () => { 
        describe('When the state key exists', () => {
            it('asserts for if exists and fails for does not exist', async () => {
                const element = DOM().find('App');
                element.assert.stateKeyExists('toggleButtonState');
                expect(() => element.assert.not.stateKeyExists('toggleButtonState')).to.throw();
            });
        });

        describe('When the state key does not exist', () => {
            it('asserts for if does not exists and fails for does exist', async () => {
                const element = DOM().find('App');
                element.assert.not.stateKeyExists('booYa');
                expect(() => element.assert.stateKeyExists('booYa')).to.throw();
            });
        });
    });

    describe('stateEquals', () => {
        describe('When the state prop does equal the val', () => {
            it('asserts for stateEquals and fails for not.stateEquals', async () => {
                const element = DOM().find('App');
                element.assert.stateEquals('toggleButtonState', true);
                expect(() => element.assert.not.stateEquals('toggleButtonState', true)).to.throw();
            });
        });

        describe('When the state prop does not equal the val', () => {
            it('asserts for not.stateEquals and fails for stateEquals', async () => {
                const element = DOM().find('App');
                element.assert.not.stateEquals('toggleButtonState', 'BoomDoggle');
                expect(() => element.assert.stateEquals('toggleButtonState', 'BoomDoggle')).to.throw();
            });
        });

        describe('When asserting an object state prop with different key order', () => {
            it('It compares for object equality not for the same instance', async () => {
                const element = DOM().find('App');
                element.assert.stateEquals('testState', { second: false, first: true, });
            });
        });

        describe('When no key is given', () => {
            it('asserts against the entire state object', async () => {
                const element = DOM().find('App');
                element.assert.stateEquals({
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