import { jsx as _jsx } from "react/jsx-runtime";
import { PowerSettingsNewRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDisconnect } from 'wagmi';
export const EVMDisconnectIconButton = ({ connector, }) => {
    const { disconnect } = useDisconnect();
    return (_jsx(IconButton, { size: "medium", onClick: (e) => {
            e.stopPropagation();
            disconnect({ connector });
        }, children: _jsx(PowerSettingsNewRounded, {}) }));
};
//# sourceMappingURL=EVMDisconnectIconButton.js.map