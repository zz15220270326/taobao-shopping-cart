const HtmlWebpackPlugin = require('html-webpack-plugin'),
			UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
			MiniCssExtractPlugin = require('mini-css-extract-plugin'),
			autoprefixer = require('autoprefixer');

const { resolve } = require('path');

const mode = 'production', // 'development' | 'production'
			isProduction = mode === 'production';

const configs = {
	mode,
	entry: {
		'index': resolve(__dirname, './src/js/index'),
		'detail': resolve(__dirname, './src/js/detail'),
		'cart': resolve(__dirname, './src/js/cart'),
	},
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'js/[name]-[hash:8].js'
	},
	plugins: [
    new UglifyJsPlugin({
			extractComments: isProduction,
			uglifyOptions: {
				compress: isProduction,
				warnings: !isProduction,
			},
		}),
    new HtmlWebpackPlugin({
    	minify: {
    		removeComments: isProduction,
    		collapseWhitespace: isProduction,
    	},
    	filename: 'index.html',
    	template: resolve(__dirname, 'src/index.html'),
    	title: '商品列表',
    	excludeChunks: ['node_modules'],
    	chunks: ['index'],
    	hash: isProduction,
    }),
    new HtmlWebpackPlugin({
    	minify: {
    		removeComments: isProduction,
    		collapseWhitespace: isProduction,
    	},
    	filename: 'detail.html',
    	template: resolve(__dirname, 'src/detail.html'),
    	title: '商品详情',
    	excludeChunks: ['node_modules'],
    	chunks: ['detail'],
    	hash: isProduction,
    }),
    new HtmlWebpackPlugin({
    	minify: {
    		removeComments: isProduction,
    		collapseWhitespace: isProduction,
    	},
    	filename: 'cart.html',
    	template: resolve(__dirname, 'src/cart.html'),
    	title: '购物车管理',
    	excludeChunks: ['node_modules'],
    	chunks: ['cart'],
    	hash: isProduction,
    }),
	],
	module: {
		rules: [
      {
      	test: /\.js$/,
      	use: {
      		loader: 'babel-loader',
      		options: {
	          presets: ['@babel/preset-env']
	        }
      	},
      	exclude: /node_modules/,
      },
      {
      	test: /\.css$/,
      	use: [
          'style-loader',
          'css-loader',
          {
          	loader: 'postcss-loader',
          	options: {
          		postcssOptions: {
          			plugins: () => [autoprefixer('last 5 versions')]
          		}
          	}
          }
      	]
      },
      {
      	test: /\.(scss|sass)$/,
      	use: [
          'style-loader',
          'css-loader',
          {
          	loader: 'postcss-loader',
          	options: {
          		postcssOptions: {
          			plugins: function () {
          				return [autoprefixer('last 5 versions')];
          			}
          		}
          	}
          },
          'sass-loader',
      	]
      },
      {
        test: /\.(jpg|png|jpeg|gif|ico)$/i,
        use: [
          // 'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: 'img/[name]-[hash:16].[ext]'
            }
          },
          'image-webpack-loader'
        ]
      }
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@': resolve(__dirname, 'src/')
		}
	},
	devServer: {
		port: 9000,
		host: 'localhost',
	},
	...(
    isProduction
    ? {}
    : { devtool: 'source-map' }
	),
	target: ['web', 'es5']
};

module.exports = configs;
