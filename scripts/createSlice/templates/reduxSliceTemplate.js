const firstCharLowerCase = require('../firstCharLowerCase');

module.exports = (sliceName) => {
    const componentName = firstCharLowerCase(sliceName);
    const typeName = `${sliceName}Schema`;

    return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ${typeName} } from '../types/${typeName}';

const initialState: ${typeName} = {
    
};

export const ${componentName}Slice = createSlice({
    name: '${componentName}',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {
           
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: ${componentName}Actions } = ${componentName}Slice;
export const { reducer: ${componentName}Reducer } = ${componentName}Slice;`;
};
