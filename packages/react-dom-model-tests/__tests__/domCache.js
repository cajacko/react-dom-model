// When run get, can pass a flag to fetch new
// actions always reset cache when finished
// otherwise everything is cached by default

const { expect } = require('chai');
const { get, assert, setUseDOMCache, refreshDOM } = require("react-dom-model-detox/test");

describe('DOM Cache', () => {
    afterEach(() => {
        setUseDOMCache(false);
    });

    describe('When we set setUseDOMCache and get a few elements', () => {
        it('gets the same dom instance each time', () => {
            setUseDOMCache(true);

            const element1 = get('#App1');
            const element2 = get('#App2');
            const element3 = get('#App3');

            expect(element1.dom).to.equal(element2.dom);
            expect(element2.dom).to.equal(element3.dom);
        });
    });

    describe('When setUseDOMCache is false and get a few elements', () => {
        it('gets a different dom instance each time', () => {
            setUseDOMCache(false);

            const element1 = get('#App1');
            const element2 = get('#App2');
            const element3 = get('#App3');

            expect(element1.dom).to.not.equal(element2.dom);
            expect(element2.dom).to.not.equal(element3.dom);
            expect(element3.dom).to.not.equal(element1.dom);
        });
    });

    describe('When setUseDOMCache is true and get a few elements,then refresh the dom and get a few more elements', () => {
        it('The dom instances before refresh are the same, the ones after are the same, but the before and after ones are different', () => {
            setUseDOMCache(true);

            const element1 = get('#App1');
            const element2 = get('#App2');
            const element3 = get('#App3');

            expect(element1.dom).to.equal(element2.dom);
            expect(element2.dom).to.equal(element3.dom);

            refreshDOM();

            const element4 = get('#App4');
            const element5 = get('#App5');
            const element6 = get('#App6');

            expect(element4.dom).to.equal(element5.dom);
            expect(element5.dom).to.equal(element6.dom);

            expect(element1.dom).to.not.equal(element4.dom);
        });
    });
})