import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Percent, WarningRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingMonitor } from '../../../hooks/useSettingMonitor.js';
import { useSettings } from '../../../stores/settings/useSettings.js';
import { defaultSlippage, useSettingsStore, } from '../../../stores/settings/useSettingsStore.js';
import { formatSlippage } from '../../../utils/format.js';
import { BadgedValue } from '../SettingsCard/BadgedValue.js';
import { SettingCardExpandable } from '../SettingsCard/SettingCardExpandable.js';
import { SettingsFieldSet, SlippageCustomInput, SlippageDefaultButton, SlippageLimitsWarningContainer, } from './SlippageSettings.style.js';
export const SlippageSettings = () => {
    const { t } = useTranslation();
    const { isSlippageOutsideRecommendedLimits, isSlippageChanged } = useSettingMonitor();
    const { slippage } = useSettings(['slippage']);
    const setValue = useSettingsStore((state) => state.setValue);
    const defaultValue = useRef(slippage);
    const [focused, setFocused] = useState();
    const handleDefaultClick = () => {
        setValue('slippage', formatSlippage(defaultSlippage, defaultValue.current));
    };
    const handleInputUpdate = (event) => {
        const { value } = event.target;
        setValue('slippage', formatSlippage(value || defaultSlippage, defaultValue.current, true));
    };
    const handleInputBlur = (event) => {
        setFocused(undefined);
        const { value } = event.target;
        setValue('slippage', formatSlippage(value || defaultSlippage, defaultValue.current));
    };
    const customInputValue = !slippage || slippage === defaultSlippage ? '' : slippage;
    const badgeColor = isSlippageOutsideRecommendedLimits
        ? 'warning'
        : isSlippageChanged
            ? 'info'
            : undefined;
    return (_jsx(SettingCardExpandable, { value: _jsx(BadgedValue, { badgeColor: badgeColor, showBadge: !!badgeColor, children: `${slippage}%` }), icon: _jsx(Percent, {}), title: t(`settings.slippage`), children: _jsxs(Box, { mt: 1.5, children: [_jsxs(SettingsFieldSet, { children: [_jsx(SlippageDefaultButton, { selected: defaultSlippage === slippage && focused !== 'input', onFocus: () => {
                                setFocused('button');
                            }, onBlur: () => {
                                setFocused(undefined);
                            }, onClick: handleDefaultClick, disableRipple: true, children: defaultSlippage }), _jsx(SlippageCustomInput, { selected: defaultSlippage !== slippage && focused !== 'button', placeholder: focused === 'input' ? '' : t('settings.custom'), inputProps: {
                                inputMode: 'decimal',
                            }, onChange: handleInputUpdate, onFocus: () => {
                                setFocused('input');
                            }, onBlur: handleInputBlur, value: customInputValue, autoComplete: "off" })] }), isSlippageOutsideRecommendedLimits && (_jsxs(SlippageLimitsWarningContainer, { children: [_jsx(WarningRounded, { color: "warning" }), _jsx(Typography, { fontSize: 13, fontWeight: 400, children: t('warning.message.slippageOutsideRecommendedLimits') })] }))] }) }));
};
//# sourceMappingURL=SlippageSettings.js.map