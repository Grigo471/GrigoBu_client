import { PayloadAction } from '@reduxjs/toolkit';
import { ArticlesListsPagesSchema } from '../types/articlesList';
import { buildSlice } from '@/shared/lib/store';
import { ArticleSortField } from '../consts/consts';
import { SortOrder } from '@/shared/types';

const initialState: ArticlesListsPagesSchema = {
    pages: {},
    sorts: {},
    orders: {},
    searches: {},
};

export const articlesListsPagesSlice = buildSlice({
    name: 'ArticlesListsPages',
    initialState,
    reducers: {
        setPage: {
            reducer: (state, { payload }: PayloadAction<{pathname: string, page: number}>) => {
                state.pages[payload.pathname] = payload.page;
            },
            prepare: (pathname: string, page: number) => ({ payload: { pathname, page } }),
        },
        resetPage: (state, { payload }: PayloadAction<string>) => {
            state.pages[payload] = 1;
        },
        resetAllPages: (state) => {
            Object.keys(state.pages).forEach((key) => { state.pages[key] = 0; });
        },
        setSort: {
            reducer: (state, { payload }: PayloadAction<{
                pathname: string, sort: ArticleSortField
            }>) => {
                state.sorts[payload.pathname] = payload.sort;
            },
            prepare: (
                pathname: string,
                sort: ArticleSortField,
            ) => ({ payload: { pathname, sort } }),
        },
        setOrder: {
            reducer: (state, { payload }: PayloadAction<{
                pathname: string, order: SortOrder
            }>) => {
                state.orders[payload.pathname] = payload.order;
            },
            prepare: (
                pathname: string,
                order: SortOrder,
            ) => ({ payload: { pathname, order } }),
        },
        setSearch: {
            reducer: (state, { payload }: PayloadAction<{
                pathname: string, search: string
            }>) => {
                state.searches[payload.pathname] = payload.search;
            },
            prepare: (
                pathname: string,
                search: string,
            ) => ({ payload: { pathname, search } }),
        },
    },
});

export const {
    actions: articlesListsPagesActions,
    reducer: articlesListsPagesReducer,
    useActions: useArticlesListPageActions,
} = articlesListsPagesSlice;
