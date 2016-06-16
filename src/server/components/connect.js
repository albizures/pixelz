'use strict';
const MongoClient = require('mongodb').MongoClient;
const response = require('./utils/response.js');
const config = require('../config/environment');
const modelUsers = require('../api/users/users.mdl.js');

let db;
let option = {w : 1};

var url = 'mongodb://localhost:27017/pixelz';


MongoClient.connect(url, function(err, result) {
	if (err) {
		throw 'Error mongo';
	}
	console.log("Connected correctly to server");
	db = result;

	if (!config.isProduction) {
		modelUsers.getSearch({
			user: 'albizures'
		}, onSearch);
		function onSearch(result) {
			if (result.code == 0 && result.data && result.data.length) {
				modelUsers.post({
					user: 'albizures'
				}, onPost);
			}
		}
		function onPost(result) {
			if (result.code !== 0) {
				throw 'Error master user';
			}
		}
	}
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
	db.collection(collection).find(data).toArray(onFind);
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

