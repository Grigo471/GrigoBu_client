import { type PropsWithChildren, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { AppLink } from '@/shared/ui/AppLink';
import { formatDateToLocal } from '@/shared/lib/helpers/date/formatDateToLocal';

interface NotificationItemProps {
   className?: string;
   item: Notification;
}

export const NotificationItem = memo((props: PropsWithChildren<NotificationItemProps>) => {
    const { className, item } = props;

    const { t, i18n } = useTranslation('notifications');

    const notificationContent = useCallback((item: Notification) => {
        switch (item.type) {
        case 'rating':
            return (
                <Text text={`Поздравляем! Ваш рейтинг теперь ${item.value}!`} />
            );

        case 'smbSubscribed':
            return (
                <p>
                    <AppLink to={`/users/${item.name}`}>
                        {`@${item.name}`}
                    </AppLink>
                    {t(' подписался на Вас!')}
                </p>
            );

        case 'subsNumber':
            return (
                <Text text={`Поздравляем! Теперь у Вас ${item.value} подписчиков!`} />
            );

        default:
            return null;
        }
    }, [t]);

    return (
        <Card
            variant="light"
            padding="16"
            className={classNames(cls.NotificationItem, {}, [className])}
        >
            {formatDateToLocal(item.createdAt, i18n.language)}
            {notificationContent(item)}
        </Card>

    );
});
