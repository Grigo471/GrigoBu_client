import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// eslint-disable-next-line
export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;

        const _inited = getArticlesPageInited(getState());

        if (!_inited) {
            const orderURL = searchParams.get('order');
            const sortURL = searchParams.get('sort');
            const searchURL = searchParams.get('search');
            const typeURL = searchParams.get('type');

            if (orderURL) {
                dispatch(articlesPageActions.setOrder(orderURL as SortOrder));
            }

            if (sortURL) {
                dispatch(articlesPageActions.setSort(sortURL as ArticleSortField));
            }

            if (searchURL) {
                dispatch(articlesPageActions.setSearch(searchURL));
            }

            if (typeURL) {
                dispatch(articlesPageActions.setType(typeURL as ArticleType));
            }

            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({}));
        }
    },
);
