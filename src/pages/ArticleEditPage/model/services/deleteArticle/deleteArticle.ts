import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { rtkApi } from '@/shared/api/rtkApi';
import { resetAllVirtuosoState } from '@/shared/lib/virtuosoState/virtuosoStateByPathname';
import { articlesListsPagesActions } from '@/entities/Article';

export const deleteArticle = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>(
    'articleEditPage/deleteArticle',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;

        try {
            const response = await extra.api.delete<string>(`/articles/${articleId}`);

            if (!response.data) {
                throw new Error();
            }

            dispatch(rtkApi.util.resetApiState());
            resetAllVirtuosoState();
            dispatch(articlesListsPagesActions.resetAllPages());

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
