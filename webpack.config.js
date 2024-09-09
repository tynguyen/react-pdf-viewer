const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: './.babelrc', // Explicitly point to the Babel config file
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /pdf\.worker\.mjs$/,
        use: { loader: 'worker-loader' }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    // static: path.join(__dirname, 'dist'),
    static: {
        directory: path.join(__dirname, 'public'), // Serve static files from the public folder

    },
    compress: true,
    port: 9001,
  },
};