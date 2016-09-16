process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const _ = require('lodash');

const config = {};

config.PORT = 8000;

config.isDev = process.env.NODE_ENV === 'development';
config.ROOT_PATH = path.join(__dirname, '..', '..', '..', '..');
config.FILES_PATH = path.join(config.ROOT_PATH, 'files');
config.PUBLIC_PATH = path.join(config.ROOT_PATH, 'public');
config.CLIENT_PATH = path.join(config.ROOT_PATH, 'src', 'client');
config.APP_PATH = path.join(config.CLIENT_PATH, 'init.js');
config.MODULES_PATH = path.join(config.ROOT_PATH, 'node_modules');
config.ASSETS_PATH = path.join(config.CLIENT_PATH, 'assets');
config.TEMPLATE_PATH = path.join(config.CLIENT_PATH, 'template');
config.MAIN_TEMPLATE = path.join(config.TEMPLATE_PATH, 'production.jade');
config.auth = {
  twitter:{
    consumerKey : process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:8000/api/auth/twitter/callback',
    includeEmail: true
  }
};
config.secret = process.env.PIXORE_SECRET || 'super duper secret for pixore';

if (config.isDev) {
  config.MAIN_TEMPLATE = path.join(config.TEMPLATE_PATH, 'development.jade');
}

module.exports = config;
