const Joi = require('joi');
const Promise = require('bluebird');
const db = require('../../components/connect.js');
const identicons = require('../../components/utils/identicons.js');
const collection = 'users';
const { User } = require('../../models'); 
//collectionDB.createIndex('twitterID', {unique: true});

const userSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(),
  displayName: Joi.string(),
  createdAt: Joi.date(),
  twitterID: Joi.any(),
  profileImage: Joi.string()
});

exports.post = data => {
  let { error } = Joi.validate(
    data,
    userSchema.with('username', 'displayName', 'email')
  );
  if (error) return Promise.reject(error);
  let newUser;
  return User.save(
    data
  ).then(user => {
    newUser = user;
    return identicons.generate({
      hash: user._id
    });
  }).then(url => {
    newUser.profileImage = url;
    return newUser.save();
  });
};

exports.getAll = () => User.getAll();

exports.getOne = id => User.getOne({_id: id});

exports.getSearch = query => User.getSearch(query);

exports.getByTwitterID = twitterID => User.findOne({twitterID});

exports.put = function (id, data, cb) {
  
  db.update(collection, id, data, cb);
  
};

exports.collection = collection;