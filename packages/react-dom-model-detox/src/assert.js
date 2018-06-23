const countIs = (element) => (count) => {
  if (element.testIDs.length !== count) {
    throw new Error(`Element count does not equal ${count}, received ${element.testIDs.length}`);
  }
}

module.exports = (element) => {
  return {
    countIs: countIs(element)
  }
}