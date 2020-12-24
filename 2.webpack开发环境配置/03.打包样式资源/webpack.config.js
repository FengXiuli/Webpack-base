/*
  webpack.config.js  webpack的配置文件（src里面写项目代码，webpack写配置代码）
    作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）

    所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs。
*/

// resolve用来拼接绝对路径的方法
const {
  resolve
} = require('path');

module.exports = {
  // webpack配置
  // 入口起点
  entry: './src/index.js',
  // 输出（输出到build文件夹下面的built.js文件中）
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径
    // __dirname nodejs的变量，代表当前文件的目录绝对路径（表示的是与当前webpack.config.js平级的build文件夹）
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同loader处理
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次执行
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          'css-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader'
        ]
      }
    ]
  },
  // plugins的配置
  plugins: [
    // 详细plugins的配置
  ],
  // 模式（表示使用什么模式）
  mode: 'development', // 开发模式
  // mode: 'production'
}

/*
  执行的步骤：只分析less（安装loader:style-loader css-loader less-loader less）(css只需要安装前面两个loader)
    1. 根据entry找到入口文件'./src/index.js'
    2. 发现入口文件中引入了.less文件，而.less文件不是js或者json文件，去找module的rules里面寻找less的loader
    3. 找到test: /\.less$/，执行该对象中的rules数组中的代码（从右到左，从下到上 依次执行）
    4. 通过less-loader将less文件编译成css文件
    5. 通过css-loader将css文件变成commonjs模块加载js中，里面内容是样式字符串
    6. 通过style-loader创建style标签，将js中的样式资源插入进行，添加到head中生效
    7. 将代码添加到出口文件与当前webpack.config.js平级的build文件夹下面的built.js文件中
*/