import { TestThunkAsync } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ArticleView, ArticleSortField, ArticleType } from 'entities/Article';

import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
    test('success fetch', async () => {
        const thunk = new TestThunkAsync(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
                _inited: false,
                sort: ArticleSortField.CREATED,
                order: 'asc',
                search: '',
                view: ArticleView.BIG,
                type: ArticleType.ALL,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchArticlesList).toHaveBeenCalled();
    });

    test('fetchArticlesList not called', async () => {
        const thunk = new TestThunkAsync(fetchNextArticlesPage, {
            articlesPage: {
                _inited: false,
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
                sort: ArticleSortField.CREATED,
                order: 'asc',
                search: '',
                view: ArticleView.BIG,
                type: ArticleType.ALL,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
