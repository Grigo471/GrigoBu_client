import { type PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/Skeleton';
import { useGetNotificationsList } from '../../api/notificationApi';
import cls from './NotificationsList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationsListProps {
   className?: string;
}

export const NotificationsList = memo((props: PropsWithChildren<NotificationsListProps>) => {
    const { className } = props;
    const { t } = useTranslation();

    const { data, isLoading } = useGetNotificationsList(null, {
        pollingInterval: 3000,
    });

    const Skeleton = SkeletonRedesigned;

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
