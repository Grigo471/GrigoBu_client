import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getArticlesListHasMore,
    getArticlesListIsLoading,
    getArticlesListNum,
} from '../../selectors/articlesListSelectors';
import { articlesListActions } from '../../slice/articlesListSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// eslint-disable-next-line
export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesList/fetchNextARticlesPage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;

        const hasMore = getArticlesListHasMore(getState());
        const page = getArticlesListNum(getState());
        const isLoading = getArticlesListIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(articlesListActions.setPage(page + 1));
            dispatch(fetchArticlesList({}));
        }
    },
);
