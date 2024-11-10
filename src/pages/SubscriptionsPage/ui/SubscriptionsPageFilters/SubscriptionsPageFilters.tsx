import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/Card';
import { ArticlesFilters } from '@/widgets/ArticlesList';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import {
    getSubscriptionsPageOrder, getSubscriptionsPageSearch,
    getSubscriptionsPageSort,
} from '../../model/selectors/subscriptionsPageSelectors';
import { subscriptionsPageActions } from '../../model/slice/SubscriptionsPageSlice';

export const SubscriptionsPageFilters = memo(() => {
    const dispatch = useAppDispatch();

    const order = useSelector(getSubscriptionsPageOrder);
    const sort = useSelector(getSubscriptionsPageSort);
    const search = useSelector(getSubscriptionsPageSearch);

    const [searchText, setSearchText] = useState(search);

    const scrollToTop = useCallback(() => {
        const virtuoso = document.getElementById('virtuoso /subs');
        virtuoso?.scrollTo(0, 0);
    }, []);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        scrollToTop();
        dispatch(subscriptionsPageActions.setSort(sort));
        dispatch(subscriptionsPageActions.setPage(1));
    }, [dispatch, scrollToTop]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        scrollToTop();
        dispatch(subscriptionsPageActions.setOrder(order));
        dispatch(subscriptionsPageActions.setPage(1));
    }, [dispatch, scrollToTop]);

    const debouncedSetSearch = useDebounce(
        (search: string) => {
            dispatch(subscriptionsPageActions.setSearch(search));
            dispatch(subscriptionsPageActions.setPage(1));
            scrollToTop();
        },
        500,
    );

    const onChangeSearch = useCallback((search: string) => {
        setSearchText(search);
        debouncedSetSearch(search);
    }, [debouncedSetSearch]);

    return (
        <Card padding="24">
            <ArticlesFilters
                order={order}
                sort={sort}
                search={searchText}
                onChangeOrder={onChangeOrder}
                onChangeSearch={onChangeSearch}
                onChangeSort={onChangeSort}
            />
        </Card>
    );
});
