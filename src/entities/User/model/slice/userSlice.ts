import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { checkAuth } from '../services/checkAuth';
import { logout } from '../services/logout';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<User>) => {
            state.authData = payload;
            state._inited = true;
        },
        setInited: (state) => {
            state._inited = true;
        },
        setAvatar: (state, { payload }: PayloadAction<string>) => {
            if (state.authData) state.authData.avatar = payload;
        },
        logout: (state) => {
            state.authData = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                checkAuth.fulfilled,
                (state, { payload }: PayloadAction<User>) => {
                    state.authData = payload;
                    state._inited = true;
                },
            )
            .addCase(
                checkAuth.rejected,
                (state) => {
                    state._inited = true;
                },
            )
            .addCase(
                logout.fulfilled,
                (state) => {
                    state.authData = undefined;
                },
            );
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
