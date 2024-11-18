import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { User, UsersSortField } from '@/entities/User';
import { UsersPageSchema } from '../types/UsersPageSchema';
import { fetchUsers } from '../services/fetchUsers/fetchUsers';
import { SortOrder } from '@/shared/types';
import { subscribeToUser, unsubscribeToUser } from '@/features/ProfileCard';

const usersAdapter = createEntityAdapter<User>({
    selectId: (profile) => profile.id,
});

export const getUsers = usersAdapter.getSelectors<StateSchema>(
    (state) => state.usersPage || usersAdapter.getInitialState(),
);

const usersPagesSlice = createSlice({
    name: 'usersPageSlice',
    initialState: usersAdapter.getInitialState<UsersPageSchema>({
        isLoading: false,
        error: undefined,
        search: '',
        order: 'desc',
        sort: 'rating',
        isSubs: false,
        ids: [],
        entities: {},
    }),
    reducers: {
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<UsersSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setIsSubs: (state, action: PayloadAction<boolean>) => {
            state.isSubs = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.isLoading = false;
                    usersAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(
                subscribeToUser.fulfilled,
                (state, { payload }: PayloadAction<number>) => {
                    const user = state.entities[payload];
                    if (user) user.amISubscribed = true;
                },
            )
            .addCase(
                unsubscribeToUser.fulfilled,
                (state, { payload }: PayloadAction<number>) => {
                    const user = state.entities[payload];
                    if (user) user.amISubscribed = false;
                },
            );
    },
});

export const { reducer: usersPageReducer, actions: usersPageActions } = usersPagesSlice;
