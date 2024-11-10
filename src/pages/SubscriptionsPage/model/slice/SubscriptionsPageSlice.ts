import {
    PayloadAction,
    createSlice,
} from '@reduxjs/toolkit';
import {
    ArticleSortField,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { SubscriptionsPageSchema } from '../types/SubscriptionsPageSchema';

const initialState: SubscriptionsPageSchema = {
    uncollapsedCards: [],
    page: 1,
    limit: 5,
    sort: 'createdAt',
    search: '',
    order: 'desc',
};

const subscriptionsPageSlice = createSlice({
    name: 'subscriptionsPageSlice',
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
        addUnCollapsedCards: (state, action: PayloadAction<string>) => {
            state.uncollapsedCards.push(action.payload);
        },
    },
});

export const {
    reducer: subscriptionsPageReducer,
    actions: subscriptionsPageActions,
} = subscriptionsPageSlice;
