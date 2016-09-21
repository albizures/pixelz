
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

exports.shiftPositions = function (arr, fromIndex, toIndex) {
  let newArr = [].concat(arr.slice(0, fromIndex), arr.slice(fromIndex + 1));
  newArr.splice(toIndex, 0, arr[fromIndex]);
  return newArr;
  //y = 3 //from
  //x = 1 // to
  //a = [1,2,3,4,5,6]
  //b = [].concat(a.slice(0,y), a.slice(y + 1));
  //b.splice(1, 0, a[y]);
  //
};