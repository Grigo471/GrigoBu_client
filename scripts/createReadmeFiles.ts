import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.md');
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// slice : entities, features, pages, widgets

const sliceMap: Record<string, string> = {
    pages: 'Страница',
    entities: 'Сущность',
    features: 'Фича',
    widgets: 'Виджет',
};

const createReadmeForSlice = (slice: string) => {
    if (!Object.keys(sliceMap).includes(slice)) {
        return;
    }

    const slicePaths = path.resolve(__dirname, '..', 'src', `${slice}`);
    const sliceDirectory = project.getDirectory(slicePaths);
    const componentsDirectories = sliceDirectory?.getDirectories();

    componentsDirectories?.forEach((directory) => {
        const readmeFilePath = `${directory.getPath()}/README.md`;
        const readmeFile = directory.getSourceFile(readmeFilePath);
        if (!readmeFile) {
            const sourceCode = `## ${sliceMap[slice]} ${directory.getBaseName()}`;
            const file = directory.createSourceFile(
                readmeFilePath,
                sourceCode,
                { overwrite: true },
            );
            file.save();
        }
    });
};

createReadmeForSlice('features');
createReadmeForSlice('entities');
createReadmeForSlice('widgets');
createReadmeForSlice('pages');

project.save();
