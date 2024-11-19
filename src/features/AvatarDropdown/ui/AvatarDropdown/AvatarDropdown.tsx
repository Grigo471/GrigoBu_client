import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    getUserAuthData, getUserAvatar, isUserAdmin, isUserModerator,
    logout,
} from '@/entities/User';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { Dropdown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface AvatarDropdownProps {
   className?: string;
   onCloseModal: () => void;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className, onCloseModal } = props;
    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);
    const avatar = useSelector(getUserAvatar);

    const isAdmin = useSelector(isUserAdmin);
    const isModerator = useSelector(isUserModerator);

    const dispatch = useAppDispatch();

    const onLogout = useCallback(async () => {
        await dispatch(logout());
        onCloseModal();
    }, [dispatch, onCloseModal]);

    const isAdminPanelAvailable = isAdmin || isModerator;

    if (!authData) return null;

    const items = [
        ...(isAdminPanelAvailable ? [{
            content: t('Админ панель'),
            href: getRouteAdmin(),
        }] : []),
        {
            content: t('Профиль'),
            href: getRouteProfile(authData.username),
        },
        {
            content: t('Выйти'),
            onClick: onLogout,
        },
    ];

    return (

        <Dropdown
            className={classNames('', {}, [className])}
            direction="bottomLeft"
            items={items}
            trigger={<Avatar size={40} src={avatar} />}
        />

    );
});
