import webpack from 'webpack';
import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths, BuildMode } from './config/build/types/config';

function getApiUrl(mode: BuildMode, apiUrl?: string) {
    if (apiUrl) {
        return apiUrl;
    }
    if (mode === 'production') {
        return 'https://griboo.ru/api';
    }

    return 'http://localhost:5000';
}

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        locales: path.resolve(__dirname, 'public', 'locales'),
        buildLocales: path.resolve(__dirname, 'build', 'locales'),
        assets: path.resolve(__dirname, 'public', 'assets'),
        buildAssets: path.resolve(__dirname, 'build', 'assets'),
        favicon: path.resolve(__dirname, 'src', 'shared', 'assets', 'icons', 'igloo.svg'),
    };

    const mode = env?.mode || 'development';
    const isDev = mode === 'development';
    const PORT = env?.port || 3000;
    const analyze = !!env?.analyze;
    const apiUrl = getApiUrl(mode, env?.apiUrl);

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        analyze,
        apiUrl,
        project: 'frontend',
    });

    return config;
};
