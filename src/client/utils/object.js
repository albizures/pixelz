
exports.defineGetter = function defineGetter(obj, name, fn) {
  Object.defineProperty(obj, name, {
    get: fn,
    enumerable: true,
    configurable: true
  });
};

exports.extend = function extend(destination, source) {
  for (let k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
};


exports.inheritanceObject = function (child, father) {
  child.prototype = Object.create(father.prototype);
  child.prototype.constructor = child;
};


exports.bindObject = function (obj, self) {
  self = self || obj;
  let keys = Object.keys(obj);
  for (let j = 0; j < keys.length; j++) {
    let prop = keys[j];
    if (typeof obj[prop] === 'function') {
      obj[prop] = obj[prop].bind(self);
    }
  }
};