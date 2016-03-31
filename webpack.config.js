var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('webpack-html-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

process.env.NODE_ENV = process.env.NODE_ENV === 'development';

var ENV = process.env.NODE_ENV;

module.exports = {
  entry: {
    'vendor': './src/vendor.ts',
    'app': './src/app/index.ts'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: 'build'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.styl', '.html', '.css']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  debug: true,
  devtool: 'cheap-source-map',
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript', exclude: [/node_modules/, /\.spec.ts$/] },
      { test: /\.styl$/, loader: 'raw-loader!css-loader!stylus-loader' },
      { test: /\.css$/, loader: 'raw!css' },
      { test: /\.html$/, loader: 'raw' }
    ]
  },
  
  devServer: {
    historyApiFallback: true
  },

  plugins: [
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),
    new CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name].js',
        minChunks: Infinity
      }),
    new CommonsChunkPlugin({
      name: 'common',
      filename: '[name].js',
      minChunks: 2,
      chunks: ['app', 'vendor']
    }),
    new HtmlPlugin({
      template: './src/public/index.html',
      inject: true,
      hash: true,
      chunksSortMode: function(a, b) {
        // common always first
        if (a.names[0] === 'common') {
          return -1;
        }
        // app always last
        if (a.names[0] === 'app') {
          return 1;
        }
        // vendor before app
        if (a.names[0] === 'vendor' && b.names[0] === 'app') {
          return -1;
        } else {
          return 1;
        }
        // a must be equal to b
        return 0;
      }
    })
  ]
};
