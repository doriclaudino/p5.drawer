'use strict';
const webpackConfig = require('./webpack.config.js');
module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/coverage/**.js',
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
    reporters: ['progress', 'coverage'],
    //transpile
    preprocessors: {
      'test/coverage/**.js': ['webpack', 'coverage'],
    },
    coverageReporter: {
      instrumenters:{

      },
      reporters: [
        {
          type: 'lcovonly',
          dir: 'coverage',
          subdir: 'report-lcov',
        },
        { type: 'html', subdir: 'report-html', dir: 'coverage' },
        {
          type: 'cobertura',
          dir: 'coverage',
          subdir: '.',
          file: 'cobertura.txt',
        },
        {
          type: 'teamcity',
          dir: 'coverage',
          subdir: '.',
          file: 'teamcity.txt',
        },
        { type: 'json', dir: 'coverage', subdir: '.' },
      ],
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
