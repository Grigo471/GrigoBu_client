import { createAsyncThunk } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../types/user';

interface CheckAuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export const checkAuth = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>(
    'user/checkAuth',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<CheckAuthResponse>(
                'auth/refresh',
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
            return user;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
