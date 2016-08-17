function parseJSON(response) {
  return response.json();
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
function request(url, protocol, cb, body, headers = true) {
  if (body && !(body instanceof FormData)) {
    body = JSON.stringify(body);
  }
  console.log(protocol,body, body instanceof FormData, url);
  return fetch(url, {
    headers: headers? {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } : undefined,
    method: protocol,
    body: body
  }).then(checkStatus).then(parseJSON).then(cb).catch(function (ex) {
    console.error(ex);
    cb({code : 1, description : ex});
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

function put (url, body, cb) {
  return request(url, 'PUT', cb, body);
};

exports.upload = function (url, data, files, method, cb) {
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
  request(url, method, cb, form, false);
};

exports.put = put;

exports.sprite = {};

exports.sprite.putName = function (id, name, cb) {
  return put('/api/sprites/' + id + '/name', {name}, cb);
};