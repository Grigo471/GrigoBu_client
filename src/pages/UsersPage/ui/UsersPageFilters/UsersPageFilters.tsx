import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import {
    getUsersPageSubsFilter,
    getUsersPageOrder, getUsersPageSearch, getUsersPageSort,
} from '../../model/selectors/usersSelector';
import { usersPageActions } from '../../model/slice/usersPageSlice';
import { VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Icon } from '@/shared/ui/Icon';
import { UsersSortSelector } from '@/features/UsersSortSelector';
import { UsersSortField } from '@/entities/User';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { fetchUsers } from '../../model/services/fetchUsers/fetchUsers';
import { UsersSubsCheckbox, UsersSubsRelation } from '@/features/UsersSubsCheckbox';

export const UsersPageFilters = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const order = useSelector(getUsersPageOrder);
    const sort = useSelector(getUsersPageSort);
    const search = useSelector(getUsersPageSearch);
    const subsFilter = useSelector(getUsersPageSubsFilter);

    const fetchData = useCallback(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeSort = useCallback((sort: UsersSortField) => {
        dispatch(usersPageActions.setSort(sort));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        dispatch(usersPageActions.setOrder(order));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(usersPageActions.setSearch(search));
        debouncedFetchData(search);
    }, [dispatch, debouncedFetchData]);

    const onChangeSubsFilter = useCallback((value: UsersSubsRelation) => {
        if (subsFilter === value) {
            dispatch(usersPageActions.setSubsFilter(undefined));
        } else {
            dispatch(usersPageActions.setSubsFilter(value));
        }
        fetchData();
    }, [fetchData, subsFilter, dispatch]);

    return (
        <Card padding="24">
            <VStack gap="32" mbGap="16">
                <Input
                    size="s"
                    addonLeft={<Icon Svg={SearchIcon} />}
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={t('Поиск')}
                />
                <UsersSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <UsersSubsCheckbox
                    value={subsFilter}
                    onChange={onChangeSubsFilter}
                />
            </VStack>
        </Card>
    );
});
