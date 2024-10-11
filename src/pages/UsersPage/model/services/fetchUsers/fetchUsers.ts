import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';

// eslint-disable-next-line
export const fetchUsers = createAsyncThunk<User[], void, ThunkConfig<string>>(
    'usersPage/fetchUsers',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<User[]>('/users');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
