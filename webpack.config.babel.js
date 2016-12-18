import path from 'path';
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';
import postcssImport from 'postcss-import';

var environment = 'development';
if (process.env.NODE_ENV == 'production') {
  environment = 'production';
}
const srcDir = '/src';
const distDir = '/dist';

let configs = {
  devtool: 'inline-source-map',
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
    preLoaders: [],
    loaders: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file'
      },
      {
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
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?importLoaders=1&sourceMap&modules&localIdentName=[name]--[local]--[hash:base64]',
          'postcss'
        ]
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  },
  postcss: [
    postcssImport,
    cssnext
  ],
  externals: {
    'Env': JSON.stringify(require('./.env.' + environment + '.json'))
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(environment)
      }
    })
  ]
};

if (environment == 'development') {
  configs['module']['preLoaders'].push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "eslint"
  });
} else {
  configs.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    }
  }));
}

export default configs;
