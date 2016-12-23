const Joi = require('joi');
const Promise = require('bluebird');
const { isTest } = require('../../config/environment');
const identicons = require('../../components/utils/identicons.js');
const { User } = require('../../models');
Joi.objectId = require('joi-objectid')(Joi);

const userSchema = Joi.object().keys({
  _id: Joi.objectId(),
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  displayName: Joi.string(),
  createdAt: Joi.date(),
  twitterID: Joi.any(),
  profileImage: Joi.string()
});

function validate(data, ...withParams) {
  let { error } = Joi.validate(
    data,
    withParams.length === 0 ? userSchema : userSchema.with('sprite', ...withParams)
  );
  if (error) {
    if (!isTest) {
      console.log(data, withParams);
    }
    return Promise.reject(error.details[0]);
  }
  return Promise.resolve(data);
}

exports.create = data =>
  validate(data, 'username', 'displayName', 'email')
    .then(data => User.create(data))
    .then(user => {
      return identicons.generate({
        hash: user._id
      }).then(url => {
        user.profileImage = url;
        return user.save();
      });
    });

exports.getAll = () => User.getAll();

exports.findOne = id =>
  validate({_id: id}, '_id')
    .then(data => User.getOne(data));

exports.getSearch = query => User.getSearch(query);

exports.findByTwitterID = twitterID => User.findOne({twitterID});

exports.update = (id, data) =>
  validate(data)
    .then(data => User.findByIdAndUpdate(id, {$set: data}, {new: true}));