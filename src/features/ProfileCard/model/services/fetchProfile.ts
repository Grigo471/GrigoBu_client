import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';

export interface fetchProfileResult {
    user: User,
    amISubscribed?: boolean,
}

export const fetchProfile = createAsyncThunk<
    fetchProfileResult,
    string,
    ThunkConfig<string>
>(
    'ProfileCard/fetchProfile',
    async (username, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<fetchProfileResult>(
                `users/${username}`,
                { withCredentials: true },
            );

            if (!response.data) {
                throw new Error();
            }

            console.log(response.data);

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
