import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { HStack } from '@/shared/ui/Stack';
import { NotificationsButton } from '@/features/NotificationsButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import cls from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface NavbarProps {
 className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.NavbarRedesigned,
        off: () => cls.Navbar,
    });

    if (authData) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={(
                    <div className={classNames(mainClass, {}, [className])}>
                        <HStack gap="16" className={cls.actions}>
                            <NotificationsButton />
                            <AvatarDropdown onCloseModal={onCloseModal} />
                        </HStack>
                    </div>
                )}
                off={(
                    <div className={classNames(mainClass, {}, [className])}>
                        <Text
                            className={cls.appName}
                            title={t('Грига')}
                            theme={TextTheme.INVERTED}
                        />
                        <AppLink
                            to={getRouteArticleCreate()}
                            theme={AppLinkTheme.SECONDARY}
                            className={cls.createLink}
                        >
                            {t('Создать статью')}
                        </AppLink>
                        <HStack gap="16" className={cls.actions}>

                            <NotificationsButton />
                            <AvatarDropdown onCloseModal={onCloseModal} />

                        </HStack>
                    </div>
                )}
            />
        );
    }

    return (
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={(
                    <Button
                        className={cls.links}
                        onClick={onShowModal}
                        variant="clear"
                    >
                        {t('Войти')}
                    </Button>
                )}
                off={(
                    <ButtonDeprecated
                        className={cls.links}
                        onClick={onShowModal}
                        theme={ThemeButton.CLEAR_INVERTED}
                    >
                        {t('Войти')}
                    </ButtonDeprecated>
                )}
            />
            { isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
        </header>
    );
});
