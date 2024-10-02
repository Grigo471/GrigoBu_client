import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleTagsSelectorSchema } from '../types/ArticleTagsSelectorSchema';
import { fetchArticleTags } from '../services/fetchArticleTags';

const initialState: ArticleTagsSelectorSchema = {
    tags: [],
    isLoading: false,
};

export const ArticleTagsSelectorSlice = createSlice({
    name: 'ArticleTagsSelector',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchArticleTags.pending,
                (state) => {
                    state.isLoading = true;
                },
            )
            .addCase(
                fetchArticleTags.fulfilled,
                (state, action: PayloadAction<string[]>) => {
                    state.isLoading = false;
                    state.error = undefined;
                    state.tags = action.payload;
                },
            )
            .addCase(
                fetchArticleTags.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export const { actions: articleTagsSelectorActions } = ArticleTagsSelectorSlice;
export const { reducer: articleTagsSelectoreReducers } = ArticleTagsSelectorSlice;
