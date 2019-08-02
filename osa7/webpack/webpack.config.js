const path = require('path');
const webpack = require('webpack');

module.exports = config = (env, argv) => {
  console.log('argv', argv.mode);

  const backendUrl =
    argv.mode === 'production'
      ? 'https://radiant-plateau-25399.herokuapp.com/api/notes'
      : 'http://localhost:3001/notes';

  return {
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backendUrl),
      }),
    ],
  };
};
