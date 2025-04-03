import { useTranslation } from 'react-i18next';
import {
    memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import { NotificationsButton } from '@/features/NotificationsButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import cls from './Navbar.module.scss';
import { Button } from '@/shared/ui/Button';
import { NavigationItemsList } from '../../model/types/NavigationItemsList';
import { NavigationItem } from '../NavigationItem/NavigationItem';
import { AppLogo } from '@/shared/ui/AppLogo';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import BurgerIcon from '@/shared/assets/icons/burger.svg';
import { getRouteArticleCreate } from '@/shared/const/router';
import { AuthModal } from '@/features/AuthByUsername';
import { Overlay } from '@/shared/ui/Overlay';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

interface NavbarProps {
 className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    const authData = useSelector(getUserAuthData);

    const ItemsList = useMemo(() => NavigationItemsList.map((item) => (
        <NavigationItem
            item={item}
            key={item.path}
            collapsed={!isSidebarOpen}
        />
    )), [isSidebarOpen]);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onToggleSideBar = useCallback(() => {
        setIsSidebarOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    const actionsToolbar = authData ? (
        <HStack gap="16" className={cls.actions} justify="center" align="center">
            <AppLink to={getRouteArticleCreate()}>
                <Icon clickable Svg={PlusIcon} />
            </AppLink>
            <NotificationsButton />
            <AvatarDropdown onCloseModal={onCloseModal} />
        </HStack>
    ) : (
        <>
            <Button
                className={cls.login}
                onClick={onShowModal}
                variant="clear"
            >
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <AuthModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
        </>
    );

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <HStack className={cls.appLogo}>
                <Icon
                    Svg={BurgerIcon}
                    className={cls.burger}
                    clickable
                    onClick={onToggleSideBar}
                >
                    |||
                </Icon>
                <AppLogo size={30} />
            </HStack>
            <Overlay
                className={
                    classNames(cls.overlay, { [cls.overlayOpen]: isSidebarOpen }, [])
                }
                onClick={onToggleSideBar}
            />
            <div
                role="navigation"
                className={classNames(cls.items, { [cls.sidebarOpen]: isSidebarOpen }, [])}
            >
                {ItemsList}
                <div className={cls.settings}>
                    <LangSwitcher />
                    <ThemeSwitcher />
                </div>
            </div>
            {actionsToolbar}
        </header>
    );
});
