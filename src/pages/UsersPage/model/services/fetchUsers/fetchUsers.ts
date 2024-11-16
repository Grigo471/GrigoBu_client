import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';
import {
    getUsersPageOrder, getUsersPageSearch, getUsersPageSort,
} from '../../selectors/usersSelector';

// eslint-disable-next-line
export const fetchUsers = createAsyncThunk<User[], void, ThunkConfig<string>>(
    'usersPage/fetchUsers',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const order = getUsersPageOrder(getState());
        const sort = getUsersPageSort(getState());
        const search = getUsersPageSearch(getState());

        try {
            const response = await extra.api.get<User[]>('/users', {
                params: { sort, order, search },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
