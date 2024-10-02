import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import cls from './AuthForm.module.scss';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { getAuthUsername } from '../../model/selectors/getAuthUsername/getAuthUsername';
import { getAuthPassword } from '../../model/selectors/getAuthPassword/getAuthPassword';
import { getAuthIsLoading } from '../../model/selectors/getAuthIsLoading/getAuthIsLoading';
import { getAuthError } from '../../model/selectors/getAuthError/getAuthError';
import { authActions, authReducer } from '../../model/slice/authSlice';
import { login } from '../../model/services/login/login';
import { registration } from '../../model/services/registration/registration';

export interface AuthFormProps {
    className?: string;
    isOpen?: boolean;
}

const reducers: ReducerList = {
    authForm: authReducer,
};

const AuthForm = memo((props: AuthFormProps) => {
    const { className, isOpen } = props;

    const dispatch = useAppDispatch();

    const [isLogin, setIsLogin] = useState(true);

    const username = useSelector(getAuthUsername);
    const password = useSelector(getAuthPassword);
    const isLoading = useSelector(getAuthIsLoading);
    const error = useSelector(getAuthError);

    const onChangeUserName = useCallback((value: string) => {
        dispatch(authActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(authActions.setPassword(value));
    }, [dispatch]);

    const onSubmit = useCallback(() => {
        if (isLogin) {
            dispatch(login({ username, password }));
        } else {
            dispatch(registration({ username, password }));
        }
    }, [dispatch, password, username, isLogin]);

    const onToggle = useCallback(() => {
        setIsLogin((prev) => !prev);
    }, [setIsLogin]);

    const { t } = useTranslation();

    useDynamicModuleLoad({ reducers });

    return (

        <VStack gap="8" className={classNames(cls.AuthForm, {}, [className])}>
            <Text title={isLogin ? t('Войти') : t('Создать аккаунт')} />
            {error && (
                <Text
                    text={error}
                    variant="error"
                />
            )}
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Введите имя пользователя')}
                autoFocus={isOpen}
                onChange={onChangeUserName}
                value={username}
            />
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Введите пароль')}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                className={cls.submitBtn}
                onClick={onSubmit}
                disabled={isLoading}
            >
                {isLogin ? t('Войти') : t('Создать аккаунт')}
            </Button>
            <Button
                className={cls.toggleBtn}
                onClick={onToggle}
                disabled={isLoading}
            >
                {isLogin ? t('Создать аккаунт') : t('У меня уже есть аккаунт')}
            </Button>
        </VStack>

    );
});

export default AuthForm;
