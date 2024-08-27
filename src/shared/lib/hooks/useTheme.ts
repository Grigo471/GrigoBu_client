import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Theme } from '../../const/theme';

interface UseThemeResult {
    toggleTheme: (saveAction: (theme: Theme) => void) => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (saveAction: (theme: Theme) => void) => {
        const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
        setTheme?.(newTheme);
        saveAction?.(newTheme);
    };

    return { theme: theme || Theme.LIGHT, toggleTheme };
}
