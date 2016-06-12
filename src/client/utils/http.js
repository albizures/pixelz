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