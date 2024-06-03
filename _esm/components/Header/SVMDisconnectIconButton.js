import { jsx as _jsx } from "react/jsx-runtime";
import { PowerSettingsNewRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
export const SVMDisconnectIconButton = () => {
    const { disconnect } = useWallet();
    return (_jsx(IconButton, { size: "medium", onClick: (e) => {
            e.stopPropagation();
            disconnect();
        }, children: _jsx(PowerSettingsNewRounded, {}) }));
};
//# sourceMappingURL=SVMDisconnectIconButton.js.map