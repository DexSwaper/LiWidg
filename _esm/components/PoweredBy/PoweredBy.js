import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Tooltip, Typography } from '@mui/material';
import { version } from '../../config/version.js';
import { Link } from './PoweredBy.style.js';
export const PoweredBy = () => {
    return (_jsx(Box, { pt: 1, pb: 2, flex: 1, sx: {
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
        }, children: _jsx(Tooltip, { title: `v${version}`, placement: "top", enterDelay: 1000, arrow: true, children: _jsxs(Link, { href: "https://li.fi", target: "_blank", underline: "none", color: "text.primary", children: [_jsx(Typography, { color: "text.secondary", fontSize: 12, fontWeight: 500, px: 0.5, children: "Powered by" }), _jsx(Typography, { color: "text.primary", fontSize: 12, fontWeight: 600, children: "LI.FI" })] }) }) }));
};
//# sourceMappingURL=PoweredBy.js.map