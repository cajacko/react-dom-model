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
const { DOM } = require("react-dom-model-detox/test");

describe('actions', () => {
    describe('tap', () => {
        describe('when the toggle button is tapped', () => {
            it('The text changes from yes to no', async () => {
                DOM().find('#ToggleButtonText').assert.textIs('Yes');
                await DOM().find('#ToggleButton').tap();
                DOM().find('#ToggleButtonText').assert.textIs('No');
            });
        });
    });
});
