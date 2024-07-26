import { Node, Project, SyntaxKind } from 'ts-morph';

const removeFeatureName = process.argv[2];
const featureState = process.argv[3]; // on/off

if (!removeFeatureName) {
    throw new Error('Missing feature name');
}
if (!featureState) {
    throw new Error('Missing feature state (on/off)');
}
if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Wrong feature state value (on/off)');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isToggleFunction(node: Node): boolean {
    let res = false;
    node.forEachChild((child) => {
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
            res = true;
        }
    });
    return res;
}

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
            if (!objectOptions) return;

            const onFunctionProperty = objectOptions.getProperty('on');
            const offFunctionProperty = objectOptions.getProperty('off');
            const featureNameProperty = objectOptions.getProperty('name');

            const onFunction = onFunctionProperty
                ?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const offFunction = offFunctionProperty
                ?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
            const featureName = featureNameProperty
                ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);

            if (featureName !== removeFeatureName) return;

            if (featureState === 'on') {
                node.replaceWithText(onFunction?.getBody().getText() ?? '');
            }

            if (featureState === 'off') {
                node.replaceWithText(offFunction?.getBody().getText() ?? '');
            }
        }
    });
});

project.save();
