var ws = require('ws');
var Store = require('../../react-devtools/frontend/Store');
var Bridge = require('../../react-devtools/agent/Bridge');
const { setStore } = require('../../index');
const { storeHasDisconnected, storeHasConnected, reactHasConnected, reactHasDisconnected } = require('../../connections');

function reload(wall) {
  console.log('react-dom-model - 25');
  storeHasDisconnected();
  const _bridge = new Bridge(wall);
  const _store = new Store(_bridge);

  setStore(_store);

  _store.on('connected', () => {
    console.log('react-dom-model - 26');
    storeHasConnected();
    reactHasConnected();
  });
}

function onDisconnected() {
  console.log('react-dom-model - 27');
  reactHasDisconnected();
  // console.log('waiting for react to connect');
}

function onError(e) {
  console.log('react-dom-model - 28');
  var message;

  if (e.code === 'EADDRINUSE') {
    message = 'Another instance of DevTools is running';
  } else {
    message = `Unknown error (${e.message})`;
  }

  console.log(message);
}

function initialize(socket) {
  console.log('react-dom-model - 29');
  var listeners = [];
  socket.onmessage = evt => {
    console.log('react-dom-model - 30');
    var data = JSON.parse(evt.data);
    listeners.forEach(fn => fn(data));
  };

  const wall = {
    listen(fn) {
      console.log('react-dom-model - 31');
      listeners.push(fn);
    },
    send(data) {
      console.log('react-dom-model - 32');
      if (socket.readyState === socket.OPEN) {
        console.log('react-dom-model - 33');
        socket.send(JSON.stringify(data));
      } else {
        console.log('react-dom-model - 34');
      }
    },
    disconnect() {
      console.log('react-dom-model - 35');
      socket.close();
    },
  };

  console.log('Connected');
  reload(wall);
}

var restartTimeout = null;

function startServer(port = 8097) {
  console.log('react-dom-model - 36');
  var httpServer = require('http').createServer();
  var server = new ws.Server({ server: httpServer });
  var connected = false;
  server.on('connection', socket => {
    console.log('react-dom-model - 37');
    if (connected) {
      console.log('react-dom-model - 38');
      connected.close();
      // console.warn(
      //   'Only one connection allowed at a time.',
      //   'Closing the previous connection'
      // );
    } else {
      console.log('react-dom-model - 39');
    }
    connected = socket;
    socket.onerror = err => {
      console.log('react-dom-model - 40');
      connected = false;
      onDisconnected();
      // console.error('Error with websocket connection', err);
    };
    socket.onclose = () => {
      console.log('react-dom-model - 41');
      connected = false;
      onDisconnected();
      // console.log('Connection to RN closed');
    };
    initialize(socket);
  });

  server.on('error', e => {
    console.log('react-dom-model - 42');
    onError(e);
    // console.error('Failed to start the DevTools server', e);
    restartTimeout = setTimeout(() => {
      console.log('react-dom-model - 43');
      return startServer(port);
    }, 1000);
  });

  httpServer.on('error', e => {
    console.log('react-dom-model - 44');
    onError(e);
    restartTimeout = setTimeout(() => {
      console.log('react-dom-model - 45');
      return startServer(port), 1000);
    });
  });

  httpServer.listen(port);

  return {
    close: function() {
      console.log('react-dom-model - 46');
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
  console.log('react-dom-model - 47');
  return close();
}