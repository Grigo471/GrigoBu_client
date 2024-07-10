import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.stories.tsx');

const files = project.getSourceFiles();

files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();

        if (value === '@/app/providers/ThemeProvider') {
            importDeclaration.setModuleSpecifier('@/shared/const/theme');
        }
    });
});

project.save();
