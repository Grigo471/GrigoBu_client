import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { RateArticleResult } from '../../types/article';

export const likeArticle = createAsyncThunk<
    RateArticleResult,
    string | undefined,
    ThunkConfig<string>
>(
    'likeArticle',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        if (!articleId) {
            throw new Error('');
        }

        try {
            const response = await extra.api.post<RateArticleResult>(`/articles/${articleId}/like`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
