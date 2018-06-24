const { tap, by, element } = require("detox");

module.exports = ({ testIDs }) => ({
    tap: async () => {
      return await new Promise((resolve) => {
        element(by.id(testIDs[0])).tap().then(() => {
          // Allows the dom model time to update
          setTimeout(() => resolve(), 500);
        });
      });
    }
  });