import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArticlesListsPagesSchema } from '../types/articlesListsPages';

const initialState: ArticlesListsPagesSchema = {
    pages: {},
};

export const articlesListsPagesSlice = createSlice({
    name: 'ArticlesListsPages',
    initialState,
    reducers: {
        setPage: {
            reducer: (state, { payload }: PayloadAction<{pathname: string, page: number}>) => {
                state.pages[payload.pathname] = payload.page;
            },
            prepare: (pathname: string, page: number) => ({ payload: { pathname, page } }),
        },
    },
});

export const { actions: articlesListsPagesActions } = articlesListsPagesSlice;
export const { reducer: articlesListsPagesReducer } = articlesListsPagesSlice;
