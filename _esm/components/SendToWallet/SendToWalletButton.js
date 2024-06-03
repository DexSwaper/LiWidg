import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloseRounded } from '@mui/icons-material';
import { Box, Collapse } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../../hooks/useAccount.js';
import { useToAddressRequirements } from '../../hooks/useToAddressRequirements.js';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
import { useBookmarkActions } from '../../stores/bookmarks/useBookmarkActions.js';
import { useBookmarks } from '../../stores/bookmarks/useBookmarks.js';
import { useFieldActions } from '../../stores/form/useFieldActions.js';
import { useFieldValues } from '../../stores/form/useFieldValues.js';
import { useSendToWalletStore } from '../../stores/settings/useSendToWalletStore.js';
import { DisabledUI, HiddenUI } from '../../types/widget.js';
import { defaultChainIdsByType, getChainTypeFromAddress, } from '../../utils/chainType.js';
import { navigationRoutes } from '../../utils/navigationRoutes.js';
import { shortenAddress } from '../../utils/wallet.js';
import { AccountAvatar } from '../Avatar/AccountAvatar.js';
import { Card } from '../Card/Card.js';
import { CardIconButton } from '../Card/CardIconButton.js';
import { CardTitle } from '../Card/CardTitle.js';
import { SendToWalletCardHeader } from './SendToWallet.style.js';
export const SendToWalletButton = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { disabledUI, hiddenUI, toAddress, toAddresses } = useWidgetConfig();
    const { showSendToWallet, showSendToWalletDirty } = useSendToWalletStore();
    const [toAddressFieldValue, toChainId, toTokenAddress] = useFieldValues('toAddress', 'toChain', 'toToken');
    const { setFieldValue } = useFieldActions();
    const { selectedBookmark } = useBookmarks();
    const { setSelectedBookmark } = useBookmarkActions();
    const { accounts } = useAccount();
    const { requiredToAddress } = useToAddressRequirements();
    const disabledToAddress = disabledUI?.includes(DisabledUI.ToAddress);
    const hiddenToAddress = hiddenUI?.includes(HiddenUI.ToAddress);
    const showInstantly = Boolean(!showSendToWalletDirty && toAddress && !hiddenToAddress) ||
        requiredToAddress;
    const address = toAddressFieldValue
        ? shortenAddress(toAddressFieldValue)
        : t('sendToWallet.enterAddress', {
            context: 'short',
        });
    const matchingConnectedAccount = accounts.find((account) => account.address === toAddressFieldValue);
    const chainType = !matchingConnectedAccount
        ? selectedBookmark?.chainType ||
            (toAddressFieldValue
                ? getChainTypeFromAddress(toAddressFieldValue)
                : undefined)
        : undefined;
    const chainId = toChainId && toTokenAddress
        ? toChainId
        : matchingConnectedAccount
            ? matchingConnectedAccount.chainId
            : chainType
                ? defaultChainIdsByType[chainType]
                : undefined;
    const isConnectedAccount = selectedBookmark?.isConnectedAccount &&
        matchingConnectedAccount?.isConnected;
    const connectedAccountName = matchingConnectedAccount?.connector?.name;
    const bookmarkName = selectedBookmark?.name;
    const headerTitle = isConnectedAccount
        ? connectedAccountName || address
        : bookmarkName || connectedAccountName || address;
    const headerSubheader = isConnectedAccount || bookmarkName || connectedAccountName ? address : null;
    const disabledForChanges = Boolean(toAddress) && disabledToAddress;
    const isSelected = !!toAddressFieldValue && !disabledForChanges;
    const handleOnClick = () => {
        navigate(toAddresses?.length
            ? navigationRoutes.configuredWallets
            : navigationRoutes.sendToWallet);
    };
    const clearSelectedBookmark = (e) => {
        e.stopPropagation();
        setFieldValue('toAddress', '', { isTouched: true });
        setSelectedBookmark();
    };
    return (_jsx(Collapse, { timeout: showInstantly ? 0 : 225, in: showSendToWallet || showInstantly, mountOnEnter: true, unmountOnExit: true, children: _jsxs(Card, { role: "button", onClick: disabledForChanges ? undefined : handleOnClick, sx: { width: '100%', ...props.sx }, children: [_jsx(CardTitle, { required: requiredToAddress, children: t('header.sendToWallet') }), _jsx(Box, { display: "flex", justifyContent: "center", alignItems: "center", children: _jsx(SendToWalletCardHeader, { avatar: _jsx(AccountAvatar, { chainId: chainId, account: matchingConnectedAccount, toAddress: toAddress, empty: !toAddressFieldValue }), title: headerTitle, subheader: headerSubheader, selected: isSelected || disabledForChanges, action: isSelected ? (_jsx(CardIconButton, { onClick: clearSelectedBookmark, size: "small", children: _jsx(CloseRounded, { fontSize: "inherit" }) })) : null }) })] }) }));
};
//# sourceMappingURL=SendToWalletButton.js.map