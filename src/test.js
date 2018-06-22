const { isReady, getTreeJSON } = require('./process');

console.warn('init');

if(isReady) {
  console.warn('isReady exists');
  
  isReady.then(() => {
    console.warn('is ready');

    console.warn('TreeXML', getTreeJSON());

    setInterval(() => {
      console.warn('TreeXML', getTreeJSON());
    }, 3000);
  });
} else {
  console.warn('isReady does not exist');
}