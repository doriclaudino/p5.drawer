const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');

const autoInjectVersionConfig = {
  SILENT: true,
  SHORT: 'p5.drawer',
  components: {
    AutoIncreaseVersion: false,
    InjectAsComment: true,
    InjectByTag: false,
  },
  componentsOptions: {
    InjectAsComment: {
      tag: 'Version: {version} - {date}',
      dateFormat: 'yyyy-mm-dd',
      multiLineCommentType: true,
    },
  },
};

const common = {
  context: __dirname + '/src',
  output: {
    // where we want to output built files
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
};

const prod = {
  ...common,
  entry: {
    'p5.drawer': './index.js',
    'p5.drawer.min': './index.js',
  },
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    runtimeChunk: true,
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: fs.readFileSync('./fragments/before.frag').toString(),
      raw: true,
    }),
    new WebpackAutoInject(autoInjectVersionConfig),
  ],
  module: {
    rules: [
      ...common.module.rules,
      {
        test: /node_modules(\.*)/,
        use: {
          loader: 'uglify-loader',
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: [/\.min\.js$/],
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
          ecma: 6,
          mangle: true,
          output: {
            comments: false,
          },
        },
        sourceMap: true,
      }),
    ],
  },
};

const dev = {
  ...common,
  mode: 'development',
  entry: {
    'p5.drawer': './index.js',
  },
};

const test = {
  mode: 'development',
};

module.exports = {
  prod,
  dev,
  test,
};
