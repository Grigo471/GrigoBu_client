import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesList } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    getSubscriptionsPageOrder,
    getSubscriptionsPageSearch,
    getSubscriptionsPageSort,
} from '../../model/selectors/subscriptionsPageSelectors';
import {
    articlesApi,
    articlesListsPagesActions,
    getArticlesListPageByPathname,
    useGetSubscriptions,
} from '@/entities/Article';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getRouteSubscriptions } from '@/shared/const/router';

export const SubscriptionsPageList = memo(() => {
    const dispatch = useAppDispatch();
    const pathname = getRouteSubscriptions();

    const order = useSelector(getSubscriptionsPageOrder);
    const sort = useSelector(getSubscriptionsPageSort);
    const search = useSelector(getSubscriptionsPageSearch);
    const page = useSelector(
        (state: StateSchema) => getArticlesListPageByPathname(state, pathname),
    );
    const limit = ARTICLES_PAGE_LIMIT;

    const {
        data, isLoading, error, isFetching, refetch, originalArgs,
    } = useGetSubscriptions({
        order, sort, search, page, limit,
    });

    const onLoadNextPart = () => {
        dispatch(articlesListsPagesActions.setPage(pathname, page + 1));
    };

    const refreshHandler = useCallback(async () => {
        window.scrollTo(0, 0);
        await dispatch(articlesListsPagesActions.setPage(pathname, 1));
        refetch();
    }, [dispatch, refetch, pathname]);

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
            onLoadNextPart={onLoadNextPart}
            refreshHandler={refreshHandler}
        />
    );
});
