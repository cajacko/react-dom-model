const { init, reloadApp, cleanup } = require("react-dom-model-detox/test");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
const { detox } = require("../package.json");

chai.should();
chai.use(chaiAsPromised);

process.on("unhandledRejection", () => {
  // Do nothing; we test these all the time.
});

process.on("rejectionHandled", () => {
  // Do nothing; we test these all the time.
});

before(function () {
  this.timeout(5 * 60 * 1000);
  return init(detox);
});

beforeEach(() => {
  return reloadApp();
});

after(() => {
  return cleanup();
});
