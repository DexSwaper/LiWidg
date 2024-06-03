import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getConnectorIcon } from '@lifi/wallet-management';
import { ExpandMore, Wallet } from '@mui/icons-material';
import { Avatar, Badge } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from '../../hooks/useAccount.js';
import { useChain } from '../../hooks/useChain.js';
import { useHasExternalWalletProvider } from '../../providers/WalletProvider/useHasExternalWalletProvider.js';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
import { HiddenUI } from '../../types/widget.js';
import { navigationRoutes } from '../../utils/navigationRoutes.js';
import { shortenAddress } from '../../utils/wallet.js';
import { SmallAvatar } from '../SmallAvatar.js';
import { CloseDrawerButton } from './CloseDrawerButton.js';
import { DrawerWalletContainer, HeaderAppBar, WalletAvatar, WalletButton, } from './Header.style.js';
import { WalletMenu } from './WalletMenu.js';
import { WalletMenuContainer } from './WalletMenu.style.js';
export const WalletHeader = () => {
    const { subvariant, hiddenUI } = useWidgetConfig();
    const { hasExternalProvider } = useHasExternalWalletProvider();
    return !hasExternalProvider &&
        subvariant !== 'split' &&
        !hiddenUI?.includes(HiddenUI.WalletMenu) ? (_jsx(HeaderAppBar, { elevation: 0, sx: { justifyContent: 'flex-end' }, children: _jsx(WalletMenuButton, {}) })) : null;
};
export const SplitWalletMenuButton = () => {
    const { hiddenUI } = useWidgetConfig();
    const { hasExternalProvider } = useHasExternalWalletProvider();
    return !hasExternalProvider && !hiddenUI?.includes(HiddenUI.WalletMenu) ? (_jsx(WalletMenuButton, {})) : null;
};
export const WalletMenuButton = () => {
    const { account } = useAccount();
    const { variant, hiddenUI } = useWidgetConfig();
    if (variant === 'drawer') {
        return (_jsxs(DrawerWalletContainer, { children: [account.isConnected ? (_jsx(ConnectedButton, { account: account })) : (_jsx(ConnectButton, {})), !hiddenUI?.includes(HiddenUI.DrawerCloseButton) ? (_jsx(CloseDrawerButton, { header: "wallet" })) : null] }));
    }
    return account.isConnected ? (_jsx(ConnectedButton, { account: account })) : (_jsx(ConnectButton, {}));
};
const ConnectButton = () => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const { walletConfig, subvariant, variant } = useWidgetConfig();
    const navigate = useNavigate();
    const connect = async () => {
        if (walletConfig?.onConnect) {
            walletConfig.onConnect();
            return;
        }
        navigate(navigationRoutes.selectWallet);
    };
    return (_jsx(WalletButton, { subvariant: subvariant, endIcon: variant !== 'drawer' && subvariant !== 'split' ? _jsx(Wallet, {}) : undefined, startIcon: variant === 'drawer' || subvariant === 'split' ? (_jsx(Wallet, { sx: { marginLeft: -0.25 } })) : undefined, onClick: !pathname.includes(navigationRoutes.selectWallet) ? connect : undefined, children: t(`button.connectWallet`) }));
};
const ConnectedButton = ({ account }) => {
    const { subvariant } = useWidgetConfig();
    const { chain } = useChain(account.chainId);
    const [anchorEl, setAnchorEl] = useState(null);
    const walletAddress = shortenAddress(account.address);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (_jsxs(_Fragment, { children: [_jsx(WalletButton, { subvariant: subvariant, endIcon: _jsx(ExpandMore, {}), startIcon: chain?.logoURI ? (_jsx(Badge, { overlap: "circular", anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, badgeContent: _jsx(SmallAvatar, { src: chain?.logoURI, alt: chain?.name, sx: { width: 12, height: 12 }, children: chain?.name[0] }), children: _jsx(WalletAvatar, { src: getConnectorIcon(account.connector), alt: account.connector?.name, children: account.connector?.name[0] }) })) : (_jsx(Avatar, { src: getConnectorIcon(account.connector), alt: account.connector?.name, sx: { width: 24, height: 24 }, children: account.connector?.name[0] })), onClick: handleClick, children: walletAddress }), _jsx(WalletMenuContainer, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleClose, children: _jsx(WalletMenu, { onClose: handleClose }) })] }));
};
//# sourceMappingURL=WalletHeader.js.map