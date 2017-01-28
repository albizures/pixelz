
import { bindActionCreators } from 'redux';

export const updateArrayItem = function (arr, index, item) {
  return [].concat(arr.slice(0, index), item, arr.slice(index + 1));
};

export const push = function (arr, item) {
  return arr.concat([item]);
};

export const editProp = function (obj, propName, propValue) {
  let temp = {};
  temp[propName] = propValue;
  return Object.assign({}, obj, temp);
};

export const shiftPositions = function (arr, fromIndex, toIndex) {
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

export const wrapActionCreators = function (dispatch, actionCreators) {
  let obj = {};
  let keys = Object.keys(actionCreators);
  for (let index = 0; index < keys.length; index++) {
    let name = keys[index];
    let creator = actionCreators[name];
    obj[name] = bindActionCreators(creator, dispatch);
  }
  return obj;
};