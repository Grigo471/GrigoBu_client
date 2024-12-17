import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import {
    articlesApi, useArticlesListPage,
    useArticlesListPageActions,
    useArticlesMainFiltersSelector,
    useGetUserArticles,
} from '@/entities/Article';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';
import { ArticlesList } from '@/widgets/ArticlesList';

export const ProfilePageArticlesList = memo(() => {
    const dispatch = useAppDispatch();
    const username = useParams<{ username: string }>().username ?? '';
    const pathname = `/users/${username}`;

    const { sort, order, search } = useArticlesMainFiltersSelector(pathname);
    const page = useArticlesListPage(pathname);
    const limit = ARTICLES_PAGE_LIMIT;

    const { resetPage } = useArticlesListPageActions();

    const {
        data, isLoading, error, isFetching, refetch,
    } = useGetUserArticles({
        order, sort, search, page, limit, username,
    });

    const refreshHandler = useCallback(async () => {
        window.scrollTo(0, 0);
        await resetPage(pathname);
        refetch();
    }, [refetch, pathname, resetPage]);

    const setUncollapsed = (articleId: string) => {
        dispatch(articlesApi.util.updateQueryData('getUserArticles', {
            order, sort, search, page, limit, username,
        }, (draft) => {
            const article = draft.find(
                (article) => article.id === articleId,
            );
            if (article) {
                article.uncollapsed = true;
            }
        }));
    };

    return (
        <ArticlesList
            articles={data}
            isLoading={isLoading || (isFetching && page === 1)}
            isFetching={isFetching}
            setUncollapsed={setUncollapsed}
            refreshHandler={refreshHandler}
        />
    );
});
