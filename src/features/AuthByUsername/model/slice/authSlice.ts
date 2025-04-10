import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthSchema } from '../types/authSchema';
import { login } from '../services/login/login';
import { registration } from '../services/registration/registration';
import {
    ValidatePasswordError, ValidateUsernameError,
} from '../consts/validateAuthErrors';

const initialState: AuthSchema = {
    isLoading: false,
    username: '',
    password: '',
    validateUsernameErrors: [],
    validatePasswordErrors: [],
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
        setUsernameErrors: (state, action: PayloadAction<ValidateUsernameError[]>) => {
            state.validateUsernameErrors = action.payload;
        },
        setPasswordErrors: (state, action: PayloadAction<ValidatePasswordError[]>) => {
            state.validatePasswordErrors = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(login.pending, (state) => {
                state.apiError = undefined;
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload?.type === 'validation') {
                    const { nameErrors, passwordErrors } = action.payload;
                    state.validateUsernameErrors = nameErrors;
                    state.validatePasswordErrors = passwordErrors;
                } else {
                    state.apiError = action.payload?.message;
                }
            })
            // registration
            .addCase(registration.pending, (state) => {
                state.apiError = undefined;
                state.isLoading = true;
            })
            .addCase(registration.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registration.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload?.type === 'validation') {
                    const { nameErrors, passwordErrors } = action.payload;
                    state.validateUsernameErrors = nameErrors;
                    state.validatePasswordErrors = passwordErrors;
                } else {
                    state.apiError = action.payload?.message;
                }
            });
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
