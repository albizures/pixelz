
function generate(code, description, data) {
  return {
    code,
    description,
    data
  };
};

exports.generate = generate;

exports.commonData = function (res, model, id) {
  model(id, function (result) {
    res.json(result);
  });
};

exports.common = function (res, model) {
  model(function (result) {
    res.json(result);
  });
};

exports.commoFile = function (res, model, name) {
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
exports.commonResult = function (err, data) {
  return generate(err ? 1 : 0, err, data);
};