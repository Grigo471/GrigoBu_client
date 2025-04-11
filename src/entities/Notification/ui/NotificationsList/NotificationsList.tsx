import { type PropsWithChildren, memo, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useGetNotificationsList, useViewNotifications } from '../../api/notificationApi';
import cls from './NotificationsList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationsListProps {
   className?: string;
}

export const NotificationsList = memo((props: PropsWithChildren<NotificationsListProps>) => {
    const { className } = props;

    const { data, isLoading } = useGetNotificationsList(null, { refetchOnFocus: true });
    const [viewNotifications] = useViewNotifications();

    useEffect(() => {
        setTimeout(async () => { await viewNotifications(); }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames(cls.NotificationsList, {}, [className])}
            >
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls.NotificationsList, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    );
});
