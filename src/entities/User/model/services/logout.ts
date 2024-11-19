import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage';

export const logout = createAsyncThunk<
    string,
    void,
    ThunkConfig<string>
>(
    'user/logout',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post('auth/logout');
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
            window.location.reload();
            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
