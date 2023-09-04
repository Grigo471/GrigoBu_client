import { createContext } from 'react';

export enum Theme {
    LIGHT = 'app_ligth_theme',
    DARK = 'app_dark_theme',
    BROWN = 'app_brown_theme',
}

export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
