import { type PropsWithChildren, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popups';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { NotificationsList } from 'entities/Notification';
import NotificationsSVG from 'shared/assets/icons/notifications.svg';
import cls from './NotificationsButton.module.scss';

interface NotificationsButtonProps {
   className?: string;
}

export const NotificationsButton = memo((props: PropsWithChildren<NotificationsButtonProps>) => {
    const { className } = props;

    return (
        <Popover
            className={classNames(cls.NotificationsButton, {}, [className])}
            trigger={(
                <Button theme={ThemeButton.CLEAR}>
                    <Icon Svg={NotificationsSVG} inverted />
                </Button>
            )}
        >
            <NotificationsList className={cls.notifications} />
        </Popover>
    );
});
