const path = require("path");
//webpack中的所有的配置文件都应该写在module.exports中
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  //指定入口文件
  entry: "./src/index.ts",
  output: {
    //指定打包文件夹的目录
    path: path.resolve(__dirname, "dist"),
    //打包后的文件
    filename: "bundle.js",
    //兼容老版本的ie   
    environment: {
            arrowFunction: false,
            const:false
        } 
  },
  //指定webpack打包时使用的模块
  module: {
    //指定加载的规则
    rules: [
      //test指定规则生效的文件,正则表达式
      {
        test: /\.ts$/,
        //要使用的loader
        use: [
          {
            //指定加载器
            loader: "babel-loader",
            //设置babel
            options: {
              //设置预定义的环境
              presets: [
                //指定环境的插件
                [
                  "@babel/preset-env",
                  //配置信息
                  {
                    targets: {
                      chrome: "58",
                    },
                    /*  bugfixes: true, */
                    //指定corejs的版本
                    corejs: "3",
                    //使用corejs的方式usage表示按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        exclude: /node_modules/,
      },
      //指定设置less文件的处理
      {
        test:/\.less$/,
        use:[
          "style-loader",
          "css-loader",
          //引入postcss
          {
            loader:"postcss-loader",
            options:{
              postcssOptions:{
                plugins:[
                  [
                    "postcss-preset-env",
                    {
                      browsers:'last 2 version'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ],
  },
  //配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:'./src/index.html',//模板文件的路径
      filename:'index.html'//生成的html的输出路径
    })
  ],
  mode: "development",
  //用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"],
  },
};
