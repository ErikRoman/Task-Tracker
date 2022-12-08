const path = require( 'path' )


module.exports = {
  entry: [ 'babel-polyfill', './Source/index.js' ],

  output: {
    path: path.resolve( __dirname, 'Public/Scripts' ),
    filename: 'bundle.js'
  },

  module: {
    rules: [ {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [ 'env' ]
        }
      }
    } ]
  },

  devServer: {
    contentBase: path.resolve( __dirname, 'Public' ),
    publicPath: '/Scripts/'
  },

  devtool: 'source-map'
}