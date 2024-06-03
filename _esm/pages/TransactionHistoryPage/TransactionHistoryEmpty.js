import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReceiptLongRounded } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
export const TransactionHistoryEmpty = () => {
    const { t } = useTranslation();
    return (_jsxs(Container, { sx: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingY: 12,
        }, children: [_jsx(Typography, { fontSize: 48, children: _jsx(ReceiptLongRounded, { fontSize: "inherit" }) }), _jsx(Typography, { fontSize: 18, fontWeight: 700, children: t('info.title.emptyTransactionHistory') }), _jsx(Typography, { fontSize: 14, color: "text.secondary", textAlign: "center", mt: 2, children: t('info.message.emptyTransactionHistory') })] }));
};
//# sourceMappingURL=TransactionHistoryEmpty.js.map