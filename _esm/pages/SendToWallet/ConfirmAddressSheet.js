import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Info, Wallet } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AlertMessage } from '../../components/AlertMessage/AlertMessage.js';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet.js';
import { useFieldActions } from '../../stores/form/useFieldActions.js';
import { useSendToWalletActions } from '../../stores/settings/useSendToWalletStore.js';
import { navigationRoutes } from '../../utils/navigationRoutes.js';
import { IconContainer, SendToWalletButtonRow, SendToWalletSheetContainer, SheetAddressContainer, SheetTitle, } from './SendToWalletPage.style.js';
export const ConfirmAddressSheet = forwardRef(({ validatedBookmark, onConfirm }, ref) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setFieldValue } = useFieldActions();
    const { setSendToWallet } = useSendToWalletActions();
    const handleClose = () => {
        ref.current?.close();
    };
    const handleConfirm = () => {
        if (validatedBookmark) {
            setFieldValue('toAddress', validatedBookmark.address, {
                isTouched: true,
            });
            onConfirm?.(validatedBookmark);
            setSendToWallet(true);
            handleClose();
            navigate(navigationRoutes.home);
        }
    };
    return (_jsx(BottomSheet, { ref: ref, children: _jsxs(SendToWalletSheetContainer, { children: [_jsx(IconContainer, { children: _jsx(Wallet, { sx: { fontSize: 40 } }) }), _jsx(SheetTitle, { children: t('sendToWallet.confirmWalletAddress') }), _jsxs(SheetAddressContainer, { children: [validatedBookmark?.name ? (_jsx(Typography, { fontWeight: 600, mb: 0.5, children: validatedBookmark?.name })) : null, _jsx(Typography, { children: validatedBookmark?.address })] }), _jsx(AlertMessage, { title: _jsx(Typography, { variant: "body2", children: t('info.message.fundsToExchange') }), icon: _jsx(Info, {}) }), _jsxs(SendToWalletButtonRow, { children: [_jsx(Button, { variant: "text", onClick: handleClose, fullWidth: true, children: t('button.cancel') }), _jsx(Button, { variant: "contained", onClick: handleConfirm, fullWidth: true, children: t('button.confirm') })] })] }) }));
});
//# sourceMappingURL=ConfirmAddressSheet.js.map