const { init, reloadApp, cleanup, refreshDOM } = require("react-dom-model-detox/test");
const { detox } = require("../package.json");

before(function () {
  this.timeout(60 * 1000);
  return init(detox);
});

beforeEach(() => {
  refreshDOM();
  return reloadApp();
});

after(() => {
  return cleanup();
});
