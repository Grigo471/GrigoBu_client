import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
	const babelLoader = {
		test: /\.(js|jsx|ts|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
				plugins: [
					['i18next-extract',
						{
							locales: ['ru', 'en'],
							keyAsDefaultValue: true,
						},
					],
				],
			},
		},
	};

	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	};

	const cssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resPath: string) => Boolean(resPath.includes('.module.scss')),
						localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
					},
				},
			},
			'sass-loader',
		],
	};

	const typescriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	};

	const fileLoader = {
		test: /\.(png|jpe?g|gif)$/i,
		use: [
			{
				loader: 'file-loader',
			},
		],
	};

	return [
		babelLoader,
		typescriptLoader,
		cssLoader,
		svgLoader,
		fileLoader,
	];
}
