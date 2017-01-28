import {rgbToHex, unusedColor} from 'utils/color';

self.onmessage = function (evt) {
  var dataReturn;
  switch (evt.data.type) {
    case 'palette': {
      dataReturn = getColors(evt.data.data);
      break;
    }
    case 'transparent': {
      dataReturn = getTransparent(evt.data.data);
      break;
    }
  }
  this.postMessage({type: evt.data.type, data: dataReturn});
};

function getColors(dataList) {
  let obj = {},
    array = [],
    color;
  for (let i = 0; i < dataList.length; i++) {
    for (let j = 0; j < dataList[i].length; j = j + 4) {
      color = 'rgba(' + dataList[i][j] + ', ' + dataList[i][j + 1] + ', ' + dataList[i][j + 2] + ', ' + dataList[i][j + 3] / 255 + ')';
      if (!obj[color]) {
        array.push(color);
        obj[color] = true;
      }
    }
  }
  return {
    obj: obj,
    array: array
  };
}


function getTransparent(dataList) {
  let obj = {},
    transparent;
  for (let i = 0; i < dataList.length; i++) {
    let data = dataList[i];
    for (let j = 0; j < data.length; j += 4) {
      let r = data[j],
        g = data[j + 1],
        b = data[j + 2],
        color = r + '.' + g + '.' + b;
      if (!obj[color]) {
        obj[color] = true;
      }
    }
  }
  transparent = unusedColor(obj);
  return rgbToHex(transparent.r, transparent.g, transparent.b);
}
