let reactIsLoaded = false;
let storeIsLoaded = false;
let whenStoreHasLoaded = null;
let whenReactHasLoaded = null;
let resolvePromise = null;
let isReadyPromise = null;

const isReady = () => reactIsLoaded && storeIsLoaded;
const resolvers = [];

const resolvePromises = () => {
  console.log('react-dom-model - 8');
  resolvers.forEach((resolve) => {
    console.log('react-dom-model - 9');
    resolve();
  });
};

const setIsReadyPromise = () => {
  console.log('react-dom-model - 10');
  isReadyPromise = new Promise((resolve) => {
    console.log('react-dom-model - 11');
    if (isReady()) {
      console.log('react-dom-model - 12');
      resolvePromises();
    } else {
      console.log('react-dom-model - 13');
    }

    resolvers.push(() => {
      console.log('react-dom-model - 14');
      resolve();
    });
  });
}

setIsReadyPromise();

const resolveIfReady = () => {
  console.log('react-dom-model - 15');
  if (isReady()) {
    console.log('react-dom-model - 16');
    resolvePromises();
  } else {
    console.log('react-dom-model - 17');
  }
}

exports.storeHasDisconnected = () => {
  console.log('react-dom-model - 18');
  storeIsLoaded = false;
  setIsReadyPromise();
};

exports.storeHasConnected = () => {
  console.log('react-dom-model - 19');
  storeIsLoaded = true;
  resolveIfReady();
};

exports.reactHasConnected = () => {
  console.log('react-dom-model - 20');
  reactIsLoaded = true;
  resolveIfReady();
};

exports.reactHasDisconnected = () => {
  console.log('react-dom-model - 21');
  reactIsLoaded = false;
  setIsReadyPromise();
};

exports.waitForIsReady = () => {
  console.log('react-dom-model - 22');
  if (isReadyPromise) {
    console.log('react-dom-model - 23');
    return isReadyPromise;
  } else {
    console.log('react-dom-model - 24');
    return Promise.reject(new Error('isReadyPromise is not a promise!'));
  }
}

exports.isReady = isReady;