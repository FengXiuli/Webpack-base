const {
  resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /*
        语法检查： eslint-loader  eslint
          注意：只检查自己写的源代码，第三方的库是不用检查的
          设置检查规则：
            package.json中eslintConfig中设置~
              "eslintConfig": {
                "extends": "airbnb-base"
              }
            airbnb --> eslint-config-airbnb-base  eslint-plugin-import eslint
      */
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除第三方的代码，只检查自己的代码
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
};
/*
  1. 语法检查我们需要使用eslint-loader  eslint，所以先下载eslint-loader  eslint
  2. 使用exclude: /node_modules/排除第三方的代码，只检查自己的代码
  3. 语法检查通常采用airbnb（可以在网站https://github.com/topics/javascript中找出进行详细的看里面的介绍，我们想要将airbnb库与eslint结合在一起的话，去npmjs网站中搜索elsint找到eslint-config-airbnb-base，点进去根据需求下载安装即可，eslint-config-airbnb是可以检测react代码的，用到react编写代码的时候可以使用这个库），因此需要下载eslint-config-airbnb-base  eslint-plugin-import eslint
  4. 在package.json中配置语法检查采用的标准
  5. 检查出现语法问题的代码使用fix: true实现自动修复eslint出现的语法错误
  6. 如果在代码中使用console.log()等语法，eslint会出现提示警告，此时我们可以在console.log()上一行加上一行注释// eslint-disable-next-line表示下一行eslint所有规则都失效（下一行不进行eslint检查）
*/