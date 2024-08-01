import { type PropsWithChildren, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { getRouteProfile, getRouteSettings } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

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

    const items = [
        ...(isAdminPanelAvailable ? [{
            content: t('Настройки'),
            href: getRouteSettings(),
        }] : []),
        {
            content: t('Профиль'),
            href: getRouteProfile(authData.id),
        },
        {
            content: t('Выйти'),
            onClick: onLogout,
        },
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Dropdown
                    className={classNames('', {}, [className])}
                    direction="bottomLeft"
                    items={items}
                    trigger={<Avatar size={40} src={authData.avatar} />}
                />
            )}
            off={(
                <DropdownDeprecated
                    className={classNames('', {}, [className])}
                    direction="bottomLeft"
                    items={items}
                    trigger={<AvatarDeprecated fallbackInverted size={30} src={authData.avatar} />}
                />
            )}
        />
    );
});
