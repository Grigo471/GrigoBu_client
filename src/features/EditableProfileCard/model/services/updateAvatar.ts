import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { userActions } from '@/entities/User';

export const updateAvatar = createAsyncThunk<
    string,
    File,
    ThunkConfig<string>
>(
    'EditableProfile/updateAvatar',
    async (file, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;

        try {
            const formData = new FormData();
            formData.append('avatar', file);
            const response = await extra.api.patch<string>(
                'users/avatar',
                formData,
                { withCredentials: true },
            );

            if (!response.data) {
                throw new Error();
            }

            dispatch(userActions.setAvatar(response.data));

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
