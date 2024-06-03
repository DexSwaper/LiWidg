import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EvStation } from '@mui/icons-material';
import { Box, Collapse, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGasRefuel } from '../../hooks/useGasRefuel.js';
import { useSettings } from '../../stores/settings/useSettings.js';
import { useSettingsStore } from '../../stores/settings/useSettingsStore.js';
import { AlertMessage } from '../AlertMessage/AlertMessage.js';
import { InfoMessageSwitch } from './GasMessage.style.js';
export const GasRefuelMessage = (props) => {
    const { t } = useTranslation();
    const setValue = useSettingsStore((state) => state.setValue);
    const { enabledAutoRefuel } = useSettings(['enabledAutoRefuel']);
    const { enabled, chain, isLoading: isRefuelLoading } = useGasRefuel();
    const onChange = (_, checked) => {
        setValue('enabledAutoRefuel', checked);
    };
    const showGasRefuelMessage = chain && enabled && !isRefuelLoading;
    return (_jsx(Collapse, { timeout: 225, in: showGasRefuelMessage, unmountOnExit: true, mountOnEnter: true, children: _jsx(AlertMessage, { icon: _jsx(EvStation, {}), title: _jsxs(Box, { display: "flex", alignItems: "center", justifyContent: "space-between", flexGrow: 1, children: [_jsx(Typography, { variant: "body2", fontWeight: 700, children: t(`info.title.autoRefuel`) }), _jsx(InfoMessageSwitch, { checked: enabledAutoRefuel, onChange: onChange })] }), ...props, children: _jsx(Collapse, { timeout: 225, in: enabledAutoRefuel, unmountOnExit: true, mountOnEnter: true, children: _jsx(Typography, { variant: "body2", px: 2, pt: 1, children: t(`info.message.autoRefuel`, {
                        chainName: chain?.name,
                    }) }) }) }) }));
};
//# sourceMappingURL=GasRefuelMessage.js.map