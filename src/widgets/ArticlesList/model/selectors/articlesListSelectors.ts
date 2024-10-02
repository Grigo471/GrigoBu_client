import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const getArticlesListIsLoading = (
    state: StateSchema,
) => state.articlesList?.isLoading || false;

export const getArticlesListError = (state: StateSchema) => state.articlesList?.error || undefined;

export const getArticlesListNum = (state: StateSchema) => state.articlesList?.page || 1;

export const getArticlesListLimit = (state: StateSchema) => state.articlesList?.limit || 9;

export const getArticlesListHasMore = (state: StateSchema) => state.articlesList?.hasMore;

export const getArticlesListOrder = (state: StateSchema) => state.articlesList?.order ?? 'asc';

export const getArticlesListInited = (state: StateSchema) => state.articlesList?._inited;

export const getArticlesListSort = (
    state: StateSchema,
) => state.articlesList?.sort ?? 'createdAt';

export const getArticlesListSearch = (state: StateSchema) => state.articlesList?.search ?? '';

export const [useGetArticleItemById] = buildSelector(
    (state, id: string) => state.articlesList?.entities[id],
);
