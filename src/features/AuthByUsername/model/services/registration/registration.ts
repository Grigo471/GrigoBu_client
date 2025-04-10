import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '@/entities/User';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    AuthApiRejectPayload, AuthResponse, AuthValidationRejectPayload, LoginProps,
} from '../../types/authApiTypes';
import { rtkApi } from '@/shared/api/rtkApi';
import { articlesListsPagesActions } from '@/entities/Article';
import { resetAllVirtuosoState } from '@/shared/lib/virtuosoState/virtuosoStateByPathname';

import { validateUsername } from '../validateAuth/validateUsername';
import { validatePassword } from '../validateAuth/validatePassword';
import { isAuthKnownApiError } from '../../consts/authApiErrors';

export const registration = createAsyncThunk<
    AuthResponse,
    LoginProps,
    ThunkConfig<AuthValidationRejectPayload | AuthApiRejectPayload>
>(
    'auth/registration',
    async (authData, thunkApi) => {
        const {
            extra, rejectWithValue, dispatch,
        } = thunkApi;

        const nameErrors = validateUsername(authData.username);
        const passwordErrors = validatePassword(authData.password);

        if (nameErrors.length > 0 || passwordErrors.length > 0) {
            return rejectWithValue({
                type: 'validation',
                nameErrors,
                passwordErrors,
            });
        }

        try {
            const response = await extra.api.post<AuthResponse>('auth/registration', authData);

            if (!response.data) {
                throw new Error();
            }

            const {
                accessToken,
                user,
            } = response.data;

            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessToken);
            dispatch(rtkApi.util.resetApiState());
            resetAllVirtuosoState();
            dispatch(articlesListsPagesActions.resetAllPages());

            dispatch(userActions.setAuthData(user));

            return response.data;
        } catch (error) {
            console.log(error);
            const message = extra.errorMessage(error);
            if (message && isAuthKnownApiError(message)) {
                return rejectWithValue({
                    type: 'api',
                    message,
                });
            }
            return rejectWithValue({
                type: 'api',
                message: 'Unforseen error',
            });
        }
    },
);
