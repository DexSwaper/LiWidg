'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useMemo } from 'react';
import { AppDefault } from './AppDefault.js';
import { AppDrawer } from './AppDrawer.js';
import { AppProvider } from './AppProvider.js';
export const App = forwardRef(({ elementRef, open, onClose, integrator, ...other }, ref) => {
    const config = useMemo(() => {
        const config = { integrator, ...other, ...other.config };
        if (config.variant === 'drawer') {
            config.theme = {
                ...config.theme,
                container: {
                    height: '100%',
                    ...config.theme?.container,
                },
            };
        }
        return config;
    }, [integrator, other]);
    if (config.variant === 'drawer') {
        return (_jsx(AppProvider, { config: config, children: _jsx(AppDrawer, { ref: ref, elementRef: elementRef, config: config, open: open, onClose: onClose, children: _jsx(AppDefault, {}) }) }));
    }
    return (_jsx(AppProvider, { config: config, children: _jsx(AppDefault, {}) }));
});
//# sourceMappingURL=App.js.map