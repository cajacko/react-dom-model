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

const { DOM } = require("react-dom-model-detox/test");

describe('actions', async () => {
    describe('tap', async () => {
        describe('when the toggle button is tapped', async () => {
            it('The text changes from yes to no', async () => {
                await DOM().find('#ToggleButtonText').assert.textIs('Yes');
                await DOM().find('#ToggleButton').tap();
                await DOM().find('#ToggleButtonText').assert.textIs('No');
            });
        });
    });
});
