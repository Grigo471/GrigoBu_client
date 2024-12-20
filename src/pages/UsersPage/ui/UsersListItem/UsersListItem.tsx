import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/Card';
import { getUserAuthData, User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';
import { AppLink } from '@/shared/ui/AppLink';
import { SubscribeToUserButton } from '@/features/SubscribeToUserButton';
import { formatDateToLocal } from '@/shared/lib/helpers/date/formatDateToLocal';

interface UsersListItemProps {
   className?: string;
   user: User;
}

export const UsersListItem = memo((props: UsersListItemProps) => {
    const { className, user } = props;
    const { t, i18n } = useTranslation();
    const authData = useSelector(getUserAuthData);

    const date = formatDateToLocal(user.createdAt, i18n.language, false);

    return (
        <Card className={className} max>
            <HStack max gap="16">
                <AppLink to={`${user.username}`}>
                    <Avatar size={72} src={srcWithApi(user.avatar)} />
                </AppLink>

                <VStack gap="8" max>
                    <HStack gap="8" align="end">
                        <AppLink to={`${user.username}`}>
                            <Text title={user.username} size="l" />
                        </AppLink>
                        <Text variant="accent" text={`${t('Рейтинг')}: ${user.rating}`} />
                    </HStack>
                    <Text text={`${t('Грибёт с')} ${date}`} />
                </VStack>

                {(authData && authData.id !== user.id)
                && <SubscribeToUserButton userId={user.id} amISubscribed={user.amISubscribed} />}
            </HStack>
        </Card>

    );
});
