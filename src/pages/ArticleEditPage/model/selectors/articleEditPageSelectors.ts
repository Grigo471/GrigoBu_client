import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleEditPageForm = (state: StateSchema) => state.articleEditPage?.form;

export const getArticleEditPageTags = (state: StateSchema) => state.articleEditPage?.form.tags;

export const getArticleEditPageIsLoading = (state: StateSchema) => state.articleEditPage?.isLoading;

export const getArticleEditPageError = (state: StateSchema) => state.articleEditPage?.error;

export const getArticleEditPageIsPreview = (state: StateSchema) => state.articleEditPage?.isPreview;

export const getArticleEditPageValidateErrors = (
    state: StateSchema,
) => state.articleEditPage?.validateErrors;

export const getArticleEditPageBlocksLength = (
    state: StateSchema,
) => state.articleEditPage?.form.blocks.length;
