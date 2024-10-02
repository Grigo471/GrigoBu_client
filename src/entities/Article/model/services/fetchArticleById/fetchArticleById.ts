import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<Article, string | undefined, ThunkConfig<string>>(
    'fetchArticleById',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        if (!articleId) {
            throw new Error('');
        }

        try {
            const response = await extra.api.get<Article>(`/articles/${articleId}`);

            if (!response.data) {
                throw new Error();
            }

            const article = response.data;
            article.blocks.forEach((block) => {
                if (block.type === 'image') {
                    block.src = `${__API__}/${block.src}`;
                }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
