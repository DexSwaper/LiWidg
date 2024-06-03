import { jsx as _jsx } from "react/jsx-runtime";
import { WarningRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AlertMessage } from '../AlertMessage/AlertMessage.js';
export const FundsSufficiencyMessage = () => {
    const { t } = useTranslation();
    return (_jsx(AlertMessage, { severity: "warning", icon: _jsx(WarningRounded, {}), title: _jsx(Typography, { variant: "body2", px: 1, color: "text.primary", children: t(`warning.message.insufficientFunds`) }), multilineTitle: true }));
};
//# sourceMappingURL=FundsSufficiencyMessage.js.map