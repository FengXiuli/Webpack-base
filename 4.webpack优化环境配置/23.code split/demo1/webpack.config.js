const {
  resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 单入口打包输出一个文件，多入口打包输出多个文件，有几个入口便打包输出多少个文件
  // 单入口（单页面应用程序使用单入口）（开发时单入口应用使用的多）
  // entry: './src/js/index.js',
  entry: {
    // 多入口：有一个入口，最终输出就有一个bundle（多页面应用程序使用多入口）
    index: './src/js/index.js',
    test: './src/js/test.js'
  },
  output: {
    // [name]：取文件名（比如上面的entry中名称为index,那么输出的文件名首部会有index名称）
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  mode: 'production'
};