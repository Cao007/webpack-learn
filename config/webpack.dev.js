const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map", // 生成source-map文件，行映射
  entry: "./src/main.js",
  output: {
    path: undefined, // 开发环境不需要指定输出目录
    filename: "static/js/[name].js", // 将js文件输出到dist/static/js/目录下
  },
  module: {
    rules: [
      {
        oneOf: [
          // scss
          {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          // js
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: "babel-loader",
            },
          },
          // 图片资源
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 20 * 1024, // 小于20kb的图片会被base64处理
              },
            },
            generator: {
              filename: "static/imgs/[hash:8][ext][query]", // 将图片输出到dist/static/imgs/目录下
            },
          },
          // 字体资源
          {
            test: /\.(woff2?|eot|ttf|otf|svg)$/,
            type: "asset/resource",
            generator: {
              filename: "static/fonts/[hash:8][ext][query]", // 将字体输出到dist/static/fonts/目录下
            },
          },
          // 音视频资源
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:8][ext][query]", // 将音视频输出到dist/static/media/目录下
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // html模版
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // ESlint
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"), // 检查src目录下的文件
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  devServer: {
    host: "localhost",
    port: "5500",
    open: true,
  },
};
