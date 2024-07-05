import {
    type PropsWithChildren, memo, useCallback, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popups';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { NotificationsList } from 'entities/Notification';
import NotificationsSVG from 'shared/assets/icons/notifications.svg';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { useDevice } from 'shared/lib/hooks/useDevice';
import cls from './NotificationsButton.module.scss';

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
        <Button onClick={onDrawerOpen} theme={ThemeButton.CLEAR}>
            <Icon Svg={NotificationsSVG} inverted />
        </Button>
    );

    return (
        <div>

            { isMobile ? (
                <>
                    {trigger}
                    <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose}>
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
