const webpack = require('webpack');
const path = require('path');
const packageJson = require('./package.json');
const packageName = packageJson.name;
const libraryName = getLibraryName(packageName);

const version = packageJson.version;

function getLibraryName(packageName) {
  return packageName
    .toLowerCase()
    .split('-')
    .map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('');
}

function getConfig(env) {
  return {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    node: {
      global: false,
      __filename: false,
      __dirname: false,
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    target: 'node',
    output: {
      filename: 'Server.js',
      library: libraryName,
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
      globalObject: 'this'
    }
  };
}

function fillDev(config) {
  config.mode = 'development';
  config.entry = './src/Server/Server.ts';

  config.devtool = 'inline-source-map';
}

function fillProd(config) {
  config.mode = 'production';
  config.entry = './src/Server/Server.ts';
}

module.exports = (env) => {
  const config = getConfig(env);

  if (env.DEVELOPMENT === true) {
    fillDev(config);
  } else if (env.PRODUCTION === true) {
    fillProd(config);
  } else {
    throw 'Please set the environment!';
  }

  return config;
};