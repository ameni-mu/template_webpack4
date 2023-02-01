const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
  mode: 'production',
  entry:{
    home: './src/assets/js/home.js',
  },
  devtool: 'inline-source-map',
  output:{
    path: path.join(__dirname, './dist/assets/js'),
    filename:'[name].js',
    publicPath:'/dist/assets/js/'
  },
  module:{
    rules:[
      {
        test:/\.js?$/,
        exclude:/node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets:['@babel/preset-env']
            },
          }
        ],
      },
    ]
  },
  plugins:[
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: path.join(__dirname, './dist/index.html'),
      inject: false,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '/dist')
  }
},
{
  mode: 'production',
  entry:{
    home: './src/assets/scss/home.scss',
  },
  output:{
    path: path.join(__dirname, './dist/assets/css'),
    filename:'[name].css',
    publicPath:'/dist/assets/css/'
  },
  module:{
    rules:[
      {
        test:/\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
          'import-glob-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'url-loader',
        options: {
          limit: 0,
          name: '[path][name].[ext]',
          outputPath: function (path,resourcePath,context) {
            return '../../' + path.replace('src/', '');
          },
          publicPath: function (path,resourcePath,context) {
            return '../../' + path.replace('src/', '');
          }
        }
      },
    ],
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: './[name].css',
    }),
  ],
  optimization: {
    minimize: true,
  },
},
];
