const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const glob = require('glob');

module.exports = {
  entry: {
    "main": "./src/js/main.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: './'
  },
  plugins: [
    new ImageminPlugin({
      externalImages: {
        context: '.',
        sources: glob.sync('src/images/**/*.{png,jpg,jpeg,gif,svg}'),
        destination: 'dist/images',
        fileName: '[name].[ext]'
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                    require('tailwindcss'),
                    require('autoprefixer')
                  ]
              }
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },  
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },  
    ]
  }
}