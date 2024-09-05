import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const getArticlesPageIsLoading = (
    state: StateSchema,
) => state.articlesPage?.isLoading || false;

export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error || undefined;

export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1;

export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 9;

export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;

export const getArticlesPageOrder = (state: StateSchema) => state.articlesPage?.order ?? 'asc';

export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited;

export const getArticlesPageSort = (
    state: StateSchema,
) => state.articlesPage?.sort ?? 'createdAt';

export const getArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? '';

export const [useGetArticleItemById] = buildSelector(
    (state, id: string) => state.articlesPage?.entities[id],
);
