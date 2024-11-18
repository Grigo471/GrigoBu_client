import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const subscribeToUser = createAsyncThunk<
    number,
    number | undefined,
    ThunkConfig<string>
>(
    'SubscribeToUserButton/subscribeToUser',
    async (userId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<number>(
                `users/${userId}/subscribe`,
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
