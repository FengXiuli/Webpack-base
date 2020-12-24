const {
  resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        /*
          css兼容性处理：postcss --> postcss-loader postcss-preset-env（作用：postcss-preset-env帮助postcss识别环境从而加载对应的配置，从而使得代码兼容每一个浏览器的版本）

         postcss-preset-env： 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式

          //browserslist要写在package.json中
          "browserslist": {
            // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
            "development": [
              "last 1 chrome version",//兼容最近的版本
              "last 1 firefox version",
              "last 1 safari version"
            ],
            // 生产环境：默认是看生产环境
            "production": [
              ">0.2%",
              "not dead",//不用已经死的浏览器
              "not op_mini all"//不用op_mini版本的浏览器
            ]
          }
        */
        // 使用loader的默认配置
        // 'postcss-loader',
        // 修改loader的配置，写成下面的对象的形式
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              // postcss的插件
              require('postcss-preset-env')()
            ]
          }
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ],
  mode: 'development'
};