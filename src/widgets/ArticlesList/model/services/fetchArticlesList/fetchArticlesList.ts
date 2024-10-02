import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getArticlesListLimit,
    getArticlesListNum,
    getArticlesListOrder,
    getArticlesListSearch,
    getArticlesListSort,
} from '../../selectors/articlesListSelectors';

interface FetchArticlesListProps {
    replace?: boolean;
}

// eslint-disable-next-line
export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
    'articlesList/fetchArticlesList',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const limit = getArticlesListLimit(getState());
        const order = getArticlesListOrder(getState());
        const sort = getArticlesListSort(getState());
        const search = getArticlesListSearch(getState());
        const page = getArticlesListNum(getState());

        try {
            addQueryParams({
                sort, order, search,
            });
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    limit,
                    page,
                    sort,
                    order,
                    q: search,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            response.data.forEach((article) => article.blocks.forEach((block) => {
                if (block.type === 'image') {
                    block.src = `${__API__}/${block.src}`;
                }
            }));

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
