import {
    type PropsWithChildren, memo, useCallback, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NotificationsList } from '@/entities/Notification';
import Notifications from '@/shared/assets/icons/notifications.svg';
import { Drawer as DrawerDeprecated } from '@/shared/ui/Drawer';
import { useDevice } from '@/shared/lib/hooks/useDevice';
import cls from './NotificationsButton.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

interface NotificationsButtonProps {
   className?: string;
}

export const NotificationsButton = memo((props: PropsWithChildren<NotificationsButtonProps>) => {
    const { className } = props;

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const isMobile = useDevice();

    const onDrawerOpen = useCallback(() => {
        setIsDrawerOpen(true);
    }, []);

    const onDrawerClose = useCallback(() => {
        setIsDrawerOpen(false);
    }, []);

    const trigger = (

        <Icon Svg={Notifications} clickable onClick={onDrawerOpen} />

    );

    return (
        <div>

            { isMobile ? (
                <>
                    {trigger}
                    <DrawerDeprecated isOpen={isDrawerOpen} onClose={onDrawerClose} lazy>
                        <NotificationsList />
                    </DrawerDeprecated>

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
