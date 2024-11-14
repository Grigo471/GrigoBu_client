import {
    PayloadAction,
    createSlice,
} from '@reduxjs/toolkit';
import {
    ArticleSortField,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { ProfilePageSchema } from '../types/ProfilePageSchema';

interface PayloadWithUsername<T> {
    arg: T;
    username: string;
}

const initialState: ProfilePageSchema = {
    profilePages: {},
};

const profilePageSlice = createSlice({
    name: 'profilePageSlice',
    initialState,
    reducers: {
        initiatePage: (state, { payload }: PayloadAction<string>) => {
            if (!state.profilePages[payload]?.page) {
                state.profilePages[payload] = {
                    page: 1, order: 'desc', sort: 'createdAt', search: '',
                };
            }
        },
        setPage: {
            reducer: (state, { payload }: PayloadAction<PayloadWithUsername<number>>) => {
                if (state.profilePages[payload.username]) {
                    state.profilePages[payload.username].page = payload.arg;
                }
            },
            prepare: (username: string, page: number) => ({ payload: { username, arg: page } }),
        },
        setOrder: {
            reducer: (state, { payload }: PayloadAction<PayloadWithUsername<SortOrder>>) => {
                state.profilePages[payload.username].order = payload.arg;
            },
            prepare: (username: string, order: SortOrder) => ({
                payload: { username, arg: order },
            }),
        },
        setSort: {
            reducer: (state, { payload }: PayloadAction<PayloadWithUsername<ArticleSortField>>) => {
                state.profilePages[payload.username].sort = payload.arg;
            },
            prepare: (username: string, sort: ArticleSortField) => ({
                payload: { username, arg: sort },
            }),
        },
        setSearch: {
            reducer: (state, { payload }: PayloadAction<PayloadWithUsername<string>>) => {
                state.profilePages[payload.username].search = payload.arg;
            },
            prepare: (username: string, search: string) => ({
                payload: { username, arg: search },
            }),
        },
    },
});

export const {
    reducer: profilePageReducer,
    actions: profilePageActions,
} = profilePageSlice;
