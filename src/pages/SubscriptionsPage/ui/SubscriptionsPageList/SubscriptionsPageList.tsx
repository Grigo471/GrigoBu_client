import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesList, scrollByPath } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    getSubscriptionsPageNum,
    getSubscriptionsPageOrder,
    getSubscriptionsPageSearch,
    getSubscriptionsPageSort,
} from '../../model/selectors/subscriptionsPageSelectors';
import { articlesApi, useGetSubscriptions } from '@/entities/Article';
import { ARTICLES_PAGE_LIMIT } from '@/shared/const/articlesApi';
import { subscriptionsPageActions } from '../../model/slice/SubscriptionsPageSlice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { uiFlags } from '@/shared/lib/ui/lib/UIFlags';
import { rtkApi } from '@/shared/api/rtkApi';

export const SubscriptionsPageList = memo(() => {
    const dispatch = useAppDispatch();

    const order = useSelector(getSubscriptionsPageOrder);
    const sort = useSelector(getSubscriptionsPageSort);
    const search = useSelector(getSubscriptionsPageSearch);
    const page = useSelector(getSubscriptionsPageNum);
    const limit = ARTICLES_PAGE_LIMIT;

    const {
        data, isLoading, error, isFetching, refetch, originalArgs,
    } = useGetSubscriptions({
        order, sort, search, page, limit,
    });

    const onLoadNextPart = () => {
        dispatch(subscriptionsPageActions.setPage(page + 1));
    };

    const refreshHandler = useCallback(async () => {
        window.scrollTo(0, 0);
        await dispatch(subscriptionsPageActions.setPage(1));
        refetch();
    }, [dispatch, refetch]);

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

    useInitialEffect(() => {
        if (uiFlags.shouldSubscriptionsPageRefresh) {
            scrollByPath['/subs'] = 0;
            setTimeout(() => {
                dispatch(subscriptionsPageActions.setPage(1));
                dispatch(rtkApi.util.invalidateTags(['Subscriptions']));
            }, 0);
        }
        uiFlags.shouldSubscriptionsPageRefresh = false;
    });

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
