const axios = require('axios');

function parseJSON(response) {
  return response.data;
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
function request(url, method, body, headers = true) {
  let promise = axios({
    url,
    headers: headers ? {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } : undefined,
    method,
    data: body
  }).then(checkStatus).then(parseJSON);
  return promise;
}


exports.post = function (url, body) {
  return request(url, 'POST', body);
};

exports.get = function (url) {
  return request(url, 'GET');
};

exports.delete = function (url) {
  return request(url, 'DELETE');
};

function put (url, body) {
  return request(url, 'PUT', body);
}

exports.upload = function (url, data, files, method) {
  const form = new FormData();
  for (let j = 0; j < files.length; j++) {
    let element = files[j];
    form.append('files', element.file, element.name);
  }
  form.append('body', JSON.stringify(data));
  for (var key of form.values()) {
    console.log(typeof key);
  }
  request(url, method, form, false);
};

exports.put = put;

exports.sprite = {};

exports.sprite.putName = function (id, name, cb) {
  return put('/api/sprites/' + id + '/name', {name}, cb);
};