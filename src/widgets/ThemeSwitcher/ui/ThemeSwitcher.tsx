import { classNames } from 'shared/lib/classNames/classNames';

import type { PropsWithChildren } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';

import Icon from 'shared/assets/icons/theme.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
   className?: string;
}

export function ThemeSwitcher(props: PropsWithChildren<ThemeSwitcherProps>) {
    const { className } = props;

    const { toggleTheme } = useTheme();

    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            <Icon className={cls.icon} />
        </Button>
    );
}
