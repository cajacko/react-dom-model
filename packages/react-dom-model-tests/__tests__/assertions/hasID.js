const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('hasID', () => {
    // TODO: When have single selectors
    // describe('When a single element has the ID', () => {
    //     it('Asserts for hasID and fails for not.hasID', () => {
    //         const element = DOM().find('#App');

    //         element.assert.countIs(1);
    //         element.assert.hasID('App');
    //         expect(() => element.assert.not.hasID('App')).to.throw();
    //     });
    // });

    // describe('When a single element does not have the ID', () => {
    //     it('Fails for hasID and asserts for not.hasID', () => {
    //         const element = DOM().find('#App');

    //         element.assert.countIs(1);
    //         element.assert.not.hasID('NoID');
    //         expect(() => element.assert.hasID('NoID')).to.throw();
    //     });
    // });

    describe('When a single element has the ID in a multiple selection', () => {
        it('Asserts for hasID and fails for not.hasID', () => {
            const element = DOM().find('#App');

            expect(element.getCount() > 1).to.be.true;
            element.assert.hasID('App');
            expect(() => element.assert.not.hasID('App')).to.throw();
        });
    });

    describe('When a single element does not have the ID in a multiple selection', () => {
        it('Fails for hasID and asserts for not.hasID', () => {
            const element = DOM().find('#App');

            expect(element.getCount() > 1).to.be.true;
            element.assert.not.hasID('NoID');
            expect(() => element.assert.hasID('NoID')).to.throw();
        });
    });
});
