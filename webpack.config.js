const webpack = require('webpack');
module.exports = {
  entry: [
    './static/js/app.js',
  ],
  output: {
    path: __dirname + '/static/js/build/',
    filename: 'bundle.min.js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
  ],
};
