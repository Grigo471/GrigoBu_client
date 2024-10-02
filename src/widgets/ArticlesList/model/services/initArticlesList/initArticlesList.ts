import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types';
import { ArticleSortField } from '@/entities/Article';
import { getArticlesListInited } from '../../selectors/articlesListSelectors';
import { articlesListActions } from '../../slice/articlesListSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// eslint-disable-next-line
export const initArticlesList = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesList/initArticlesList',
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;

        const _inited = getArticlesListInited(getState());

        if (!_inited) {
            const orderURL = searchParams.get('order');
            const sortURL = searchParams.get('sort');
            const searchURL = searchParams.get('search');

            if (orderURL) {
                dispatch(articlesListActions.setOrder(orderURL as SortOrder));
            }

            if (sortURL) {
                dispatch(articlesListActions.setSort(sortURL as ArticleSortField));
            }

            if (searchURL) {
                dispatch(articlesListActions.setSearch(searchURL));
            }

            dispatch(articlesListActions.initState());
            dispatch(fetchArticlesList({}));
        }
    },
);
