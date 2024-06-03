import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { WarningRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { forwardRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet.js';
import { useSetContentHeight } from '../../hooks/useContentHeight.js';
import { CenterContainer, IconCircle } from './StatusBottomSheet.style.js';
import { calcValueLoss } from './utils.js';
export const TokenValueBottomSheet = forwardRef(({ route, onContinue, onCancel }, ref) => {
    const handleCancel = () => {
        ref.current?.close();
        onCancel?.();
    };
    return (_jsx(BottomSheet, { ref: ref, onClose: onCancel, children: _jsx(TokenValueBottomSheetContent, { route: route, onContinue: onContinue, onCancel: handleCancel }) }));
});
const TokenValueBottomSheetContent = ({ route, onCancel, onContinue, }) => {
    const { t } = useTranslation();
    const ref = useRef();
    useSetContentHeight(ref);
    return (_jsxs(Box, { p: 3, ref: ref, children: [_jsxs(CenterContainer, { children: [_jsx(IconCircle, { status: "warning", mb: 1, children: _jsx(WarningRounded, { color: "warning" }) }), _jsx(Typography, { py: 1, fontSize: 18, fontWeight: 700, children: t('warning.title.highValueLoss') })] }), _jsx(Typography, { py: 1, children: t('warning.message.highValueLoss') }), _jsxs(Box, { display: "flex", justifyContent: "space-between", mt: 1, children: [_jsx(Typography, { children: t('main.sending') }), _jsx(Typography, { fontWeight: 600, children: t('format.currency', { value: route.fromAmountUSD }) })] }), _jsxs(Box, { display: "flex", justifyContent: "space-between", mt: 0.25, children: [_jsx(Typography, { children: t('main.gasCost') }), _jsx(Typography, { fontWeight: 600, children: t('format.currency', { value: route.gasCostUSD }) })] }), _jsxs(Box, { display: "flex", justifyContent: "space-between", mt: 0.25, children: [_jsx(Typography, { children: t('main.receiving') }), _jsx(Typography, { fontWeight: 600, children: t('format.currency', { value: route.toAmountUSD }) })] }), _jsxs(Box, { display: "flex", justifyContent: "space-between", mt: 0.25, children: [_jsx(Typography, { children: t('main.valueLoss') }), _jsx(Typography, { fontWeight: 600, children: calcValueLoss(route) })] }), _jsxs(Box, { display: "flex", mt: 3, children: [_jsx(Button, { variant: "text", onClick: onCancel, fullWidth: true, children: t('button.cancel') }), _jsx(Box, { display: "flex", p: 1 }), _jsx(Button, { variant: "contained", onClick: onContinue, fullWidth: true, children: t('button.continue') })] })] }));
};
export const getTokenValueLossThreshold = (route) => {
    if (!route) {
        return false;
    }
    const fromAmountUSD = Number(route.fromAmountUSD || 0);
    const toAmountUSD = Number(route.toAmountUSD || 0);
    const gasCostUSD = Number(route.gasCostUSD || 0);
    if (!fromAmountUSD && !toAmountUSD) {
        return false;
    }
    return toAmountUSD / (fromAmountUSD + gasCostUSD) < 0.9;
};
//# sourceMappingURL=TokenValueBottomSheet.js.map