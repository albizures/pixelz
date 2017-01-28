const webpackConfig = require('./webpack.config.js');

webpackConfig.devtool = 'cheap-module-source-map';
webpackConfig.watch = true;
module.exports = config => {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      './src/client/tests.webpack.js',
      {pattern: './src/client/**/*.spec.js', included: false, served: false, watched: true}
    ],
    preprocessors: {
      './src/client/tests.webpack.js': ['webpack']
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