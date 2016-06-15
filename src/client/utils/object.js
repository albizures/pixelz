
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
