import { useTranslation } from 'react-i18next';
import {
    PropsWithChildren, memo, useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { ReducerList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import cls from './LoginForm.module.scss';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUserName';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { VStack } from '@/shared/ui/Stack';

export interface LoginFormProps {
    className?: string;
    isOpen?: boolean;
}

const reducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: PropsWithChildren<LoginFormProps>) => {
    const { className, isOpen } = props;

    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUserName = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    const { t } = useTranslation();

    useDynamicModuleLoad({ reducers });

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <VStack gap="8" className={classNames(cls.LoginForm, {}, [className])}>
                    <Text title={t('Форма авторизации')} />
                    {error
                            && (
                                <Text
                                    text={t('Неверный логин или пароль')}
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
                        className={cls.loginBtn}
                        onClick={onLoginClick}
                        disabled={isLoading}
                    >
                        {t('Войти')}
                    </Button>
                </VStack>
            )}
            off={(
                <div className={classNames(cls.LoginForm, {}, [className])}>
                    <TextDeprecated title={t('Форма авторизации')} />
                    {error
                    && (
                        <TextDeprecated
                            text={t('Неверный логин или пароль')}
                            theme={TextTheme.ERROR}
                        />
                    )}
                    <InputDeprecated
                        type="text"
                        className={cls.input}
                        placeholder={t('Введите имя пользователя')}
                        autoFocus={isOpen}
                        onChange={onChangeUserName}
                        value={username}
                    />
                    <InputDeprecated
                        type="text"
                        className={cls.input}
                        placeholder={t('Введите пароль')}
                        onChange={onChangePassword}
                        value={password}
                    />
                    <ButtonDeprecated
                        theme={ThemeButton.OUTLINE}
                        className={cls.loginBtn}
                        onClick={onLoginClick}
                        disabled={isLoading}
                    >
                        {t('Войти')}
                    </ButtonDeprecated>
                </div>
            )}
        />
    );
});

export default LoginForm;
