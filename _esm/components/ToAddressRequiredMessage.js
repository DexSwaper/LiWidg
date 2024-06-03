import { jsx as _jsx } from "react/jsx-runtime";
import { Wallet } from '@mui/icons-material';
import { Box, Collapse, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useToAddressRequirements } from '../hooks/useToAddressRequirements.js';
import { useFieldValues } from '../stores/form/useFieldValues.js';
import { AlertMessage } from './AlertMessage/AlertMessage.js';
export const ToAddressRequiredMessage = ({ route, ...props }) => {
    const { t } = useTranslation();
    const [toAddress] = useFieldValues('toAddress');
    const { requiredToAddress } = useToAddressRequirements();
    const showMessage = route && requiredToAddress && !toAddress;
    return (_jsx(Collapse, { timeout: 225, in: showMessage, unmountOnExit: true, mountOnEnter: true, children: _jsx(Box, { ...props, children: _jsx(AlertMessage, { title: _jsx(Typography, { variant: "body2", px: 1, color: "text.primary", children: t('info.message.toAddressIsRequired') }), icon: _jsx(Wallet, {}), multilineTitle: true }) }) }));
};
//# sourceMappingURL=ToAddressRequiredMessage.js.map