import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, LoginProps } from '../../types/authSchema';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage';
import { userActions } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { articlesListsPagesActions } from '@/entities/Article';
import { resetAllVirtuosoState } from '@/shared/lib/virtuosoState/virtuosoStateByPathname';

export const login = createAsyncThunk<
    AuthResponse,
    LoginProps,
    ThunkConfig<string>
>(
    'auth/login',
    async (authData, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;

        try {
            const response = await extra.api.post<AuthResponse>(
                'auth/login',
                authData,
                { withCredentials: true },
            );

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
            const message = extra.errorMessage(error);
            if (message) {
                return rejectWithValue(message);
            }
            return rejectWithValue('unforseen error');
        }
    },
);
