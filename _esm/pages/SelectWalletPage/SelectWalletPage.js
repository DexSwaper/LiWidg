import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChainType } from '@lifi/sdk';
import { isWalletInstalled } from '@lifi/wallet-management';
import { Button, DialogActions, DialogContent, DialogContentText, List, useMediaQuery, } from '@mui/material';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConnect, useAccount as useWagmiAccount } from 'wagmi';
import { Dialog } from '../../components/Dialog.js';
import { PageContainer } from '../../components/PageContainer.js';
import { useHeader } from '../../hooks/useHeader.js';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
import { isItemAllowed } from '../../utils/item.js';
import { EVMListItemButton } from './EVMListItemButton.js';
import { SVMListItemButton } from './SVMListItemButton.js';
import { walletComparator } from './utils.js';
export const SelectWalletPage = () => {
    const { t } = useTranslation();
    const { chains } = useWidgetConfig();
    const account = useWagmiAccount();
    const { connectors } = useConnect();
    const [walletIdentity, setWalletIdentity] = useState({ show: false });
    const { wallets: solanaWallets } = useWallet();
    useHeader(t(`header.selectWallet`));
    const isDesktopView = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const closeDialog = () => {
        setWalletIdentity((state) => ({
            ...state,
            show: false,
        }));
    };
    const handleNotInstalled = useCallback(async (connector) => {
        setWalletIdentity({
            show: true,
            connector,
        });
    }, []);
    const wallets = useMemo(() => {
        const evmInstalled = isItemAllowed(ChainType.EVM, chains?.types)
            ? connectors.filter((connector) => isWalletInstalled(connector.id) &&
                // We should not show already connected connectors
                account.connector?.id !== connector.id)
            : [];
        const evmNotDetected = isItemAllowed(ChainType.EVM, chains?.types)
            ? connectors.filter((connector) => !isWalletInstalled(connector.id))
            : [];
        const svmInstalled = isItemAllowed(ChainType.SVM, chains?.types)
            ? solanaWallets?.filter((connector) => connector.adapter.readyState === WalletReadyState.Installed &&
                // We should not show already connected connectors
                !connector.adapter.connected)
            : [];
        const svmNotDetected = isItemAllowed(ChainType.SVM, chains?.types)
            ? solanaWallets?.filter((connector) => connector.adapter.readyState !== WalletReadyState.Installed)
            : [];
        const installedWallets = [...evmInstalled, ...svmInstalled].sort(walletComparator);
        if (isDesktopView) {
            const notDetectedWallets = [...evmNotDetected, ...svmNotDetected].sort(walletComparator);
            installedWallets.push(...notDetectedWallets);
        }
        return installedWallets;
    }, [
        account.connector?.id,
        chains?.types,
        connectors,
        isDesktopView,
        solanaWallets,
    ]);
    return (_jsxs(PageContainer, { disableGutters: true, children: [_jsx(List, { sx: {
                    paddingTop: 0,
                    paddingLeft: 1.5,
                    paddingRight: 1.5,
                    paddingBottom: 1.5,
                }, children: wallets?.map((connector) => connector.uid ? (_jsx(EVMListItemButton, { connector: connector, connectedConnector: account.connector, onNotInstalled: handleNotInstalled }, connector.uid)) : (_jsx(SVMListItemButton, { wallet: connector }, connector.adapter.name))) }), _jsxs(Dialog, { open: walletIdentity.show, onClose: closeDialog, children: [_jsx(DialogContent, { children: _jsx(DialogContentText, { children: t('wallet.extensionNotFound', {
                                name: walletIdentity.connector?.name,
                            }) }) }), _jsx(DialogActions, { children: _jsx(Button, { variant: "contained", onClick: closeDialog, autoFocus: true, children: t('button.ok') }) })] })] }));
};
//# sourceMappingURL=SelectWalletPage.js.map