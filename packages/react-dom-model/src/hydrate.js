var consts = require('./consts');

function hydrate(data, cleaned) {
  cleaned.forEach(path => {
    var last = path.pop();
    var obj = path.reduce((obj_, attr) => obj_ ? obj_[attr] : null, data);
    if (!obj || !obj[last]) {
      return;
    }
    var replace = {};
    replace[consts.name] = obj[last].name;
    replace[consts.type] = obj[last].type;
    replace[consts.meta] = obj[last].meta;
    replace[consts.inspected] = false;
    obj[last] = replace;
  });
}

module.exports = hydrate;
