module.exports = (func, timeout = 5000) => {
  const startTime = Date.now();

  const attempt = () => {
    try {
      const promise = func();
      return Promise.resolve(promise)
        .then(() => null)
        .catch(e => e || new Error('Undefined error'));
    } catch (e) {
      return Promise.resolve(e);
    }
  };

  let ended = false;

  const loop = () =>
    attempt().then(error => {
      if (ended) return Promise.resolve();
      if (!error) return Promise.resolve();

      return new Promise((resolve, reject) =>
        setTimeout(
          () =>
            loop()
              .then(resolve)
              .catch(reject),
          300
        )
      );
    });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      ended = true;
      reject(new Error(`waitFor exceeded timeout of ${timeout}.`));
    }, timeout);

    loop()
      .then(resolve)
      .catch(reject);
  });
};
