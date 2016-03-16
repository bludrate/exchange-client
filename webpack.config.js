const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const src = './src';
const build = './build';

function entrySources() {
  var res = [];

  if (process.env.NODE_ENV !== 'production') {
    res.push('webpack-dev-server/client?http://localhost:3000');
    res.push('webpack/hot/only-dev-server');
  }

  res.push(src + '/init.jsx');

  return res;
}

function stylesLoader() {
  if (process.env.NODE_ENV !== 'production') {
    return 'style-loader!css-loader!sass-loader!sass-bulk-import-loader';
  } else {
    return ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader!sass-bulk-import-loader');
  }
}

module.exports = {
  //devtool: 'cheap-module-source-map',
  entry: {
    main: entrySources()
  },
  devServer: {
    historyApiFallback: true
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, build),
    publicPath: 'http://localhost:3000/build'
  },
  plugins: [
    new ExtractTextPlugin('main.css')
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, src)]
  },
  module: {
    loaders: [
      {
        test: /\.js.?$/,
        loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: stylesLoader()
      }
    ]
  }
};