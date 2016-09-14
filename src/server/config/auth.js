const config = require('./environment');
const TwitterStrategy = require('passport-twitter').Strategy;

const twitterStrategy = new TwitterStrategy({
    consumerKey: config.auth.twitter.TWITTER_CONSUMER_KEY,
    consumerSecret: config.auth.twitter.TWITTER_CONSUMER_SECRET,
    callbackURL: config.auth.twitter.callbackURL
  },
  function(token, tokenSecret, profile, cb) {
  }
);

const serializeUser = function(user, cb) {
  cb(null, user);
};

const deserializeUser = function(obj, cb) {
  cb(null, obj);
};

module.exports = function (passport) {
  
};