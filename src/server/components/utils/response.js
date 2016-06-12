
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
