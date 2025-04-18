import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleEditPageForm = (
    state: StateSchema,
) => (state.articleEditPage?.isEdit
    ? state.articleEditPage?.editForm
    : state.articleEditPage?.createForm);

export const getArticleEditPageTags = (state: StateSchema) => (
    state.articleEditPage?.isEdit
        ? state.articleEditPage?.editForm.tags
        : state.articleEditPage?.createForm.tags);

export const getArticleEditPageIsLoading = (state: StateSchema) => state.articleEditPage?.isLoading;

export const getArticleEditPageError = (state: StateSchema) => state.articleEditPage?.error;

export const getArticleEditPageValidateErrors = (
    state: StateSchema,
) => state.articleEditPage?.validateErrors;

export const getArticleEditPageBlocksLength = (
    state: StateSchema,
) => (
    state.articleEditPage?.isEdit
        ? state.articleEditPage?.editForm.blocks.length
        : state.articleEditPage?.createForm.blocks.length);
