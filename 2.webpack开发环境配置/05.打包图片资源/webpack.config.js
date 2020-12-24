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
    rules: [{
      test: /\.less$/,
      // 要使用多个loader处理用use
      use: ['style-loader', 'css-loader', 'less-loader']
    }, {
      // 问题：默认处理不了html中img图片
      // 处理图片资源
      test: /\.(jpg|png|gif)$/,
      // 使用一个loader
      // 下载 url-loader file-loader(url-loader依赖于file-loader)
      loader: 'url-loader',
      options: {
        // 图片大小小于8kb，就会被base64处理（通常小图片(8-12kb)使用limit进行这种处理，如果有9kb的图片，我们可以将limit写成10 * 1024）
        // 优点: 减少请求数量（减轻服务器压力）
        // 缺点：图片体积会更大（文件请求速度更慢）
        limit: 8 * 1024,
        // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
        // 解析时会出问题：[object Module]
        // 解决：关闭url-loader的es6模块化，使用commonjs解析
        esModule: false,
        // 给图片进行重命名
        // [hash:10]取图片的hash的前10位
        // [ext]取文件原来扩展名
        name: '[hash:10].[ext]'
      }
    }, {
      test: /\.html$/,
      // 处理html文件的img图片,而不是处理html文件的，html文件是用HtmlWebpackPlugin处理的（负责引入img，从而能被url-loader进行处理）
      loader: 'html-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
};
/*
  执行的步骤：打包图片资源（安装loader:url-loader file-loader html-loader）
    1. 根据entry找到入口文件'./src/index.js'
    2. 发现入口文件中引入了jpg|png|gif文件，而jpg|png|gif文件不是js或者json文件，去找module的rules里面寻找jpg|png|gif的loader
    3. 找到test: /\jpg|png|gifs$/，执行该对象中的rules数组中的代码
    4. 通过options-->limit对体积进行限制
    5. 这种方式只能处理样式中引入的图片，不能处理html中引入的图片，如果要处理htnl中引入的资源，需要使用html-loader
    6. 处理html中引入的图片需要找到test: /\jpg|png|gifs$/，执行里面的html-loader
    7. 但是解析时图片的名称会出现[object Module]问题，这是因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，使用esModule: false关闭url-loader的es6模块化，使用commonjs解析即可
    8. 使用name: '[hash:10].[ext]'给图片进行重命名
*/