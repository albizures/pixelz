const base = require('./webpack.base.config.js');

base.watch = true;
base.devtool = 'source-map';

module.exports = base;