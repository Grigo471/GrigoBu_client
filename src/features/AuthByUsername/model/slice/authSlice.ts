import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthSchema } from '../types/authSchema';
import { login } from '../services/login/login';
import { registration } from '../services/registration/registration';

const initialState: AuthSchema = {
    isLoading: false,
    username: '',
    password: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(login.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // registration
            .addCase(registration.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(registration.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
