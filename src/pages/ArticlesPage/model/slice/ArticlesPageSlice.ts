import {
    PayloadAction,
    createSlice,
} from '@reduxjs/toolkit';
import {
    ArticleSortField,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';

const initialState: ArticlesPageSchema = {
    page: 1,
    sort: 'createdAt',
    search: '',
    order: 'desc',
    tags: [],
    tagsVisible: false,
};

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setTags: (state, action: PayloadAction<string[]>) => {
            state.tags = action.payload;
        },
        toggleTagsVisible: (state) => {
            state.tagsVisible = !state.tagsVisible;
        },
    },
});

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions,
} = articlesPageSlice;
