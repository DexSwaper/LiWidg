import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeProvider as MuiThemeProvider, useMediaQuery, } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useAppearance } from '../../stores/settings/useAppearance.js';
import { createTheme } from '../../themes/createTheme.js';
import { useWidgetConfig } from '../WidgetProvider/WidgetProvider.js';
export const ThemeProvider = ({ children, }) => {
    const { appearance: colorSchemeMode, theme: themeConfig } = useWidgetConfig();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [appearance, setAppearance] = useAppearance();
    const [mode, setMode] = useState(colorSchemeMode ?? appearance === 'auto'
        ? prefersDarkMode
            ? 'dark'
            : 'light'
        : appearance);
    useEffect(() => {
        if (appearance === 'auto') {
            setMode(prefersDarkMode ? 'dark' : 'light');
        }
        else {
            setMode(appearance);
        }
    }, [appearance, prefersDarkMode]);
    useEffect(() => {
        if (colorSchemeMode) {
            setAppearance(colorSchemeMode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colorSchemeMode]);
    const theme = useMemo(() => createTheme(mode, themeConfig), [mode, themeConfig]);
    return _jsx(MuiThemeProvider, { theme: theme, children: children });
};
//# sourceMappingURL=ThemeProvider.js.map