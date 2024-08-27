import { useTranslation } from 'react-i18next';
import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import { NotificationsButton } from '@/features/NotificationsButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import cls from './Navbar.module.scss';
import { Button } from '@/shared/ui/Button';
import { getNavigationItems } from '../../model/selectors/getNavigationItems';
import { NavigationItem } from '../NavigationItem/NavigationItem';
import { AppLogo } from '@/shared/ui/AppLogo';

interface NavbarProps {
 className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const authData = useSelector(getUserAuthData);
    const SidebarItemsList = useSelector(getNavigationItems);

    const ItemsList = useMemo(() => SidebarItemsList.map((item) => (
        <NavigationItem
            item={item}
            key={item.path}
        />
    )), [SidebarItemsList]);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const actionsToolbar = authData ? (
        <HStack gap="16" className={cls.actions} justify="center" align="center">
            <NotificationsButton />
            <AvatarDropdown onCloseModal={onCloseModal} />
        </HStack>
    ) : (
        <>
            <Button
                className={cls.links}
                onClick={onShowModal}
                variant="clear"
            >
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
        </>
    );

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <AppLogo size={30} className={cls.appLogo} />
            <HStack role="navigation" gap="24" className={cls.items}>
                {ItemsList}
            </HStack>
            {actionsToolbar}
        </header>
    );
});
