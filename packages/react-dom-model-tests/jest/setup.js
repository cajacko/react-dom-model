const { init, reloadApp, cleanup } = require("react-dom-model-detox/test");
const { detox } = require("../package.json");

beforeAll(() => {
  return init(detox);
},60 * 1000);

beforeEach(() => reloadApp());

afterAll(() => cleanup());
