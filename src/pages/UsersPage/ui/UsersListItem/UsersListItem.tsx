import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/Card';
import { getUserAuthData, User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { srcWithApi } from '@/shared/lib/url/srcWithApi/srcWithApi';
import { AppLink } from '@/shared/ui/AppLink';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { subscribeToUser, unsubscribeToUser } from '@/features/ProfileCard';
import { Button } from '@/shared/ui/Button';
import cls from './UsersListItem.module.scss';

interface UsersListItemProps {
   className?: string;
   user: User;
}

export const UsersListItem = memo((props: UsersListItemProps) => {
    const { className, user } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    const date = user.createdAt?.split('T')[0];

    const onSubscribe = useCallback(() => {
        if (user?.id) dispatch(subscribeToUser(user.id));
    }, [dispatch, user.id]);

    const onUnSubscribe = useCallback(() => {
        if (user?.id) dispatch(unsubscribeToUser(user.id));
    }, [dispatch, user.id]);

    const subscribeButton = user.amISubscribed ? (
        <Button
            onClick={onUnSubscribe}
            className={cls.subscribeButton}
            variant="filled"
        >
            {t('Вы подписаны')}
        </Button>
    ) : (
        <Button
            onClick={onSubscribe}
        >
            {t('Подписаться')}
        </Button>
    );

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

                {(authData && authData.id !== user.id) && subscribeButton}
            </HStack>
        </Card>

    );
});
