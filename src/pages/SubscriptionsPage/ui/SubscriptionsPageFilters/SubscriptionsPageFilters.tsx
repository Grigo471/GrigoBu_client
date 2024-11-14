import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/Card';
import { ArticlesFilters } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ArticleSortField } from '@/entities/Article';
import {
    getSubscriptionsPageOrder, getSubscriptionsPageSearch,
    getSubscriptionsPageSort,
} from '../../model/selectors/subscriptionsPageSelectors';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { instantScrollTop } from '@/shared/lib/helpers/instantScrollTop';
import { subscriptionsPageActions } from '../../model/slice/SubscriptionsPageSlice';

export const SubscriptionsPageFilters = memo(() => {
    const dispatch = useAppDispatch();

    const order = useSelector(getSubscriptionsPageOrder);
    const sort = useSelector(getSubscriptionsPageSort);
    const search = useSelector(getSubscriptionsPageSearch);

    const [searchText, setSearchText] = useState(search);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        instantScrollTop(0);
        dispatch(subscriptionsPageActions.setSort(sort));
        dispatch(subscriptionsPageActions.setPage(1));
    }, [dispatch]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        instantScrollTop(0);
        dispatch(subscriptionsPageActions.setOrder(order));
        dispatch(subscriptionsPageActions.setPage(1));
    }, [dispatch]);

    const debouncedSetSearch = useDebounce(
        (search: string) => {
            instantScrollTop(0);
            dispatch(subscriptionsPageActions.setSearch(search));
            dispatch(subscriptionsPageActions.setPage(1));
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
