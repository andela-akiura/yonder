const path = require('path');
module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js',
    ],
    plugins: ['karma-phantomjs-launcher', 'karma-mocha',
      'karma-sourcemap-loader', 'karma-webpack', 'karma-coverage',
      'karma-mocha-reporter'],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'jsCoverage/',
    },
    webpack: {
      devtool: 'inline-source-map',
      noParse: [
        /\/sinon\.js/,
        /node_modules\/sinon\//,
      ],
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            postLoaders: [{
              test: /\.jsx?$/,
              exclude: /(tests|node_modules|bower_components)\//,
              loader: 'istanbul-instrumenter' }],
            query: {
              presets: ['react', 'es2015', 'stage-0'],
            },
          },
        ],
      },
      resolve: {
        alias: {
          sinon: 'sinon/pkg/sinon',
        },
      },
      externals: {
        jsdom: 'window',
        cheerio: 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
      watch: true,
      chunks: false,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
