import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LinkRounded } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { useProcessMessage } from '../../hooks/useProcessMessage.js';
import { CircularProgress } from './CircularProgress.js';
import { LinkButton } from './StepProcess.style.js';
export const StepProcess = ({ step, process }) => {
    const { title, message } = useProcessMessage(step, process);
    return (_jsxs(Box, { px: 2, py: 1, children: [_jsxs(Box, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                }, children: [_jsx(CircularProgress, { process: process }), _jsx(Typography, { mx: 2, flex: 1, fontSize: 14, fontWeight: process.error ? 600 : 400, children: title }), process.txLink ? (_jsx(LinkButton, { size: "medium", LinkComponent: Link, href: process.txLink, target: "_blank", rel: "nofollow noreferrer", children: _jsx(LinkRounded, {}) })) : null] }), message ? (_jsx(Typography, { ml: 7, fontSize: 14, fontWeight: 500, color: "text.secondary", children: message })) : null] }));
};
//# sourceMappingURL=StepProcess.js.map