import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleEditPageForm = (state: StateSchema) => state.articleEditPage?.form;

export const getArticleEditPageIsLoading = (state: StateSchema) => state.articleEditPage?.isLoading;

export const getArticleEditPageError = (state: StateSchema) => state.articleEditPage?.error;

export const getArticleEditPageIsPreview = (state: StateSchema) => state.articleEditPage?.isPreview;

export const getArticleEditPageValidateErrors = (
    state: StateSchema,
) => state.articleEditPage?.validateErrors;