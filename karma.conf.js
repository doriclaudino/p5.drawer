'use strict';
const webpackConfig = require('./webpack.config1.js');
module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/karma_test.js',
      {
        //assets
        pattern: 'test/testAssets/*.*',
        watched: false,
        included: false,
        served: true,
        nocache: false,
      },
    ],
    //report type
    reporters: ['progress'],
    //transpile
    preprocessors: {
      'test/karma_test.js': ['webpack'],
    },
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
    webpack: webpackConfig.test,
  });
};
