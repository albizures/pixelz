const passport = require('passport');
const jwt = require('jsonwebtoken');
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('./environment');
const userModel = require('../api/users/users.mdl.js');


function TwitterStrategyCallback(token, tokenSecret, profile, done) {
  let userProfile = {
    username: profile._json.screen_name,
    displayName: profile._json.name,
    email: profile._json.email,
    twitterID: profile._json.id
  };
  userModel.getByTwitterID(userProfile.twitterID, onGetUser);

  function onGetUser(result) {
    console.log('getByTwitterID', result);
    if (result.code !== 0) {
      return done(result);
    }
    if (result.data.length === 0) {
      return userModel.post(userProfile, onPost);
    }
    let user = result.data[0];
    userProfile._id = user._id;
    jwt.sign({_id: user._id}, config.secret, {}, onSign);
  }
  function onPost (result) {
    if (result.code !== 0) {
      return done(result);
    }

    jwt.sign({_id: result.data}, config.secret, {}, onSign);
  }
  
  function onSign(err, token) {
    if (err) {
      return done(err);
    }
    return done(null, {
      _id: userProfile._id,
      token
    });
  }
}

const twitterStrategy = new TwitterStrategy(config.auth.twitter,TwitterStrategyCallback);

const serializeUser = function(user, cb) {
  console.log('serializeUser', user);
  cb(null, user);
};

const deserializeUser = function(obj, cb) {
  userModel.getOne(obj._id, function (result) {
    cb(result.description, result.data);
  });
};

module.exports = function (app) {
  passport.use(twitterStrategy);
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports.passport = passport;