const _ = require('lodash');
const mongoose = require('mongoose');
const querymen = require('querymen');

const schema = {
  // _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: [2, 'Name too short'],
    maxlength: [30, 'Name too long']
  },
  email: {
    type: String,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  twitterID: {
    type: Number,
    unique: true
  },
  profileImage: {
    type: String,
    required: true,
    default: '/assets/images/profile.png'
  }
};

const userSchema = new mongoose.Schema(schema);
const querySchema = new querymen.Schema(
  _.assign(
    _.omit(schema, 'email', 'twitterID', 'profileImage'),
    {_id: String}
  )
);

userSchema.statics.findOrCreate = function (conditions, data){
  return this.findOne(conditions)
    .then(anonymous => anonymous || this.create(data));
};

userSchema.statics.getAll = function (cb) {
  return this.find({}, cb).select({ _id: 1, username: 1, displayName: 1, profileImage: 1});
};

userSchema.statics.getOne = function (conditions, cb) {
  return this.findOne(conditions, cb).select({ _id: 1, username: 1, displayName: 1, profileImage: 1});
};

userSchema.statics.getSearch = function (query) {
  console.log(query.cursor);
  return this.find(query.query)
    .select(query.select)
    .sort(query.sort)
    .skip(query.skip)
    .limit(query.limit);
};

exports.userSchema = userSchema;
exports.schema = schema;
exports.querySchema = querySchema;