const path = require('path');

module.exports = {
  context: __dirname + '/test',
  output: {
    // where we want to output built files
    path: __dirname + '/test',
  },
  mode: 'development',
  entry: {
    'p5.test': './karma_test.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
};
