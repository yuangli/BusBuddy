var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		//When making a new page, add its js path here
		style: './src/sass/app.scss',
		home: './src/js/Home.js',
		user: './src/js/User.js'
	},
	
	output: {
		path: __dirname,
		filename: './build/js/[name]-bundle.js',
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
						loader: 'file-loader',
						options: {
							name: './build/css/screen.css'
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader', options:{
							sourceMap: true
						}
					}
				]
			}
		]
	}
};