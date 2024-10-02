/* eslint-disable no-restricted-syntax */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleEditPageForm } from '../../selectors/articleEditPageSelectors';
import { ValidateArticleError } from '../../consts/consts';
import { validateArticleData } from '../validateArticleData/validateArticleData';
import { Article } from '@/entities/Article';

interface SaveArticleProps {
    images?: File[];
    isEdit: boolean;
}

export const saveArticle = createAsyncThunk<
    Article,
    SaveArticleProps,
    ThunkConfig<ValidateArticleError[]>
>(
    'articleEditPage/saveArticle',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const { isEdit, images } = props;

        const form = getArticleEditPageForm(getState());
        if (!form) return rejectWithValue([ValidateArticleError.NO_DATA]);

        const errors = validateArticleData(form);
        if (errors.length) return rejectWithValue(errors);

        const formData = new FormData();

        form?.blocks.forEach((block, i) => {
            Object.entries(block).forEach(([key, value]) => {
                formData.append(`blocks[${i}][${key}]`, value);
            });
        });

        form.tags.forEach((tag, i) => {
            formData.append(`tags[${i}]`, tag);
        });

        Object.entries(form).forEach(([key, value]) => {
            if (key !== 'block' && key !== 'user' && key !== 'tags') {
                formData.append(key, value);
            }
        });

        if (form.user.id) formData.append('userId', form.user.id.toString());

        images?.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = isEdit
                ? await extra.api.put<Article>(`/articles/${form?.id}`, formData)
                : await extra.api.post<Article>('/articles', formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue([ValidateArticleError.SERVER_ERROR]);
        }
    },
);
