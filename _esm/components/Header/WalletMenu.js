import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ChainType } from '@lifi/sdk';
import { getConnectorIcon } from '@lifi/wallet-management';
import { ContentCopyRounded, OpenInNewRounded, PowerSettingsNewRounded, } from '@mui/icons-material';
import { Avatar, Badge, Box, Button, IconButton, MenuItem, } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from '../../hooks/useAccount.js';
import { useAvailableChains } from '../../hooks/useAvailableChains.js';
import { navigationRoutes } from '../../utils/navigationRoutes.js';
import { shortenAddress } from '../../utils/wallet.js';
import { AvatarMasked } from '../Avatar/Avatar.style.js';
import { SmallAvatar } from '../SmallAvatar.js';
import { EVMDisconnectIconButton } from './EVMDisconnectIconButton.js';
import { SVMDisconnectIconButton } from './SVMDisconnectIconButton.js';
export const WalletMenu = ({ onClose }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { accounts } = useAccount();
    const { getChainById } = useAvailableChains();
    const connect = async () => {
        navigate(navigationRoutes.selectWallet);
        onClose();
    };
    return (_jsxs(_Fragment, { children: [_jsx(Box, { display: "flex", flexDirection: "column", children: accounts.map((account) => {
                    const chain = getChainById(account.chainId);
                    const walletAddress = shortenAddress(account.address);
                    const handleCopyAddress = async () => {
                        await navigator.clipboard.writeText(account.address ?? '');
                        onClose();
                    };
                    return (_jsxs(MenuItem, { children: [_jsxs(Box, { flex: 1, display: "flex", alignItems: "center", children: [chain?.logoURI ? (_jsx(Badge, { overlap: "circular", anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, badgeContent: _jsx(SmallAvatar, { src: chain?.logoURI, alt: chain?.name, children: chain?.name[0] }), sx: { marginRight: 1.5 }, children: _jsx(AvatarMasked, { src: getConnectorIcon(account.connector), alt: account.connector?.name, children: account.connector?.name[0] }) })) : (_jsx(Avatar, { src: getConnectorIcon(account.connector), alt: account.connector?.name, sx: {
                                            marginRight: 1.5,
                                        }, children: account.connector?.name[0] })), walletAddress] }), _jsxs(Box, { ml: 1, children: [_jsx(IconButton, { size: "medium", onClick: handleCopyAddress, children: _jsx(ContentCopyRounded, {}) }), _jsx(IconButton, { size: "medium", component: "a", onClick: onClose, href: `${chain?.metamask.blockExplorerUrls[0]}address/${account.address}`, target: "_blank", children: _jsx(OpenInNewRounded, {}) }), account.chainType === ChainType.EVM ? (_jsx(EVMDisconnectIconButton, { connector: account.connector })) : account.chainType === ChainType.SVM ? (_jsx(SVMDisconnectIconButton, {})) : null] })] }, account.address));
                }) }), !pathname.includes(navigationRoutes.selectWallet) ? (_jsx(Button, { onClick: connect, fullWidth: true, startIcon: _jsx(PowerSettingsNewRounded, {}), sx: {
                    marginTop: 1,
                }, children: accounts.length > 1
                    ? t(`button.changeWallet`)
                    : t(`button.connectWallet`) })) : null] }));
};
//# sourceMappingURL=WalletMenu.js.map