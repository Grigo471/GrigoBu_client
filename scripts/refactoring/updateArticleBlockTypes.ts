import { Node, Project, SyntaxKind } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isArticleBlockType(node: Node): boolean {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);
    return identifier?.getText() === 'ArticleBlockType';
}

function replaceEnumWithType(node: Node) {
    const type = node.getDescendantsOfKind(SyntaxKind.Identifier)[1].getText();
    switch (type) {
    case 'TEXT':
        node.replaceWithText('"text"');
        break;
    case 'CODE':
        node.replaceWithText('"code"');
        break;
    case 'IMAGE':
        node.replaceWithText('"image"');
        break;
    default: break;
    }
}

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.PropertyAccessExpression) && isArticleBlockType(node)) {
            return replaceEnumWithType(node);
        }
    });
});

project.save();
