const {rgbToHex, unusedColor} = require("utils/color.js");

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
    for (let b = 0; b < dataList[i].length; b = b + 4) {
      color = 'rgba(' + dataList[i][b] + ', ' + dataList[i][b + 1] + ', ' + dataList[i][b + 2] + ', ' + dataList[i][b + 3] / 255 + ')';
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
  for (let b = 0; b < dataList.length; b++) {
    let data = dataList[b];
    for (let i = 0, n = data.length; i < n; i += 4) {
      let r = data[i],
        g = data[i + 1],
        b = data[i + 2],
        color = r + '.' + g + '.' + b;
      if (!obj[color]) {
        obj[color] = true;
      }
    }
  }
  transparent = unusedColor(obj);
  return rgbToHex(transparent.r, transparent.g, transparent.b);
}
