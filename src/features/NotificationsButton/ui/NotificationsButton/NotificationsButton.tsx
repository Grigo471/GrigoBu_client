import {
    type PropsWithChildren, memo, useCallback, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NotificationsList, useGetNotificationsCount } from '@/entities/Notification';
import Notifications from '@/shared/assets/icons/notifications.svg';
import { Drawer } from '@/shared/ui/Drawer';
import { useDevice } from '@/shared/lib/hooks/useDevice';
import cls from './NotificationsButton.module.scss';
import { Icon } from '@/shared/ui/Icon';
import { Popover } from '@/shared/ui/Popups';

interface NotificationsButtonProps {
   className?: string;
}

export const NotificationsButton = memo((props: PropsWithChildren<NotificationsButtonProps>) => {
    const { className } = props;

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const isMobile = useDevice();

    const { data: notificationsCount } = useGetNotificationsCount(null, {
        pollingInterval: 5000,
    });

    const onDrawerOpen = useCallback(() => {
        setIsDrawerOpen(true);
    }, []);

    const onDrawerClose = useCallback(() => {
        setIsDrawerOpen(false);
    }, []);

    const trigger = (
        <div className={cls.trigger}>
            <Icon Svg={Notifications} clickable onClick={onDrawerOpen} />
            <div className={cls.countWrapper}>
                <p className={cls.count}>
                    {notificationsCount && notificationsCount > 0 && notificationsCount}
                </p>
            </div>
        </div>
    );

    return (
        <div>

            { isMobile ? (
                <>
                    {trigger}
                    <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose} lazy>
                        <NotificationsList />
                    </Drawer>

                </>
            ) : (

                <Popover
                    className={classNames(cls.NotificationsButton, {}, [className])}
                    trigger={trigger}
                >
                    <NotificationsList className={cls.notifications} />
                </Popover>

            )}

        </div>

    );
});
