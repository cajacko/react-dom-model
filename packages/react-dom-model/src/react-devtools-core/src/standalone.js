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
  console.log('waiting for react to connect');
}

function onError(e) {
  var message;

  if (e.code === 'EADDRINUSE') {
    message = 'Another instance of DevTools is running';
  } else {
    message = `Unknown error (${e.message})`;
  }

  console.log(message);
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

  console.log('Connected');
  reload(wall);
}

var restartTimeout = null;

function startServer(port = 8097) {
  var httpServer = require('http').createServer();
  var server = new ws.Server({ server: httpServer });
  var connected = false;
  server.on('connection', socket => {
    if (connected) {
      connected.close();
      console.warn(
        'Only one connection allowed at a time.',
        'Closing the previous connection'
      );
    }
    connected = socket;
    socket.onerror = err => {
      connected = false;
      onDisconnected();
      console.error('Error with websocket connection', err);
    };
    socket.onclose = () => {
      connected = false;
      onDisconnected();
      console.log('Connection to RN closed');
    };
    initialize(socket);
  });

  server.on('error', e => {
    onError(e);
    console.error('Failed to start the DevTools server', e);
    restartTimeout = setTimeout(() => startServer(port), 1000);
  });

  httpServer.on('error', e => {
    onError(e);
    restartTimeout = setTimeout(() => startServer(port), 1000);
  });

  httpServer.listen(port);

  return {
    close: function() {
      connected = false;
      onDisconnected();
      clearTimeout(restartTimeout);
      server.close();
      httpServer.close();
    },
  };
}

const { close } = startServer(process.env.PORT || 8097);

module.exports = () => {
  return close();
}