import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card';
import { ArticlesFilters } from '@/widgets/ArticlesList';
import { useArticlesFilters } from '@/entities/Article';

import { useGetSubscriptionsUsers } from '../../api/subscriptionsUsersApi';
import { Text } from '@/shared/ui/Text';
import { AppLink } from '@/shared/ui/AppLink';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';

export const SubscriptionsPageFilters = memo(() => {
    const { t } = useTranslation();

    const {
        sort,
        order,
        search,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
    } = useArticlesFilters();

    const { data: subscriptions } = useGetSubscriptionsUsers(
        undefined,
        { refetchOnMountOrArgChange: true },
    );

    return (
        <Card padding="24">
            <VStack gap="24">
                <ArticlesFilters
                    order={order}
                    sort={sort}
                    search={search}
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
