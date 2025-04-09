import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';
import { ArticlesFilters } from '@/widgets/ArticlesList';
import { useArticlesFilters } from '@/entities/Article';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';
import { getUserAuthData } from '@/entities/User';
import { getProfileData } from '@/widgets/ProfileCard';
import { Text } from '@/shared/ui/Text';
import { SubscribeToUserButton } from '@/features/SubscribeToUserButton';

export const ProfilePageFilters = memo(() => {
    const username = useParams<{ username: string }>().username ?? '';
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const avatar = username === authData?.username ? authData.avatar : profileData?.avatar;

    const {
        sort,
        order,
        search,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
    } = useArticlesFilters();

    return (
        <Card padding="24">
            <VStack gap="24" mbGap="12">
                <VStack gap="16" adaptive>
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
                    search={search}
                    onChangeOrder={onChangeOrder}
                    onChangeSearch={onChangeSearch}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
});
