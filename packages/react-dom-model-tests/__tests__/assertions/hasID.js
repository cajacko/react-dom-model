const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('hasID', async () => {
    // TODO: When have single selectors
    // describe('When a single element has the ID', async () => {
    //     it('Asserts for hasID and fails for not.hasID', async () => {
    //         const element = DOM().find('#App');

    //         element.assert.countIs(1);
    //         element.assert.hasID('App');
    //         await assert.isRejected(element.assert.not.hasID('App'));
    //     });
    // });

    // describe('When a single element does not have the ID', async () => {
    //     it('Fails for hasID and asserts for not.hasID', async () => {
    //         const element = DOM().find('#App');

    //         element.assert.countIs(1);
    //         element.assert.not.hasID('NoID');
    //         await assert.isRejected(element.assert.hasID('NoID'));
    //     });
    // });

    describe('When a single element has the ID in a multiple selection', async () => {
        it('Asserts for hasID and fails for not.hasID', async () => {
            const element = DOM().find('#App');

            expect(element.getCount() > 1).to.be.true;
            await element.assert.hasID('App');
            await assert.isRejected(element.assert.not.hasID('App'));
        });
    });

    describe('When a single element does not have the ID in a multiple selection', async () => {
        it('Fails for hasID and asserts for not.hasID', async () => {
            const element = DOM().find('#App');

            expect(element.getCount() > 1).to.be.true;
            await element.assert.not.hasID('NoID');
            await assert.isRejected(element.assert.hasID('NoID'));
        });
    });
});
