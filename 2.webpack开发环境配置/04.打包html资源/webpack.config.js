/*
  loader: 1. 下载   2. 使用（配置loader）
  plugins: 1. 下载  2. 引入  3. 使用
*/
const {
  resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader的配置
    ]
  },
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件,需要添加一个template
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html'
    })
  ],
  mode: 'development'
};
/*
  执行的步骤：html(安装plugin:html-webpack-plugin)
    1. 根据entry找到入口文件'./src/index.js'
    2. 发现入口文件中引入了html文件，而html文件不是js或者json文件，去plugins数组中找到HtmlWebpackPlugin插件
    3. 复制template选项中的文件，
    4. 通过less-loader将less文件编译成css文件，自动引入打包输出的所有资源（JS/CSS）（JS文件通过script标签引入，CSS文件通过link标签引入）（不需要自己再引用了，否则重复引入会出问题的）
*/