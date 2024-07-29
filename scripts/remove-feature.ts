import {
    JsxAttribute, Node, Project, SyntaxKind,
} from 'ts-morph';

const removeFeatureName = process.argv[2];
const featureState = process.argv[3]; // on/off

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

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
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
            res = true;
        }
    });
    return res;
}

function isToggleComponent(node: Node): boolean {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);
    return identifier?.getText() === toggleComponentName;
}

const replaceToggleFunction = (node: Node) => {
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
};

const getAttributeByName = (
    jsxAttributes: JsxAttribute[],
    name: string,
) => jsxAttributes.find((node) => node.getName() === name);

const getReplacedComponent = (attribute?: JsxAttribute) => {
    const value = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText();
    if (value?.startsWith('(')) return value.slice(1, -1);
    return value;
};

const replaceToggleComponent = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    const onAttribute = getAttributeByName(attributes, 'on');
    const offAttribute = getAttributeByName(attributes, 'off');
    const featureNameAttribute = getAttributeByName(attributes, 'feature');

    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);
    if (featureName !== removeFeatureName) return;

    const onValue = getReplacedComponent(onAttribute);
    const offValue = getReplacedComponent(offAttribute);

    if (featureState === 'on' && onValue) {
        node.replaceWithText(onValue);
    }

    if (featureState === 'off' && offValue) {
        node.replaceWithText(offValue);
    }
};

files.forEach((sourceFile) => {
    // eslint-disable-next-line consistent-return
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            return replaceToggleFunction(node);
        }

        if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
            return replaceToggleComponent(node);
        }
    });
});

project.save();
