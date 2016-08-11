const path = require('path');
const gulp = require('gulp');
const clean = require('gulp-clean');
const gls = require('gulp-live-server');
const webpack = require('webpack-stream');
var webpackConfig;

gulp.task('set-dev', function () {
  return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod', function () {
  return process.env.NODE_ENV = 'production';
});

gulp.task('webpack', ['clean'], function () {
  return gulp.src('src/entry.js')
    .pipe(webpack(webpackConfig))
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

gulp.task('default', ['set-dev', 'webpack', 'server']);

gulp.task('build', ['set-prod', 'webpack']);