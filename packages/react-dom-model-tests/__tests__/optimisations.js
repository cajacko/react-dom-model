const { get, assert } = require("react-dom-model-detox/test");

describe('Optimisations', () => {
    describe('When we use the "then" prop from the get func', () => {
    it('gets the same dom instance', () => {
        const { dom } = get('#App');
        let nextDom = null;

        return get('#App').then((element, nextGet) => {
            nextDom = element.dom;

            expect(!!nextDom).toBe(true);
            expect(nextDom).not.toBe(dom);

            return nextGet('#App');
        }).then((element, nextGet) => {

            expect(element.dom).toBe(nextDom);
            expect(element.dom).not.toBe(dom);
        });
    });
});
})