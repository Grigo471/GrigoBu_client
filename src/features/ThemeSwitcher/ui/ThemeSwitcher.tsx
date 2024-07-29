import { memo, useCallback, type PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import ThemeIcon from '@/shared/assets/icons/theme-old.svg';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { Theme } from '@/shared/const/theme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Icon } from '@/shared/ui/deprecated/Icon';

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
            theme={ThemeButton.CLEAR_INVERTED}
            className={classNames('', {}, [className])}
            onClick={onToggleHandler}
        >
            <Icon Svg={ThemeIcon} width={40} height={40} inverted />
        </Button>
    );
});
