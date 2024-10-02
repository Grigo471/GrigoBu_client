import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

const selectTags = (state: StateSchema) => state.articleTagsSelector?.tags;

export const getArticleAllTags = createSelector([selectTags], (tags) => tags || []);

export const getArticleTagsSelectorIsLoading = (
    state: StateSchema,
) => state.articleTagsSelector?.isLoading;

export const getArticleTagsSelectorError = (
    state: StateSchema,
) => state.articleTagsSelector?.error;
