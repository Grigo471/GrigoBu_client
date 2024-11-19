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
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';
import { getUserAuthData } from '@/entities/User';
import { getProfileData } from '@/widgets/ProfileCard';
import { Text } from '@/shared/ui/Text';
import { SubscribeToUserButton } from '@/features/SubscribeToUserButton';

export const ProfilePageFilters = memo(() => {
    const dispatch = useAppDispatch();
    const username = useParams<{ username: string }>().username ?? '';
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const avatar = username === authData?.username ? authData.avatar : profileData?.avatar;

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
            <VStack gap="24">
                <VStack gap="16">
                    <HStack gap="8">
                        <Avatar src={srcWithApi(avatar)} size={32} />
                        <Text size="l" text={username} bold />
                    </HStack>
                    {profileData
                && (
                    <SubscribeToUserButton
                        userId={profileData.id}
                        amISubscribed={profileData.amISubscribed}
                    />
                )}
                </VStack>
                <ArticlesFilters
                    order={order}
                    sort={sort}
                    search={searchText}
                    onChangeOrder={onChangeOrder}
                    onChangeSearch={onChangeSearch}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
});
