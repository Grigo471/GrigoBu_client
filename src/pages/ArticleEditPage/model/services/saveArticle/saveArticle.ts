import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleEditPageForm } from '../../selectors/articleEditPageSelectors';
import { ValidateArticleError } from '../../consts/consts';
import { validateArticleData } from '../validateArticleData/validateArticleData';
import { Article, ArticleBlock, ArticleType } from '@/entities/Article';

interface ArticleData {
    userId: string;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}

export const saveArticle = createAsyncThunk<
    Article,
    boolean,
    ThunkConfig<ValidateArticleError[]>
>(
    'articleEditPage/saveArticle',
    async (isEdit, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        const formData = getArticleEditPageForm(getState());

        const errors = validateArticleData(formData);

        if (errors.length) {
            return rejectWithValue(errors);
        }

        const data = {
            userId: formData?.user.id,
            title: formData?.title,
            subtitle: formData?.subtitle,
            img: formData?.img,
            views: formData?.views,
            createdAt: formData?.createdAt,
            type: formData?.type,
            blocks: formData?.blocks,
        };

        try {
            const response = isEdit
                ? await extra.api.put<Article>(`/articles/${formData?.id}`, data)
                : await extra.api.post<Article>('/articles', data);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue([ValidateArticleError.SERVER_ERROR]);
        }
    },
);
