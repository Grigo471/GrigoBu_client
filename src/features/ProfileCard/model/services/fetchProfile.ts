import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';

export const fetchProfile = createAsyncThunk<
    User,
    string,
    ThunkConfig<string>
>(
    'ProfileCard/fetchProfile',
    async (username, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<User>(
                `users/${username}`,
                { withCredentials: true },
            );

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
