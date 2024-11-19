import { useTranslation } from 'react-i18next';
import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
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
import { getRouteArticleCreate } from '@/shared/const/router';
import { AuthModal } from '@/features/AuthByUsername';

interface NavbarProps {
 className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const authData = useSelector(getUserAuthData);

    const ItemsList = useMemo(() => NavigationItemsList.map((item) => (
        <NavigationItem
            item={item}
            key={item.path}
        />
    )), []);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const actionsToolbar = authData ? (
        <HStack gap="16" className={cls.actions} justify="center" align="center">
            <AppLink to={getRouteArticleCreate()}>
                <Icon clickable Svg={PlusIcon} />
            </AppLink>
            <NotificationsButton />
            <AvatarDropdown />
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
            <AppLogo size={30} className={cls.appLogo} />
            <HStack role="navigation" gap="24" className={cls.items}>
                {ItemsList}
            </HStack>
            {actionsToolbar}
        </header>
    );
});
