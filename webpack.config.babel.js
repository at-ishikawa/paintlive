import path from 'path';
import webpack from 'webpack';

var environment = 'development';
if (process.env.NODE_ENV == 'production') {
  environment = 'production';
}

const srcDir = '/src';
const distDir = '/dist';

let configs = {
  devtool: 'eval-source-map',
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
      '.scss'
    ],
    root: [
      path.join(__dirname, srcDir + '/js'),
      path.join(__dirname, srcDir + '/sass')
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
          'css'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          "style",
          "css",
          "sass"
        ]
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  },
  cssLoader: {
    sourceMap: true
  },
  sassLoader: {
    sourceMap: true,
    includePaths: [
      path.resolve(__dirname, srcDir + "/sass")
    ]
  },
  externals: {
    'Env': JSON.stringify(require('./.env.' + environment + '.json'))
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(environment)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
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
}

export default configs;
