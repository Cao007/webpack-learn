const path = require("path");
const os = require("os");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// 获取cpu核数
const threads = os.cpus().length;

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map", // 生成source-map文件，行映射
  entry: "./src/main.js",
  output: {
    path: undefined, // 开发环境不需要指定输出目录
    filename: "static/js/[name].js", // 将js文件输出到dist/static/js/目录下
    chunkFilename: "static/js/[name].chunk.js", // 动态导入导出资源命名方式
    assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式
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
            include: path.resolve(__dirname, "../src"),
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 进程数
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: false, // 关闭缓存文件压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
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
          },
          // 字体资源
          {
            test: /\.(woff2?|eot|ttf|otf|svg)$/,
            type: "asset/resource",
          },
          // 音视频资源
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
            type: "asset/resource",
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
      exclude: "/node_modules/", // 忽略node_modules目录下的文件
      context: path.resolve(__dirname, "../src"), // 检查src目录下的文件
      threads: threads, // 开启多进程
    }),
  ],
  optimization: {
    minimize: true, // 开启代码压缩
    minimizer: [
      // 多进程压缩
      new TerserPlugin({ parallel: threads }),
    ],
    splitChunks: {
      chunks: "all", // 对所有模块进行分割
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  devServer: {
    host: "localhost",
    port: "5371",
    open: true,
  },
};
