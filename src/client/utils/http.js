function request(url, protocol, cb, body) {
  if (body) {
    body = JSON.stringify(body);
  }
  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: protocol,
    body: body
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    cb(json);
  }).catch(function (ex) {
    cb({code : 1, description : 'Connection error'});
  });
}


exports.post = function (url, body, cb) {
  request(url, 'POST', cb, body);
};

exports.get = function (url, cb) {
  request(url, 'GET', cb);
};

exports.delete = function (url, cb) {
  request(url, 'DELETE', cb);
};

exports.put = function (url, body, cb) {
  request(url, 'PUT', cb, body);
};

exports.upload = function (url, data, files) {
  const form = new FormData();
  const dataKeys = Object.keys(data);
  for (let j = 0; j < files.length; j++) {
    let element = files[j];
    form.append('files', element.file, element.name);
  }
  form.append('body', JSON.stringify(data));
  for (var key of form.values()) {
    console.log(typeof key);
  }

  fetch(url, {
    method: 'POST',
    body: form
  }).then(function (response) {
    console.log(response);
  }).catch(function (ex) {
    cb({code : 1, description : 'Connection error'});
  });
};