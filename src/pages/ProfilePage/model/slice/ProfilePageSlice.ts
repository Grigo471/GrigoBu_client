import {
    PayloadAction,
    createSlice,
} from '@reduxjs/toolkit';
import {
    ArticleSortField,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { ProfilePageSchema } from '../types/ProfilePageSchema';

const initialState: ProfilePageSchema = {
    page: 1,
    limit: 5,
    sort: 'createdAt',
    search: '',
    order: 'desc',
};

const profilePageSlice = createSlice({
    name: 'profilePageSlice',
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
    },
});

export const {
    reducer: profilePageReducer,
    actions: profilePageActions,
} = profilePageSlice;
