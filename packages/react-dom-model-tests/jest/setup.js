const { init, device, cleanup } = require("detox");
const { detox } = require("../package.json");

beforeAll(() => {
  return init(detox, {
    initGlobals: false,
    launchApp: true
  });
},60 * 1000);

beforeEach(() => device.reloadReactNative());

afterAll(() => cleanup());
