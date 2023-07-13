import webpack, { type Configuration } from 'webpack';
import 'webpack-dev-server';
import path from 'path';
import * as process from 'process';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as dotenv from 'dotenv';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

dotenv.config();

const config: Configuration = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	devServer: {
		hot: true,
		host: process.env.HOST,
		port: process.env.PORT,
		open: true,
	},
	resolve: {
		modules: [path.resolve(__dirname, './src'), 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new webpack.EnvironmentPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
	],
};

export default config;
