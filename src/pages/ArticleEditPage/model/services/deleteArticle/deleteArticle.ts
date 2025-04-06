import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const deleteArticle = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>(
    'articleEditPage/deleteArticle',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.delete<string>(`/articles/${articleId}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
