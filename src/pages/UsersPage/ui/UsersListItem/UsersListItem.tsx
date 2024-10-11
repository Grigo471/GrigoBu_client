import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';
import { AppLink } from '@/shared/ui/AppLink';

interface UsersListItemProps {
   className?: string;
   user: User;
}

export const UsersListItem = memo((props: UsersListItemProps) => {
    const { className, user } = props;
    const { t } = useTranslation();

    return (
        <Card className={className} max>
            <AppLink to={`${user.username}`}>
                <HStack max gap="16">
                    <Avatar size={72} src={srcWithApi(user.avatar)} />
                    <VStack max>
                        <Text title={user?.username} />
                        {user?.status && <Text text={user.status} />}
                        <Text text={user.rating?.toString()} />
                    </VStack>
                </HStack>
            </AppLink>
        </Card>

    );
});
