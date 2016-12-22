const webpackConfig = require('./webpack.config.js');

webpackConfig.devtool = 'inline-source-map';
module.exports = config => {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      './src/client/tests.webpack.js'
    ],
    preprocessors: {
      './src/client/tests.webpack.js': ['webpack', 'sourcemap']
    },
    plugin: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};