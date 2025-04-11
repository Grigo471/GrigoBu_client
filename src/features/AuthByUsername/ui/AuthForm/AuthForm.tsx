import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import cls from './AuthForm.module.scss';
import { Input, PasswordInput } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getAuthUsername } from '../../model/selectors/getAuthUsername/getAuthUsername';
import { getAuthPassword } from '../../model/selectors/getAuthPassword/getAuthPassword';
import { getAuthIsLoading } from '../../model/selectors/getAuthIsLoading/getAuthIsLoading';
import { getAuthApiError } from '../../model/selectors/getAuthApiError/getAuthApiError';
import { authActions, authReducer } from '../../model/slice/authSlice';
import { login } from '../../model/services/login/login';
import { registration } from '../../model/services/registration/registration';
import {
    getValidatePasswordErrors,
    getValidateUsernameErrors,
} from '../../model/selectors/getAuthValidateErrors/getAuthValidateErrors';
import {
    validateAuthErrorTranslations,
} from '../../model/consts/validateAuthErrors';
import { validatePassword } from '../../model/services/validateAuth/validatePassword';
import { validateUsername } from '../../model/services/validateAuth/validateUsername';
import {
    authApiErrorTranslation,
} from '../../model/services/translateAuthApiError/translateAuthApiError';
import { useDevice } from '@/shared/lib/hooks/useDevice';

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

    const isMobile = useDevice();

    const username = useSelector(getAuthUsername);
    const password = useSelector(getAuthPassword);
    const isLoading = useSelector(getAuthIsLoading);
    const apiError = useSelector(getAuthApiError);
    const validateUsernameErrors = useSelector(getValidateUsernameErrors);
    const validatePasswordErrors = useSelector(getValidatePasswordErrors);

    const onChangeUserName = useCallback((value: string) => {
        if (validateUsernameErrors.length > 0) {
            const nameErrors = validateUsername(value, isLogin);
            dispatch(authActions.setUsernameErrors(nameErrors));
        }
        dispatch(authActions.setUsername(value.trim()));
    }, [dispatch, validateUsernameErrors.length, isLogin]);

    const onChangePassword = useCallback((value: string) => {
        if (validatePasswordErrors.length > 0) {
            const passwordErrors = validatePassword(value, isLogin);
            dispatch(authActions.setPasswordErrors(passwordErrors));
        }
        dispatch(authActions.setPassword(value.trim()));
    }, [dispatch, validatePasswordErrors.length, isLogin]);

    const onSubmit = () => {
        if (isLogin) {
            dispatch(login({ username, password }));
        } else {
            dispatch(registration({ username, password }));
        }
    };

    const onToggle = useCallback(() => {
        setIsLogin((prev) => !prev);
    }, [setIsLogin]);

    const { t } = useTranslation('auth');

    useDynamicModuleLoad({ reducers });

    const [apiErrorTranslation, apiErrorUsername] = authApiErrorTranslation(apiError);

    return (

        <VStack gap="16" className={classNames(cls.AuthForm, {}, [className])}>
            <HStack max justify="between" align="center">
                <Text title={isLogin ? t('Вход') : t('Регистрация')} />
                <Button
                    className={cls.toggleBtn}
                    onClick={onToggle}
                    disabled={isLoading}
                    variant={isMobile ? 'outline' : 'filled'}
                >
                    {isLogin ? t('Нет аккаунта? Зарегистрируйтесь!') : t('У меня уже есть аккаунт')}
                </Button>
            </HStack>

            {apiError && (
                <Text
                    text={t(apiErrorTranslation, { username: apiErrorUsername })}
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
            {validateUsernameErrors.length > 0
                && validateUsernameErrors.map(
                    (error) => (
                        <Text
                            variant="error"
                            text={t(validateAuthErrorTranslations[error])}
                        />
                    ),
                )}
            <PasswordInput
                className={cls.input}
                placeholder={t('Введите пароль')}
                onChange={onChangePassword}
                value={password}
            />
            {validatePasswordErrors.length > 0
                && validatePasswordErrors.map(
                    (error) => (
                        <Text
                            variant="error"
                            text={t(validateAuthErrorTranslations[error])}
                        />
                    ),
                )}
            <Button
                className={cls.submitBtn}
                onClick={onSubmit}
                disabled={isLoading}
            >
                {isLogin ? t('Войти') : t('Создать аккаунт')}
            </Button>
        </VStack>

    );
});

export default AuthForm;
