const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('hasClass', () => {
    describe('When a single element has a class', () => {
        it('Asserts for hasClass and fails for not.hasClass', () => {
            const element = DOM().find('Text.text1Class');

            element.assert.countIs(1);
            element.assert.hasClass('twoClassesExample');
            expect(() => element.assert.not.hasClass('twoClassesExample')).to.throw();
        });
    });

    describe('When a single element does not have a class', () => {
        it('Fails for hasClass and asserts for not.hasClass', () => {
            const element = DOM().find('Text.text1Class');

            element.assert.countIs(1);
            element.assert.not.hasClass('notAClass');
            expect(() => element.assert.hasClass('notAClass')).to.throw();
        });
    });

    describe('When a single element has a class in a multiple selection', () => {
        it('Asserts for hasClass and fails for not.hasClass', () => {
            const element = DOM().find('.twoClassesExample');

            expect(element.getCount() > 1).to.be.true;
            element.assert.hasClass('twoClassesExample');
            expect(() => element.assert.not.hasClass('twoClassesExample')).to.throw();
        });
    });

    describe('When a single element does not have a class in a multiple selection', () => {
        it('Fails for hasClass and asserts for not.hasClass', () => {
            const element = DOM().find('.twoClassesExample');

            expect(element.getCount() > 1).to.be.true;
            element.assert.not.hasClass('notAClass');
            expect(() => element.assert.hasClass('notAClass')).to.throw();
        });
    });
});
