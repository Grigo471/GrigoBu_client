import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card';
import { ArticlesFilters } from '@/widgets/ArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { articlesListsPagesActions, ArticleSortField } from '@/entities/Article';
import {
    getSubscriptionsPageOrder, getSubscriptionsPageSearch,
    getSubscriptionsPageSort,
} from '../../model/selectors/subscriptionsPageSelectors';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { subscriptionsPageActions } from '../../model/slice/SubscriptionsPageSlice';
import { useGetSubscriptionsUsers } from '../../api/subscriptionsUsersApi';
import { Text } from '@/shared/ui/Text';
import { AppLink } from '@/shared/ui/AppLink';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';
import { getRouteSubscriptions } from '@/shared/const/router';

export const SubscriptionsPageFilters = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const pathname = getRouteSubscriptions();

    const order = useSelector(getSubscriptionsPageOrder);
    const sort = useSelector(getSubscriptionsPageSort);
    const search = useSelector(getSubscriptionsPageSearch);

    const { data: subscriptions } = useGetSubscriptionsUsers(
        undefined,
        { refetchOnMountOrArgChange: true },
    );

    const [searchText, setSearchText] = useState(search);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        window.scrollTo(0, 0);
        dispatch(subscriptionsPageActions.setSort(sort));
        dispatch(articlesListsPagesActions.setPage(pathname, 1));
    }, [dispatch, pathname]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        window.scrollTo(0, 0);
        dispatch(subscriptionsPageActions.setOrder(order));
        dispatch(articlesListsPagesActions.setPage(pathname, 1));
    }, [dispatch, pathname]);

    const debouncedSetSearch = useDebounce(
        (search: string) => {
            window.scrollTo(0, 0);
            dispatch(subscriptionsPageActions.setSearch(search));
            dispatch(articlesListsPagesActions.setPage(pathname, 1));
        },
        500,
    );

    const onChangeSearch = useCallback((search: string) => {
        setSearchText(search);
        debouncedSetSearch(search);
    }, [debouncedSetSearch]);

    return (
        <Card padding="24">
            <VStack gap="24">
                <ArticlesFilters
                    order={order}
                    sort={sort}
                    search={searchText}
                    onChangeOrder={onChangeOrder}
                    onChangeSearch={onChangeSearch}
                    onChangeSort={onChangeSort}
                />

                <VStack gap="16">
                    <Text title={t('Мои подписки')} />
                    {subscriptions?.map((subscription) => (
                        <AppLink key={subscription.username} to={`/users/${subscription.username}`}>
                            <HStack gap="8">
                                <Avatar src={srcWithApi(subscription.avatar)} size={32} />
                                <Text text={subscription.username} bold />
                            </HStack>
                        </AppLink>
                    ))}
                </VStack>
            </VStack>
        </Card>
    );
});
