import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LinkRounded, Wallet } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CircularIcon } from './CircularProgress.style.js';
import { LinkButton } from './StepProcess.style.js';
export const DestinationWalletAddress = ({ step, toAddress, toAddressLink }) => {
    const { t } = useTranslation();
    const isDone = step.execution?.status === 'DONE';
    return (_jsx(Box, { px: 2, py: 1, children: _jsxs(Box, { sx: {
                display: 'flex',
                alignItems: 'center',
            }, children: [_jsx(CircularIcon, { status: isDone ? 'DONE' : 'NOT_STARTED', children: _jsx(Wallet, { color: isDone ? 'success' : 'inherit', sx: {
                            position: 'absolute',
                            fontSize: '1.25rem',
                        } }) }), _jsx(Typography, { mx: 2, flex: 1, fontSize: 14, fontWeight: 400, children: isDone
                        ? t('main.sentToAddress', {
                            address: toAddress,
                        })
                        : t('main.sendToAddress', {
                            address: toAddress,
                        }) }), _jsx(LinkButton, { size: "medium", LinkComponent: Link, href: toAddressLink, target: "_blank", rel: "nofollow noreferrer", children: _jsx(LinkRounded, {}) })] }) }));
};
//# sourceMappingURL=DestinationWalletAddress.js.map