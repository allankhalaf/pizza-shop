const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.[contenthash].js',
    publicPath: './',
    clean: true,
    assetModuleFilename: 'images/[name][ext]'
  },
  
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      
      // SCSS / SASS / CSS
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              api: 'modern',
              sourceMap: true,
              sassOptions: {
                outputStyle: 'expanded',
                quietDeps: true,
                silenceDeprecations: ['legacy-js-api', 'import']
              }
            }
          }
        ]
      },
      
      // Images
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }
    ]
  },
  
plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css'
    }),
    
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images'),
          to: 'images',
          noErrorOnMissing: true
        }
      ]
    }),
    
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'head',
      chunks: ['main'],
      publicPath: './'
    }),
    new HtmlWebpackPlugin({
      template: './pages/about.html',
      filename: 'pages/about.html',
      inject: 'head',
      chunks: ['main'],
      publicPath: '../'
    }),
    new HtmlWebpackPlugin({
      template: './pages/contact.html',
      filename: 'pages/contact.html',
      inject: 'head',
      chunks: ['main'],
      publicPath: '../'
    }),
    new HtmlWebpackPlugin({
      template: './pages/pizza-margherita.html',
      filename: 'pages/pizza-margherita.html',
      inject: 'head',
      chunks: ['main'],
      publicPath: '../'
    }),
    new HtmlWebpackPlugin({
      template: './pages/pizza-vegetables.html',
      filename: 'pages/pizza-vegetables.html',
      inject: 'head',
      chunks: ['main'],
      publicPath: '../'
    }),
    new HtmlWebpackPlugin({
      template: './pages/pizza-chicken.html',
      filename: 'pages/pizza-chicken.html',
      inject: 'head',
      chunks: ['main'],
      publicPath: '../'
    }),
    new HtmlWebpackPlugin({
      template: './pages/cart.html',
      filename: 'pages/cart.html',
      inject: 'head',
      chunks: ['main'],
      publicPath: '../'
    }),
    new HtmlWebpackPlugin({
      template: './pages/privacy.html',
      filename: 'pages/privacy.html',
      inject: 'head',
      chunks: ['main'],
      publicPath: '../'
    }),
    new HtmlWebpackPlugin({
      template: './pages/careers.html',
      filename: 'pages/careers.html',
      inject: 'head',
      chunks: ['main'],
      publicPath: '../'
    })
  ],
  
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true
    }
  },
  
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
    }
  }
};