let reactIsLoaded = false;
let storeIsLoaded = false;
let whenStoreHasLoaded = null;
let whenReactHasLoaded = null;
let resolvePromise = null;
let isReadyPromise = null;

const isReady = () => reactIsLoaded && storeIsLoaded;
const resolvers = [];

const resolvePromises = () => {
  resolvers.forEach((resolve) => {
    resolve();
  });
};

const setIsReadyPromise = () => {
  isReadyPromise = new Promise((resolve) => {
    if (isReady()) {
      resolvePromises();
    } else {
    }

    resolvers.push(() => {
      resolve();
    });
  });
}

setIsReadyPromise();

const resolveIfReady = () => {
  if (isReady()) {
    resolvePromises();
  }
}

exports.storeHasDisconnected = () => {
  storeIsLoaded = false;
  setIsReadyPromise();
};

exports.storeHasConnected = () => {
  storeIsLoaded = true;
  resolveIfReady();
};

exports.reactHasConnected = () => {
  reactIsLoaded = true;
  resolveIfReady();
};

exports.reactHasDisconnected = () => {
  reactIsLoaded = false;
  setIsReadyPromise();
};

exports.waitForIsReady = () => {
  if (isReadyPromise) {
    return isReadyPromise;
  } else {
    return Promise.reject(new Error('isReadyPromise is not a promise!'));
  }
}

exports.isReady = isReady;