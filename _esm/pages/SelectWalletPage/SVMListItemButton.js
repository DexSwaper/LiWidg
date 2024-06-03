import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChainId, ChainType } from '@lifi/sdk';
import { Avatar, ListItemAvatar } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { ListItemButton } from '../../components/ListItemButton.js';
import { ListItemText } from '../../components/ListItemText.js';
import { useNavigateBack } from '../../hooks/useNavigateBack.js';
import { useWidgetEvents } from '../../hooks/useWidgetEvents.js';
import { WidgetEvent } from '../../types/events.js';
export const SVMListItemButton = ({ wallet }) => {
    const { navigateBack } = useNavigateBack();
    const emitter = useWidgetEvents();
    const { select, disconnect, connected } = useWallet();
    const connect = async () => {
        if (connected) {
            await disconnect();
        }
        select(wallet.adapter.name);
        // We use autoConnect on wallet selection
        // await solanaConnect();
        wallet.adapter.once('connect', (publicKey) => {
            emitter.emit(WidgetEvent.WalletConnected, {
                address: publicKey?.toString(),
                chainId: ChainId.SOL,
                chainType: ChainType.SVM,
            });
        });
        navigateBack();
    };
    return (_jsxs(ListItemButton, { onClick: connect, children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { src: wallet.adapter.icon, alt: wallet.adapter.name, children: wallet.adapter.name[0] }) }), _jsx(ListItemText, { primary: `${wallet.adapter.name} (Solana)` })] }, wallet.adapter.name));
};
//# sourceMappingURL=SVMListItemButton.js.map