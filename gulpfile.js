const path = require('path');
const os = require('os');
const gulp = require('gulp');
const webpack = require('webpack');
const open = require('gulp-open');
const clean = require('gulp-clean');
const gls = require('gulp-live-server');
const env = require('gulp-env');
const ava = require('gulp-ava');

var config;
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


gulp.task('build:env', function () {
  return env({
    file: './.env.json',
    vars: {
      NODE_ENV: 'production'
    }
  });
});

gulp.task('dev:env', function () {
  env('.env.json');
  config = require('./src/server/config/environment');
  webpackConfig = require('./src/webpack.dev.config.js');
});

gulp.task('build:webpack', ['build:env', 'build:clean'], function (cb) {
  webpack({
      // configuration
  }, function(err, stats) {
    if (err) throw err;
    console.log(stats.toString(defaultStatsOptions));
    cb();
  });
});

gulp.task('dev:webpack', ['dev:env', 'dev:clean'], function (cb) {
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

gulp.task('dev:server', ['dev:env', 'dev:webpack'], function () {
  console.log({env: require('./.env.json')});
  const server = gls('./index.js',{env: require('./.env.json')});

  console.log(process.env.PORT);
  server.start();

  gulp.watch([path.join(webpackConfig.output.path, '/**/*.{html,css,js}')], function (file) {
    console.log('change public files');
    server.notify.apply(server, [file]);
  });

  gulp.watch(['./index.js', './src/server/**/*.js'] , function() {
    server.start.bind(server)();
  });
});
gulp.task('build:clean', ['build:env'], function () {
  return gulp.src(webpackConfig.output.path, {read: false})
    .pipe(clean());
});


gulp.task('dev:clean', ['dev:env'], function () {
  return gulp.src(webpackConfig.output.path, {read: false})
    .pipe(clean());
});

gulp.task('default', ['dev:env', 'dev:server'], function () {
  var browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : 'chrome');
  var options = {
    uri: 'http://127.0.0.1:' + config.PORT,
    app: browser
  };
  return gulp.src(__filename)
    .pipe(open(options));
});

gulp.task('build', ['build:env', 'build:webpack']);


gulp.task('test', function () {
  return gulp.src('test.js')
    .pipe(ava({verbose: true}));
});