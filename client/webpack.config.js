var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		//When making a new page, add its js path here
		style1: './src/sass/app.scss',
		home1: './src/js/Home.js',
		user1: './src/js/User.js'
	},
	
	output: {
		path: __dirname,
		filename: './build/js/[name]-bundle.js'
	},
	watch: false,
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3001
	},
	devtool: "source-map",
	module: {
        rules: [
        	{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
			{  
				test: /\.scss$/,
		        use: [
		        	{
			            loader: MiniCssExtractPlugin.loader
			        },
			        {
			            loader: 'css-loader',
			            options: {
			              sourceMap: true
			            }
			        },
			        {
			            loader: 'sass-loader',
			            options: {
			              sourceMap: true			            }
			        }
		        ]
	      	}  
	    ]    
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "build/css/screen.css",
            chunkFilename: "build/css/screen.css"
        })
    ]
};