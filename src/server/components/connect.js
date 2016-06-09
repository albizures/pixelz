const MongoClient = require('mongodb').MongoClient,
	assert = require('assert');


var url = 'mongodb://localhost:27017';

MongoClient.connect(url, function(err, db) {
	if (err) {
		throw 'Error mongo';
	}
	console.log("Connected correctly to server");

	db.close();
});