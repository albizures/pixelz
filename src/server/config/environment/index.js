
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
    TWITTER_CONSUMER_KEY : process.env.TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://pixore.test'
  }
};

if (config.isDev) {
  config.MAIN_TEMPLATE = path.join(config.TEMPLATE_PATH, 'development.jade');
}

module.exports = config;
