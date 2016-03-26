const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true
  },
  output: {
    filename: '/js/main.js',
    path: path.resolve(__dirname, build)
  },
  plugins: [
    new ExtractTextPlugin('css/main.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: src + '/index.html',
      inject: 'head'
    })
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, src), path.resolve(__dirname, src + '/sass/common/')]
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
      },
      {
        test: /fonts\/*/,
        exclude: /node_modules/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      }
    ]
  }
};