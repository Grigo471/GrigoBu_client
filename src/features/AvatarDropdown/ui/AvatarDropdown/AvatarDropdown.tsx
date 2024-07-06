import { type PropsWithChildren, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import { Dropdown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig';

interface AvatarDropdownProps {
   className?: string;
   onCloseModal: () => void;
}

export const AvatarDropdown = memo((props: PropsWithChildren<AvatarDropdownProps>) => {
    const { className, onCloseModal } = props;
    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);

    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
        onCloseModal();
    }, [dispatch, onCloseModal]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) return null;

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            direction="bottomLeft"
            items={[
                ...(isAdminPanelAvailable ? [{
                    content: t('Админка'),
                    href: RoutePaths.admin_panel,
                }] : []),
                {
                    content: t('Профиль'),
                    href: RoutePaths.profile + authData.id,
                },
                {
                    content: t('Выйти'),
                    onClick: onLogout,
                },
            ]}
            trigger={<Avatar size={30} src={authData.avatar} />}
        />
    );
});
