import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1;

export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 5;

export const getArticlesPageOrder = (state: StateSchema) => state.articlesPage?.order ?? 'desc';

export const getArticlesPageSort = (
    state: StateSchema,
) => state.articlesPage?.sort ?? 'createdAt';

export const getArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? '';
