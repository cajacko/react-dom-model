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

    describe('propEquals', () => {
        describe('When the prop does equal the val', () => {
            it('asserts for propEquals and fails for not.propEquals', async () => {
                const element = DOM().find('#App');
                element.assert.propEquals('selectorID', 'App');
                expect(() => element.assert.not.propEquals('selectorID', 'App')).to.throw();
            });
        });

        describe('When the prop does not equal the val', () => {
            it('asserts for not.propEquals and fails for propEquals', async () => {
                const element = DOM().find('#App');
                element.assert.not.propEquals('selectorID', 'BoomDoggle');
                expect(() => element.assert.propEquals('selectorID', 'BoomDoggle')).to.throw();
            });
        });

        describe('When asserting an object prop with different key order', () => {
            it('It compares for object equality not for the same instance', async () => {
                const element = DOM().find('#App');
                element.assert.propEquals('testProps', { second: false, first: true, });
            });
        });
    });
});