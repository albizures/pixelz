
module.exports = function (code, description, data) {
  return {
    code,
    description,
    data
  };
};

module.exports.commonData = function (res, model, id) {
  model(id, function (result) {
    res.json(result);
  });
};

module.exports.common = function (res, model) {
  model(function (result) {
    res.json(result);
  });
};

module.exports.commoFile = function (res, model, name) {
  model(name, result => {
    if (result.code === 0) {
      console.log(result);
      res.type(result.data.meta.type || '');
      res.send(result.data.buffer);
    } else {
      console.log(result);
      res.send('error');
    }
    
  });
};