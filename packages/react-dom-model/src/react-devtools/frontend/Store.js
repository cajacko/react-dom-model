var {EventEmitter} = require('events');
var {Map, Set, List} = require('immutable');
var assign = require('object-assign');
var intervals = require('../../intervals');

var storeID = 0;

class Store extends EventEmitter {
  constructor(bridge) {
    super();

    this.storeID = storeID;
    storeID += 1;

    this._nodes = new Map();
    this._parents = new Map();
    this._nodesByName = new Map();
    this._bridge = bridge;

    // Public state
    this.roots = new List();
    this.contextMenu = null;
    this.breadcrumbHead = null;
    this.capabilities = {};
    this.traceupdatesState = null;
    this.colorizerState = null;

    // events from the backend
    this._bridge.on('root', id => {
      if (this.roots.contains(id)) {
        return;
      }
      this.roots = this.roots.push(id);
      this.emit('roots');
    });
    this._bridge.on('mount', (data) => this._mountComponent(data));
    this._bridge.on('update', (data) => this._updateComponent(data));
    this._bridge.on('unmount', id => this._unmountComponent(id));

    this._establishConnection();
    this._eventQueue = [];
    this._eventTimer = null;
  }

  emit(event) {
    if (this._eventQueue.indexOf(event) !== -1) {
      // to appease flow
      return true;
    }
    this._eventQueue.push(event);
    if (!this._eventTimer) {
      this._eventTimer = setTimeout(() => this.flush(), 50);
    }
    return true;
  }

  flush() {
    if (this._eventTimer) {
      clearTimeout(this._eventTimer);
      this._eventTimer = null;
    }
    this._eventQueue.forEach(evt => {
      EventEmitter.prototype.emit.call(this, evt);
    });
    this._eventQueue = [];
  }

  // Public methods
  get(id) {
    return this._nodes.get(id);
  }

  // Private stuff
  _establishConnection() {
    var tries = 0;

    intervals.clear(this.storeID);

    this._bridge.once('capabilities', capabilities => {
      intervals.clear(this.storeID);
      this.capabilities = assign(this.capabilities, capabilities);
      this.emit('connected');
    });

    this._bridge.send('requestCapabilities');

    intervals.set(this.storeID, setInterval(() => {
      tries += 1;
      if (tries > 100) {
        console.error('failed to connect');
        intervals.clear(this.storeID);
        this.emit('connection failed');
        return;
      }
      this._bridge.send('requestCapabilities');
    }, 500));
  }

  _mountComponent(data) {
    var map = Map(data).set('renders', 1);
    if (data.nodeType === 'Composite') {
      map = map.set('collapsed', true);
    }
    this._nodes = this._nodes.set(data.id, map);
    if (data.children && data.children.forEach) {
      data.children.forEach(cid => {
        this._parents = this._parents.set(cid, data.id);
      });
    }
    var curNodes = this._nodesByName.get(data.name) || new Set();
    this._nodesByName = this._nodesByName.set(data.name, curNodes.add(data.id));
    this.emit(data.id);
  }

  _updateComponent(data) {
    var node = this.get(data.id);
    if (!node) {
      return;
    }
    data.renders = node.get('renders') + 1;
    this._nodes = this._nodes.mergeIn([data.id], Map(data));
    if (data.children && data.children.forEach) {
      data.children.forEach(cid => {
        if (!this._parents.get(cid)) {
          this._parents = this._parents.set(cid, data.id);
        }
      });
    }
    this.emit(data.id);
  }

  _unmountComponent(id) {
    var pid = this._parents.get(id);
    this._removeFromNodesByName(id);
    this._parents = this._parents.delete(id);
    this._nodes = this._nodes.delete(id);
    if (pid) {
      this.emit(pid);
    } else {
      var ix = this.roots.indexOf(id);
      if (ix !== -1) {
        this.roots = this.roots.delete(ix);
        this.emit('roots');
      }
    }
  }

  _removeFromNodesByName(id) {
    var node = this._nodes.get(id);
    if (node) {
      this._nodesByName = this._nodesByName.set(node.get('name'), this._nodesByName.get(node.get('name')).delete(id));
    }
  }
}

module.exports = Store;
