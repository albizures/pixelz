const Joi = require('joi');
const Promise = require('bluebird');
const { isTest } = require('../../config/environment');

function validate(data, schema, ...withParams) {
  let { error } = Joi.validate(
    data,
    withParams.length === 0 ? schema : schema.with('sprite', ...withParams)
  );
  if (error) {
    if (!isTest) {
      console.log(data, withParams);
    }
    return Promise.reject(error.details[0]);
  }
  return Promise.resolve(data);
}

module.exports = validate;