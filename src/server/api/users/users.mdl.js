const Joi = require('joi');

const validate = require('../../components/utils/validateSchema');
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

exports.create = data =>
  validate(data, userSchema, 'username', 'displayName')
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
  validate({_id: id}, userSchema, '_id')
    .then(data => User.getOne(data));

exports.getSearch = query => User.getSearch(query);

exports.findByTwitterID = twitterID => User.findOne({twitterID});

exports.update = (id, data) =>
  validate(data, userSchema)
    .then(data => User.findByIdAndUpdate(id, {$set: data}, {new: true}));