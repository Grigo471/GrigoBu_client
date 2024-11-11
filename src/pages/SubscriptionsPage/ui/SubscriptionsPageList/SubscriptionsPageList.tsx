import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesList } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesApi, useGetSubscriptions } from '@/entities/Article';
import {
    getSubscriptionsPageLimit, getSubscriptionsPageNum,
    getSubscriptionsPageOrder, getSubscriptionsPageSearch, getSubscriptionsPageSort,
} from '../../model/selectors/subscriptionsPageSelectors';
import { subscriptionsPageActions } from '../../model/slice/SubscriptionsPageSlice';

export const SubscriptionsPageList = memo(() => {
    const dispatch = useAppDispatch();

    const order = useSelector(getSubscriptionsPageOrder);
    const sort = useSelector(getSubscriptionsPageSort);
    const search = useSelector(getSubscriptionsPageSearch);
    const page = useSelector(getSubscriptionsPageNum);
    const limit = useSelector(getSubscriptionsPageLimit);

    const {
        data, isLoading, error, isFetching, refetch,
    } = useGetSubscriptions({
        order, sort, search, page, limit,
    });

    const onLoadNextPart = () => {
        dispatch(subscriptionsPageActions.setPage(page + 1));
    };

    const setUncollapsed = (articleId: string) => {
        dispatch(articlesApi.util.updateQueryData('getSubscriptions', {
            order, sort, search, page, limit,
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
            setUncollapsed={setUncollapsed}
            page={page}
            isLoading={isLoading || isFetching}
            onLoadNextPart={onLoadNextPart}
        />
    );
});
