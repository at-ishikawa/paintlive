import path from 'path';
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';
import postcssFor from 'postcss-for';
import postcssImport from 'postcss-import';

var environment = 'development';
if (process.env.NODE_ENV == 'production') {
  environment = 'production';
}
const srcDir = '/src';
const distDir = '/dist';

let cache = false;
let devtool = '#cheap-source-map';
let babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel",
  query: {
    presets: [
      "react",
      "es2015",
      "stage-0"
    ]
  }
};
let cssLoader = "css?importLoaders=1&modules";
let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(environment)
    }
  })
];

if (environment == 'development') {
  cache = true;
  devtool = 'inline-source-map';
  babelLoader.query.cacheDirectory = true;
  cssLoader += "&sourceMap&localIdentName=[name]--[local]--[hash:base64]";
} else {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    comments: false,
    compress: {
      warnings: false
    }
  }));
}

let configs = {
  devtool: devtool,
  cache: cache,
  entry: {
    application: path.join(__dirname, srcDir + '/js/application.js')
  },
  output: {
    path: path.join(__dirname, distDir + '/js'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.css'
    ],
    root: [
      path.join(__dirname, srcDir + '/js'),
      path.join(__dirname, srcDir + '/css')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file'
      },
      babelLoader,
      {
        test: /\.css$/,
        loaders: [
          'style',
          cssLoader,
          'postcss'
        ]
      }
    ]
  },
  postcss: [
    postcssImport,
    postcssFor,
    cssnext
  ],
  externals: {
    'Env': JSON.stringify(require('./.env.' + environment + '.json'))
  },
  plugins: plugins
};

export default configs;
