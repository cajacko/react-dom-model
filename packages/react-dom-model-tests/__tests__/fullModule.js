const { isReady, getTreeJSON, close } = require('react-dom-model');

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