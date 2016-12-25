const passport = require('passport');
const jwt = require('jsonwebtoken');
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('./environment');
const userModel = require('../api/users/users.mdl.js');

function TwitterStrategyCallback(token, tokenSecret, profile, done) {
  let userProfile = {
    username: profile._json.screen_name,
    displayName: profile._json.name,
    email: profile._json.email || undefined,
    twitterID: profile._json.id
  };
  userModel.findByTwitterID(
    userProfile.twitterID
  ).then(user => {
    if (!user) {
      return userModel.create(userProfile);
    }
    return user;
  }).then(user => {
    userProfile._id = user._id;
    return jwt.sign({_id: user._id}, config.secret, {});
  }).then(token => {
    done(null, {
      _id: userProfile._id,
      token
    });
  }).catch(function (err) {
    done(err);
  });
}

const twitterStrategy = new TwitterStrategy(config.auth.twitter,TwitterStrategyCallback);

const serializeUser = function(user, cb) {
  cb(null, user);
};

const deserializeUser = function(obj, cb) {
  return userModel.findOne(obj._id)
    .then(user => cb(null, user) || null) // return null
    .catch(cb);
};

module.exports = function (app) {
  passport.use(twitterStrategy);
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  app.use(passport.initialize());
  app.use(passport.session());
  if (config.isTest) {
    require('../components/utils/passportStub.js').use(app);
  }
};

module.exports.passport = passport;