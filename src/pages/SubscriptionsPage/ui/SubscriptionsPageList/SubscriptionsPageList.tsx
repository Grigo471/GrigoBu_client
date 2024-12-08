import { memo, useCallback } from 'react';
import { ArticlesList } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import {
    articlesApi,
    useArticlesListPage,
    useArticlesListPageActions,
    useArticlesMainFiltersSelector,
    useGetSubscriptions,
} from '@/entities/Article';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';
import { getRouteSubscriptions } from '@/shared/const/router';

export const SubscriptionsPageList = memo(() => {
    const dispatch = useAppDispatch();
    const pathname = getRouteSubscriptions();

    const { sort, order, search } = useArticlesMainFiltersSelector(pathname);
    const page = useArticlesListPage(pathname);
    const limit = ARTICLES_PAGE_LIMIT;

    const { resetPage } = useArticlesListPageActions();

    const {
        data, isLoading, error, isFetching, refetch, originalArgs,
    } = useGetSubscriptions({
        order, sort, search, page, limit,
    });

    const refreshHandler = useCallback(async () => {
        window.scrollTo(0, 0);
        await resetPage(pathname);
        refetch();
    }, [refetch, pathname, resetPage]);

    const setUncollapsed = (articleId: string) => {
        if (originalArgs) {
            dispatch(articlesApi.util.updateQueryData('getSubscriptions', originalArgs, (draft) => {
                const article = draft.find(
                    (article) => article.id === articleId,
                );
                if (article) {
                    article.uncollapsed = true;
                }
            }));
        }
    };

    return (
        <ArticlesList
            articles={data}
            page={page}
            isLoading={isLoading || isFetching}
            setUncollapsed={setUncollapsed}
            refreshHandler={refreshHandler}
        />
    );
});
