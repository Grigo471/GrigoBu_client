import { memo, useCallback, type PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import Icon from '@/shared/assets/icons/theme.svg';
import { Button, ThemeButton } from '@/shared/ui/Button';
import cls from './ThemeSwitcher.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { Theme } from '@/shared/const/theme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface ThemeSwitcherProps {
   className?: string;
}

export const ThemeSwitcher = memo((props: PropsWithChildren<ThemeSwitcherProps>) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { toggleTheme } = useTheme();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme: Theme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [toggleTheme, dispatch]);

    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [className])}
            onClick={onToggleHandler}
        >
            <Icon className={cls.icon} />
        </Button>
    );
});
