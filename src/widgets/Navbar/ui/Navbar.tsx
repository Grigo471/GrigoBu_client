import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal';
import cls from './Navbar.module.scss';

interface NavbarProps {
 className?: string;
}

export function Navbar(props: NavbarProps) {
    const { className } = props;
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                className={cls.links}
                onClick={onToggleModal}
                theme={ThemeButton.CLEAR_INVERTED}
            >
                {t('Войти')}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                {/* eslint-disable */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo accusamus fugiat debitis, laboriosam blanditiis at totam quibusdam asperiores ratione incidunt nam animi! Est, nesciunt quod? Provident quisquam ducimus nesciunt nam.
            </Modal>
        </div>
    );
}
