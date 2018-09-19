const intervals = {};

const clear = (id) => {
  clearInterval(intervals[id]);
  delete intervals[id];
}

exports.clear = clear;

exports.set = (id, interval) => {
  intervals[id] = interval;
}

exports.clearAll = () => {
  Object.keys(intervals).forEach((id) => {
    clear(id);
  });
}