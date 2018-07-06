const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('hasClass', async () => {
    describe('When a single element has a class', async () => {
        it('Asserts for hasClass and fails for not.hasClass', async () => {
            const element = DOM().find('Text.text1Class');

            await element.assert.countIs(1);
            await element.assert.hasClass('twoClassesExample');
            await assert.isRejected(element.assert.not.hasClass('twoClassesExample'));
        });
    });

    describe('When a single element does not have a class', async () => {
        it('Fails for hasClass and asserts for not.hasClass', async () => {
            const element = DOM().find('Text.text1Class');

            await element.assert.countIs(1);
            await element.assert.not.hasClass('notAClass');
            await assert.isRejected(element.assert.hasClass('notAClass'));
        });
    });

    describe('When a single element has a class in a multiple selection', async () => {
        it('Asserts for hasClass and fails for not.hasClass', async () => {
            const element = DOM().find('.twoClassesExample');

            expect(element.getCount() > 1).to.be.true;
            await element.assert.hasClass('twoClassesExample');
            await assert.isRejected(element.assert.not.hasClass('twoClassesExample'));
        });
    });

    describe('When a single element does not have a class in a multiple selection', async () => {
        it('Fails for hasClass and asserts for not.hasClass', async () => {
            const element = DOM().find('.twoClassesExample');

            expect(element.getCount() > 1).to.be.true;
            await element.assert.not.hasClass('notAClass');
            await assert.isRejected(element.assert.hasClass('notAClass'));
        });
    });
});
