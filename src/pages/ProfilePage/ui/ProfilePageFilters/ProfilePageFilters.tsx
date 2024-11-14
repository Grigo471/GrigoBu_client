import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';
import { ArticlesFilters } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ArticleSortField } from '@/entities/Article';

import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { instantScrollTop } from '@/shared/lib/helpers/instantScrollTop';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getProfilePageOrder, getProfilePageSearch, getProfilePageSort,
} from '../../model/selectors/profilePageSelectors';
import { profilePageActions } from '../../model/slice/ProfilePageSlice';

export const ProfilePageFilters = memo(() => {
    const dispatch = useAppDispatch();
    const username = useParams<{ username: string }>().username ?? '';

    const order = useSelector((state: StateSchema) => getProfilePageOrder(state, username));
    const sort = useSelector((state: StateSchema) => getProfilePageSort(state, username));
    const search = useSelector((state: StateSchema) => getProfilePageSearch(state, username));

    const [searchText, setSearchText] = useState(search);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        instantScrollTop(0);
        dispatch(profilePageActions.setSort(username, sort));
        dispatch(profilePageActions.setPage(username, 1));
    }, [dispatch, username]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        instantScrollTop(0);
        dispatch(profilePageActions.setOrder(username, order));
        dispatch(profilePageActions.setPage(username, 1));
    }, [dispatch, username]);

    const debouncedSetSearch = useDebounce(
        (search: string) => {
            instantScrollTop(0);
            dispatch(profilePageActions.setSearch(username, search));
            dispatch(profilePageActions.setPage(username, 1));
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
