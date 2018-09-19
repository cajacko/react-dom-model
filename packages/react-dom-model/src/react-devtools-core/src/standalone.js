var ws = require('ws');
var Store = require('../../react-devtools/frontend/Store');
var Bridge = require('../../react-devtools/agent/Bridge');
const { setStore } = require('../../index');
const { storeHasDisconnected, storeHasConnected, reactHasConnected, reactHasDisconnected } = require('../../connections');

function reload(wall) {
  storeHasDisconnected();
  const _bridge = new Bridge(wall);
  const _store = new Store(_bridge);

  setStore(_store);

  _store.on('connected', () => {
    storeHasConnected();
    reactHasConnected();
  });
}

function onDisconnected() {
  reactHasDisconnected();
  // console.log('waiting for react to connect');
}

function onError(e) {
  var message;

  if (e.code === 'EADDRINUSE') {
    message = 'Another instance of DevTools is running';
  } else {
    message = `Unknown error (${e.message})`;
  }
}

function initialize(socket) {
  var listeners = [];
  socket.onmessage = evt => {
    var data = JSON.parse(evt.data);
    listeners.forEach(fn => fn(data));
  };

  const wall = {
    listen(fn) {
      listeners.push(fn);
    },
    send(data) {
      if (socket.readyState === socket.OPEN) {
        socket.send(JSON.stringify(data));
      }
    },
    disconnect() {
      socket.close();
    },
  };

  reload(wall);
}

var restartTimeout = null;
var terminateAll = {};
var serverID = 0;

function startServer(port = 8097) {
  var thisServerID = serverID;
  serverID += 1;
  var httpServer = require('http').createServer();
  var server = new ws.Server({ server: httpServer });
  var connected = false;

  server.on('connection', socket => {
    if (connected) {
      connected.terminate();
      // console.warn(
      //   'Only one connection allowed at a time.',
      //   'Closing the previous connection'
      // );
    }

    connected = socket;
    socket.onerror = err => {
      connected.terminate();
      connected = false;
      onDisconnected();
      // console.error('Error with websocket connection', err);
    };
    socket.onclose = () => {
      connected = false;
      onDisconnected();
      // console.log('Connection to RN closed');
    };
    initialize(socket);
  });

  server.on('error', e => {
    onError(e);
    // console.error('Failed to start the DevTools server', e);
    restartTimeout = setTimeout(() => {
      terminate();
      startServer(port);
    }, 1000);
  });

  var httpConnections = {};
  var httpConnectionID = 0;

  httpServer.on('connection', connection => {
    var id = httpConnectionID;
    httpConnectionID += 1;
    
    httpConnections[id] = connection;

    connection.on('close', () => {
      delete httpConnections[id];
    });
  });

  var terminate = () => {
    delete terminateAll[thisServerID];
    return new Promise((resolve, reject) => {
      try {
        connected = false;
        onDisconnected();
        clearTimeout(restartTimeout);
        var hasClosedHttpServer = false;
        var hasClosedServer = false;
        var hasClosedConnection = false;
        var hasClosedHttpConnections = false;

        var resolveIfAllClosed = () => {
          if (hasClosedHttpServer || hasClosedServer || hasClosedConnection || hasClosedHttpConnections) resolve();
        }

        Object.keys(httpConnections).forEach((id) => {
          var connection = httpConnections[id];
          hasClosedHttpConnections = true;
          connection.end();
          connection.destroy();
          resolveIfAllClosed();
          delete httpConnections[id];
        });

        httpServer.close(() => {
          hasClosedHttpServer = true;
          resolveIfAllClosed();
        });

        if (connected) {
          connected.terminate();

          hasClosedConnection = true;
            resolveIfAllClosed();
        } else {
          hasClosedConnection = true;
          resolveIfAllClosed();
        }

        server.close(() => {
          hasClosedServer = true;
          resolveIfAllClosed();
        });
      } catch(e) {
        reject(e);
      }
    });
  }

  terminateAll[thisServerID] = terminate;

  httpServer.on('error', e => {
    onError(e);
    restartTimeout = setTimeout(() => {
      terminate();
      startServer(port);
    }, 1000);
  });

  httpServer.listen(port);

  return {
    close: function() {
      const promises = [];

      Object.values(terminateAll).forEach((func) => {
        promises.push(func());
      });

      return Promise.all(promises);
    },
  };
}

const { close } = startServer(process.env.PORT || 8097);

module.exports = () => {
  return close();
}