
const path = require('path');
const _ = require('lodash');

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const ROOT_PATH = path.join(__dirname, '..', '..', '..', '..');
const FILES_PATH = path.join(ROOT_PATH, 'files');
const PUBLIC_PATH = path.join(ROOT_PATH, 'public');
const CLIENT_PATH = path.join(ROOT_PATH, 'src', 'client');
const APP_PATH = path.join(CLIENT_PATH, 'init.js');
const MODULES_PATH = path.join(ROOT_PATH, 'node_modules');
const ASSETS_PATH = path.join(CLIENT_PATH, 'assets');
const TEMPLATE_PATH = path.join(CLIENT_PATH, 'template');
console.log(env);
const all = {
  isDev : env === 'development',
  isProduction: env != 'development',
  isProd : env != 'development',
  ROOT_PATH,
  PUBLIC_PATH,
  CLIENT_PATH,
  APP_PATH,
  MODULES_PATH,
  TEMPLATE_PATH,
  ASSETS_PATH,
  FILES_PATH,
  PORT : 8080
};
module.exports = _.merge(
  all,
  require('./' + env + '.js')(all)
);
