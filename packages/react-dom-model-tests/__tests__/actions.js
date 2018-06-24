// react-dom-model-detox

// tap
// scroll
// scrollTo
// typeText
// multiTap
// longPress
// tapAtPoint
// replaceText
// clearText
// swipe

const { expect } = require('chai');
const { get, assert } = require("react-dom-model-detox/test");

describe('actions', () => {
    describe('tap', () => {
        describe('when the toggle button is tapped', () => {
            it('The text changes from yes to no', async () => {
                assert(get('#ToggleButtonText')).textIs('Yes');
                await get('#ToggleButton').tap();
                assert(get('#ToggleButtonText')).textIs('No');
            });
        });
    });
});
