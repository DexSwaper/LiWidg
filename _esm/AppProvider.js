import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QueryClientProvider } from '@tanstack/react-query';
import { Fragment } from 'react';
import { MemoryRouter, useInRouterContext } from 'react-router-dom';
import { queryClient } from './config/queryClient.js';
import { I18nProvider } from './providers/I18nProvider/I18nProvider.js';
import { ThemeProvider } from './providers/ThemeProvider/ThemeProvider.js';
import { WalletProvider } from './providers/WalletProvider/WalletProvider.js';
import { WidgetProvider, useWidgetConfig, } from './providers/WidgetProvider/WidgetProvider.js';
import { StoreProvider } from './stores/StoreProvider.js';
import { URLSearchParamsBuilder } from './stores/form/URLSearchParamsBuilder.js';
export const AppProvider = ({ children, config, }) => {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(WidgetProvider, { config: config, children: _jsx(WalletProvider, { children: _jsx(ThemeProvider, { children: _jsx(I18nProvider, { children: _jsx(StoreProvider, { config: config, children: _jsx(AppRouter, { children: children }) }) }) }) }) }) }));
};
export const AppRouter = ({ children }) => {
    const { buildUrl } = useWidgetConfig();
    const inRouterContext = useInRouterContext();
    const Router = inRouterContext ? Fragment : MemoryRouter;
    return (_jsxs(Router, { children: [children, buildUrl ? _jsx(URLSearchParamsBuilder, {}) : null] }));
};
//# sourceMappingURL=AppProvider.js.map