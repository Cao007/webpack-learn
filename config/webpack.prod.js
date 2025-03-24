const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 所有文件输出到dist目录下
    filename: "static/js/[name].js", // 将js文件输出到dist/static/js/目录下
    clean: true, // 每次构建时清理/dist目录
  },
  module: {
    rules: [
      // css
      {
        test: /\.css$/i,
        use: getStyleLoaders(),
      },
      // scss
      {
        test: /\.s[ac]ss$/i,
        use: getStyleLoaders("sass-loader"),
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
  plugins: [
    // html模版
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // css抽离
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
    }),
    // css压缩
    new CssMinimizerPlugin(),
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
};
