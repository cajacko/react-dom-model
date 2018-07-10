module.exports = (func, timeout = 5000) => {
    const startTime = Date.now();

    const attempt = () => {
      try {
        const promise = func();
        return Promise.resolve(promise).then(() => null).catch((e) => e || new Error('Undefined error'));
      } catch (e) {
        return Promise.resolve(e);
      }
    }

    const loop = () => attempt().then((error) => {
      if (!error) return Promise.resolve();

      return new Promise((resolve, reject) => setTimeout(() => {
        const now = Date.now();

        if (now - startTime > timeout) {
          const errorMessage = `waitFor exceeded timeout of ${timeout}.`;
          console.error(errorMessage);
          console.error(error);

          reject(new Error(`${errorMessage} Check logs above for more info`));
          return;
        }

        return loop().then(resolve).catch(reject);
      }, 300));
    });

    return loop();
  }