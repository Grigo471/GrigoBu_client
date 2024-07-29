import { memo, useCallback, type PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import ThemeIconDeprecated from '@/shared/assets/icons/theme-old.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { Theme } from '@/shared/const/theme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />
            )}
            off={(
                <ButtonDeprecated
                    theme={ThemeButton.CLEAR_INVERTED}
                    className={classNames('', {}, [className])}
                    onClick={onToggleHandler}
                >
                    <IconDeprecated Svg={ThemeIconDeprecated} width={40} height={40} inverted />
                </ButtonDeprecated>
            )}
        />
    );
});
