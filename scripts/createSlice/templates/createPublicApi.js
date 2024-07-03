const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');

module.exports = async (layer, sliceName) => {
    const schemaName = `${sliceName}Schema`;

    try {
        await fs.writeFile(
            resolveRoot('src', layer, sliceName, 'index.ts'),
            `export { ${sliceName} } from './ui/${sliceName}/${sliceName}';
export { ${schemaName} } from './model/types/${schemaName}';`,
        );
    } catch (e) {
        console.log('Не удалось создать PUBLIC API');
    }
};
