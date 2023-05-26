import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import type { PropsWithChildren } from 'react';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
    isOpen?: boolean;
}

export function LoginForm(props: PropsWithChildren<LoginFormProps>) {
    const { className, isOpen } = props;

    const { t } = useTranslation();
    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Введите имя пользователя')}
                autoFocus={isOpen}
            />
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Введите пароль')}
            />
            <Button className={cls.loginBtn}>
                {t('Войти')}
            </Button>
        </div>
    );
}
