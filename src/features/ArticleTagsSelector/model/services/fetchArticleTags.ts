import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchArticleTags = createAsyncThunk<
    string[],
    void,
    ThunkConfig<string>
>(
    'ArticleTagsSelector/fetchArticleTags',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<string[]>('/tags');

            if (!response.data) {
                throw new Error();
            }

            return [...new Set(response.data)];
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
