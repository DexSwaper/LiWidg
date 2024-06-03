import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
export const RouteNotFoundCard = () => {
    const { t } = useTranslation();
    return (_jsxs(Box, { sx: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flex: 1,
        }, py: 1.625, children: [_jsx(Typography, { fontSize: 48, children: _jsx(Route, { fontSize: "inherit" }) }), _jsx(Typography, { fontSize: 18, fontWeight: 700, children: t('info.title.routeNotFound') }), _jsx(Typography, { fontSize: 14, color: "text.secondary", textAlign: "center", mt: 2, children: t('info.message.routeNotFound') })] }));
};
//# sourceMappingURL=RouteNotFoundCard.js.map