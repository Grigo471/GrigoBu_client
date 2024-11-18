import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const unsubscribeToUser = createAsyncThunk<
    number,
    number | undefined,
    ThunkConfig<string>
>(
    'ProfileCard/unsubscribeToUser',
    async (userId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.delete<number>(
                `users/${userId}/unsubscribe`,
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
