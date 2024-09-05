import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const subscribeToUser = createAsyncThunk<
    boolean,
    number | undefined,
    ThunkConfig<string>
>(
    'ProfileCard/subscribeToUser',
    async (userId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<boolean>(
                `users/${userId}/subscribe`,
                { withCredentials: true },
            );

            if (!response.data) {
                throw new Error();
            }

            console.log(response);

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
