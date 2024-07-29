import {
    type PropsWithChildren, memo, useCallback, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { NotificationsList } from '@/entities/Notification';
import NotificationsDeprecated from '@/shared/assets/icons/notifications-old.svg';
import Notifications from '@/shared/assets/icons/notifications.svg';
import { Drawer as DrawerDeprecated } from '@/shared/ui/deprecated/Drawer';
import { useDevice } from '@/shared/lib/hooks/useDevice';
import cls from './NotificationsButton.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Icon Svg={Notifications} clickable onClick={onDrawerOpen} />
            )}
            off={(
                <ButtonDeprecated onClick={onDrawerOpen} theme={ThemeButton.CLEAR}>
                    <IconDeprecated Svg={NotificationsDeprecated} inverted />
                </ButtonDeprecated>
            )}
        />
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
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={(
                        <Popover
                            className={classNames(cls.NotificationsButton, {}, [className])}
                            trigger={trigger}
                        >
                            <NotificationsList className={cls.notifications} />
                        </Popover>
                    )}
                    off={(
                        <PopoverDeprecated
                            className={classNames(cls.NotificationsButton, {}, [className])}
                            trigger={trigger}
                        >
                            <NotificationsList className={cls.notifications} />
                        </PopoverDeprecated>
                    )}
                />
            )}

        </div>

    );
});
