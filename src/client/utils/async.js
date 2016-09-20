
exports.proxy = function (cb, ...newParams) {
  return function (...originalParams) {
    cb.apply(null, originalParams.concat(newParams));
  };
};

exports.serial = function (array, cb, cbDone) {
  var index = 0;
  var length = array.length;
  var results = [];

  function done (abort, result) {
    results[index] = result;
    index++;
    if (abort || index === length) {
      cbDone(results);
      return cbDone = function () {};
    }
    cb(array[index], index, done);
  }
  cb(array[index], index, done);
};

exports.parallel = function (array, cb, cbDone) {
  var index = 0;
  var length = array.length;
  var results = [];

  for (let j = 0; j < array.length; j++) {
    cb(array[j], j, (abort, result) =>{
      results[j] = result;
      index++;
      if (abort || index === length) {
        cbDone(results);
        return cbDone = function () {};
      }
    });
  }
};