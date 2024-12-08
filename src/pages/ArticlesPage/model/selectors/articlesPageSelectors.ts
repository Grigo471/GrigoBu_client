import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPageTags = (state: StateSchema) => state.articlesPage?.tags;

export const getArticlesPageMyRateFilter = (
    state: StateSchema,
) => state.articlesPage?.myRateFilter;

export const getArticlesPageTagsVisible = (
    state: StateSchema,
) => state.articlesPage?.tagsVisible ?? false;
