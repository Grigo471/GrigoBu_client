import { memo, type PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import Icon from '@/shared/assets/icons/theme.svg';
import { Button, ThemeButton } from '@/shared/ui/Button';
import cls from './ThemeSwitcher.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme';

interface ThemeSwitcherProps {
   className?: string;
}

export const ThemeSwitcher = memo((props: PropsWithChildren<ThemeSwitcherProps>) => {
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
});
