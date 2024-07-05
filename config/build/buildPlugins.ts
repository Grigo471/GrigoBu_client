import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { WebpackPluginInstance } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({
    paths,
    isDev,
    analyze,
    apiUrl,
    project,
}: BuildOptions): WebpackPluginInstance[] {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: analyze ? 'server' : 'disabled',
        }),
        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
            },
        }),
    ];

    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new ReactRefreshWebpackPlugin());
        plugins.push(new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }));
    }

    return plugins;
}
