const { expect, assert } = require('chai');
const { DOM } = require("react-dom-model-detox/test");

describe('getProps', async () => {
    describe('When we get props for a single element',  () => {
        it('Returns an object with the props', async () => {
            const props = DOM().find('ScrollView#App').getProps();

            delete props.children;
            delete props.contentContainerStyle;
            delete props.style;
            delete props.testID;

            expect(props).to.deep.equal({
                selectorClasses: ['visibleAtFirst', 'exists'],
                selectorID: 'App',
                testProps: {
                    first: true,
                    second: false
                }
            });
        });
    });

    describe('When we get props for multiple elements',  () => {
        it('throws', () => {
            expect(() => DOM().find('#App').getProps()).to.throw();
        });
    });

    describe('When we get props for multiple elements with allowMultiple set to true', async () => {
        it('Returns an array of props', async () => {
            const props = DOM().find('#App').getProps(true);

            props.forEach((prop, i) => {
                delete props[i].children;
                delete props[i].contentContainerStyle;
                delete props[i].style;
                delete props[i].testID;
            });

            expect(props[0]).to.deep.equal({
                selectorClasses: ['visibleAtFirst', 'exists'],
                selectorID: 'App',
                testProps: {
                    first: true,
                    second: false
                }
            });

            expect(Array.isArray(props)).to.be.true;
            expect(props.length).to.equal(2);
        });
    });

    describe('When we get props when no elements exist', async () => {
        it('Throws an error', async () => {
            expect(() => DOM().find('#DoesNotExist').getProps()).to.throw();
        })
    });
}); 