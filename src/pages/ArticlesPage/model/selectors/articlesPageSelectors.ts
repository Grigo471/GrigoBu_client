import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1;

export const getArticlesPageOrder = (state: StateSchema) => state.articlesPage?.order ?? 'desc';

export const getArticlesPageSort = (
    state: StateSchema,
) => state.articlesPage?.sort ?? 'createdAt';

export const getArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? '';

export const getArticlesPageTags = (state: StateSchema) => state.articlesPage?.tags;

export const getArticlesPageMyRateFilter = (
    state: StateSchema,
) => state.articlesPage?.myRateFilter;

export const getArticlesPageTagsVisible = (
    state: StateSchema,
) => state.articlesPage?.tagsVisible ?? false;
