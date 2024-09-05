import { memo, useCallback } from 'react';

import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { Icon } from '@/shared/ui/Icon';

interface ThemeSwitcherProps {
   className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props;
    const { toggleTheme } = useTheme();

    const onToggleHandler = useCallback(() => {
        toggleTheme();
    }, [toggleTheme]);

    return (

        <Icon Svg={ThemeIcon} className={className} clickable onClick={onToggleHandler} />

    );
});
