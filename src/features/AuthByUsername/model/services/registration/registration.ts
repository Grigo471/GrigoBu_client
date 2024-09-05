import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '@/entities/User';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthResponse, LoginProps } from '../../types/authSchema';

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
            dispatch(userActions.setAuthData(user));

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
);
