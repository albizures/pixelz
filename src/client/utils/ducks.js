
exports.updateArrayItem = function (arr, index, item) {
  return [].concat(arr.slice(0, index), item, arr.slice(index + 1));
};

exports.push = function (arr, item) {
  return arr.concat([item]);
};

exports.editProp = function (obj, propName, propValue) {
  let temp = {};
  temp[propName] = propValue;
  return Object.assign({}, obj, temp);
};