export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    locales: string;
    buildLocales: string;
    favicon?: string;
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
    analyze?: boolean;
    apiUrl: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    analyze?: boolean;
    apiUrl: string;
    project: 'storybook' | 'frontend' | 'jest';
}
