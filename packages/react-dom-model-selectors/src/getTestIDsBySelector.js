module.exports = (selector, { testIDsBySelectorID }) => {
    const testIDs = [];
  
    if (selector.includes('#')) {
      const id = selector.replace('#', '');
  
      if (testIDsBySelectorID[id]) return testIDsBySelectorID[id];
  
      return testIDs;
    }
  
    return testIDs;
  }