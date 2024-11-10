import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesList } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useGetSubscriptions } from '@/entities/Article';
import {
    getSubscriptionsPageLimit, getSubscriptionsPageNum,
    getSubscriptionsPageOrder, getSubscriptionsPageSearch, getSubscriptionsPageSort,
    getSubscriptionsPageUncollapsed,
} from '../../model/selectors/subscriptionsPageSelectors';
import { subscriptionsPageActions } from '../../model/slice/SubscriptionsPageSlice';

export const SubscriptionsPageList = memo(() => {
    const dispatch = useAppDispatch();

    const order = useSelector(getSubscriptionsPageOrder);
    const sort = useSelector(getSubscriptionsPageSort);
    const search = useSelector(getSubscriptionsPageSearch);
    const page = useSelector(getSubscriptionsPageNum);
    const limit = useSelector(getSubscriptionsPageLimit);
    const uncollapsedCards = useSelector(getSubscriptionsPageUncollapsed);

    const {
        data, isLoading, error, isFetching,
    } = useGetSubscriptions({
        order, sort, search, page, limit,
    });

    const onLoadNextPart = () => {
        dispatch(subscriptionsPageActions.setPage(page + 1));
    };

    const setUncollapsed = useCallback((articleId: string) => {
        dispatch(subscriptionsPageActions.addUnCollapsedCards(articleId));
    }, [dispatch]);

    return (
        <ArticlesList
            articles={data}
            uncollapsedCards={uncollapsedCards}
            setUncollapsed={setUncollapsed}
            page={page}
            isLoading={isLoading || isFetching}
            onLoadNextPart={onLoadNextPart}
        />
    );
});
