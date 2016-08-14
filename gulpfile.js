const path = require('path');
var os = require('os');
const gulp = require('gulp');
const gutil = require('gulp-util');
const open = require('gulp-open');
const clean = require('gulp-clean');
const gls = require('gulp-live-server');
const webpack = require('webpack-stream');
const config = require('./src/server/config/environment');
var webpackConfig;

gulp.task('set-dev', function () {
  return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod', function () {
  return process.env.NODE_ENV = 'production';
});

let callingDone = false;
let firstCompile = true; 
gulp.task('webpack', ['clean'], function (cb) {
  return gulp.src('src/entry.js')
    .pipe(webpack(webpackConfig, undefined, function done(err, stats) {
      if (err) {
        // The err is here just to match the API but isnt used
        return;
      }
      stats = stats || {};
      if (callingDone) {
        return;
      }
      // Debounce output a little for watch mode
      callingDone = true;
      setTimeout(function () {
        callingDone = false;
      }, 500);

      // if (options.verbose) {
      //   gutil.log(stats.toString({
      //     colors: gutil.colors.supportsColor
      //   }));
      // } else {
      var statsOptions = {
        colors: gutil.colors.supportsColor,
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

      gutil.log(stats.toString(statsOptions));
      // }
      if (firstCompile) {
        console.log('init compile');
        cb();
        firstCompile = false;
      }
    }))
    .pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task('server', function () {
  const server = gls.new('./index.js');

  server.start();

  gulp.watch([path.join(webpackConfig.output.path, '/**/*.{html,css,js}')], function (file) {
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


