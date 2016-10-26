function generate(code, description, data) {
  return {
    code,
    description,
    data
  };
}

exports.generate = generate;

exports.commonData = function (res, model, data) {
  model(data, function (result) {
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

exports.then = (res, status = 200) => result => res.status(status).json(result);
exports.catch = (res, status = 500, userMsg) => err => {
  err.userMsg = userMsg;
  res.status(status).json(err);
};

exports.promise = (promise, res, statusThen, statusCatch, userMsg) => {
  promise.then(exports.then(res, statusThen)).catch(exports.catch(res, statusCatch, userMsg));
};


exports.commonPutHistory = function (res, model, id, data, history) {
  model(id, data, history,
    function (result) {
      res.json(result);
    }
  );
};

exports.commonPut = function (res, model, id, data) {
  model(id, data,
    function (result) {
      res.json(result);
    }
  );
};