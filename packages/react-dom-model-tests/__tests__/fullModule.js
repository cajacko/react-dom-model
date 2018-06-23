const { isReady, getTreeJSON, close } = require('../packages/react-dom-model/src/index');

describe('getTreeJSON',() => {
    beforeEach(() => {
        return isReady;

    });

    afterEach(() => {
        return close();
    })

    it('Works',() => {
        const tree = getTreeJSON();
        console.log(tree);
    });
});