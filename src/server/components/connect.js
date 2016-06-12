'use strict';
const MongoClient = require('mongodb').MongoClient;
const response = require('./utils/response.js');
let db;
let option = {w : 1};

var url = 'mongodb://localhost:27017/pixelz';


MongoClient.connect(url, function(err, result) {
	if (err) {
		throw 'Error mongo';
	}
	console.log("Connected correctly to server");
	db = result;
});

exports.getOne = function (collection, id, cb) {
	db.collection(collection).findOne({id : id}, option, onFindOne);
	function onFindOne(err, result) {
		cb(response(err ? 1 : 0, err, result));
	}
};

exports.getAll = function (collection, cb) {
	db.collection(collection).find().toArray(onFind);
	function onFind(err, result) {
		cb(response(err ? 1 : 0, err, result));
	}
};

exports.getSearch = function (collection, data, cb) {
	db.collection(collection).find(data, option, onFind);
	function onFind(err, result) {
		cb(response(err ? 1 : 0, err, result));
	}
};

exports.post = function (collection, data, cb) {
	db.collection(collection).insertOne(data, option, onInserOne);
	function onInserOne(err, result) {
		cb(response(err ? 1 : 0, err, result));
	}
};

