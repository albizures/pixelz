const path = require('path');
const os = require('os');
const gulp = require('gulp');
const webpack = require('webpack');
const open = require('gulp-open');
const clean = require('gulp-clean');
const gls = require('gulp-live-server');
//const webpack = require('webpack-stream');
const config = require('./src/server/config/environment');
var webpackConfig;

var defaultStatsOptions = {
  colors: true,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false
};


gulp.task('set-dev', function () {
  return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod', function () {
  return process.env.NODE_ENV = 'production';
});

var callingDone = false;
var firstCompile = true; 
gulp.task('webpack', ['clean'], function (cb) {
  webpack(webpackConfig, function (err, stats) {
    if (err) {
      throw err; // hard error
    }
    console.log(stats.toString(defaultStatsOptions));
    if (!cb.called) {
      cb.called = true;
      cb();
    }
  });
});

gulp.task('server', function () {
  const server = gls.new('./index.js');

  server.start();

  gulp.watch([path.join(webpackConfig.output.path, '/**/*.{html,css,js}')], function (file) {
    console.log('change public files');
    server.notify.apply(server, [file]);
  });

  gulp.watch(['./index.js', './src/server/**/*.js'] , function() {
    server.start.bind(server)();
  });
});

gulp.task('clean', function (cb) {
  webpackConfig = require('./webpack.config.js');
  return gulp.src(webpackConfig.output.path, {read: false})
    .pipe(clean());
});

gulp.task('default', ['set-dev', 'webpack', 'server'], function () {
  var browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : 'chrome');
  var options = {
    uri: 'http://localhost:' + config.PORT,
    app: browser
  };
  return gulp.src(__filename)
    .pipe(open(options));
});

gulp.task('build', ['set-prod', 'webpack']);


