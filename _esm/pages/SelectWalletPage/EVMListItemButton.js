import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChainType } from '@lifi/sdk';
import { getConnectorIcon, isWalletInstalledAsync, } from '@lifi/wallet-management';
import { Avatar, ListItemAvatar } from '@mui/material';
import { useConnect, useDisconnect } from 'wagmi';
import { ListItemButton } from '../../components/ListItemButton.js';
import { ListItemText } from '../../components/ListItemText.js';
import { useNavigateBack } from '../../hooks/useNavigateBack.js';
import { useWidgetEvents } from '../../hooks/useWidgetEvents.js';
import { WidgetEvent } from '../../types/events.js';
export const EVMListItemButton = ({ connectedConnector, connector, onNotInstalled, }) => {
    const { navigateBack } = useNavigateBack();
    const emitter = useWidgetEvents();
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const handleEVMConnect = async () => {
        const identityCheckPassed = await isWalletInstalledAsync(connector.id);
        if (!identityCheckPassed) {
            onNotInstalled(connector);
            return;
        }
        if (connectedConnector) {
            await disconnectAsync({ connector: connectedConnector });
        }
        await connectAsync({ connector }, {
            onSuccess(data) {
                emitter.emit(WidgetEvent.WalletConnected, {
                    address: data.accounts[0],
                    chainId: data.chainId,
                    chainType: ChainType.EVM,
                });
            },
        });
        navigateBack();
    };
    return (_jsxs(ListItemButton, { onClick: handleEVMConnect, children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { src: getConnectorIcon(connector), alt: connector.name, children: connector.name[0] }) }), _jsx(ListItemText, { primary: connector.name })] }, connector.uid));
};
//# sourceMappingURL=EVMListItemButton.js.map