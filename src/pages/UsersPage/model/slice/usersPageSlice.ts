import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';
import { UsersPageSchema } from '../types/UsersPageSchema';
import { fetchUsers } from '../services/fetchUsers/fetchUsers';

const usersAdapter = createEntityAdapter<User>({
    selectId: (user) => user.id,
});

export const getUsers = usersAdapter.getSelectors<StateSchema>(
    (state) => state.usersPage || usersAdapter.getInitialState(),
);

const usersPagesSlice = createSlice({
    name: 'usersPageSlice',
    initialState: usersAdapter.getInitialState<UsersPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {
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
            });
    },
});

export const { reducer: usersPageReducer } = usersPagesSlice;
