const countIs = (element) => (count) => {
  if (element.testIDs.length !== count) {
    throw new Error(`Element count does not equal ${count}, received: ${element.testIDs.length}`);
  }
}

const textIs = (element) => (text) => {
  const elementText = element.dom.textByTestID[element.testIDs[0]];

  if (elementText !== text) {
    throw new Error(`Element text does not equal "${text}", received: ${String(elementText)}`);
  }
}

module.exports = (element) => {
  return {
    countIs: countIs(element),
    textIs: textIs(element),
  }
};