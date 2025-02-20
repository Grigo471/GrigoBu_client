import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '@/entities/User';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthResponse, LoginProps } from '../../types/authSchema';
import { rtkApi } from '@/shared/api/rtkApi';
import { articlesListsPagesActions } from '@/entities/Article';
import { resetAllVirtuosoState } from '@/shared/lib/virtuosoState/virtuosoStateByPathname';

export const registration = createAsyncThunk<
    AuthResponse,
    LoginProps,
    ThunkConfig<string>
>(
    'auth/registration',
    async (authData, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;

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
            const message = extra.errorMessage(error);
            if (message) {
                return rejectWithValue(message);
            }
            return rejectWithValue('unforseen error');
        }
    },
);
