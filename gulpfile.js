const path = require('path');
const gulp = require('gulp');
const clean = require('gulp-clean');
const gls = require('gulp-live-server');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.local.js');


gulp.task('webpack', ['clean'], function() {
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
  return gulp.src(webpackConfig.output.path, {read: false})
    .pipe(clean());
});

gulp.task('default',['server', 'webpack']);