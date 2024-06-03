import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, CheckBoxOutlineBlankOutlined, CheckBoxOutlined, IndeterminateCheckBoxOutlined, } from '@mui/icons-material';
import { Avatar, IconButton, List, ListItemAvatar, Tooltip, useTheme, } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';
import { ListItemText } from '../components/ListItemText.js';
import { PageContainer } from '../components/PageContainer.js';
import { SettingsListItemButton } from '../components/SettingsListItemButton.js';
import { useHeader } from '../hooks/useHeader.js';
import { useTools } from '../hooks/useTools.js';
import { useSettingsStore } from '../stores/settings/useSettingsStore.js';
const SelectAllCheckbox = ({ allCheckboxesSelected, anyCheckboxesSelected, onClick, }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const tooltipTitle = allCheckboxesSelected
        ? t('tooltip.deselectAll')
        : t('tooltip.selectAll');
    return (_jsx(Tooltip, { title: tooltipTitle, arrow: true, children: _jsx(IconButton, { size: "medium", edge: theme?.navigation?.edge ? 'end' : false, onClick: onClick, children: allCheckboxesSelected ? (_jsx(CheckBoxOutlined, {})) : anyCheckboxesSelected ? (_jsx(IndeterminateCheckBoxOutlined, {})) : (_jsx(CheckBoxOutlineBlankOutlined, {})) }) }));
};
export const SelectEnabledToolsPage = ({ type }) => {
    const typeKey = type.toLowerCase();
    const { tools } = useTools();
    const [enabledTools, disabledTools, setToolValue, toggleTools] = useSettingsStore((state) => [
        state[`enabled${type}`],
        state[`disabled${type}`],
        state.setToolValue,
        state.toggleTools,
    ], shallow);
    const { t } = useTranslation();
    const headerAction = useMemo(() => (_jsx(SelectAllCheckbox, { allCheckboxesSelected: !disabledTools.length, anyCheckboxesSelected: Boolean(disabledTools.length), onClick: () => toggleTools(type) })), [disabledTools.length, toggleTools, type]);
    useHeader(t(`settings.enabled${type}`), headerAction);
    const handleClick = (key) => {
        setToolValue(type, key, !enabledTools[key]);
    };
    return (_jsx(PageContainer, { disableGutters: true, children: _jsx(List, { sx: {
                paddingTop: 0,
                paddingLeft: 1.5,
                paddingRight: 1.5,
                paddingBottom: 1.5,
            }, children: tools?.[typeKey].map((tool) => (_jsxs(SettingsListItemButton, { onClick: () => handleClick(tool.key), children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { src: tool.logoURI, alt: tool.name, children: tool.name[0] }) }), _jsx(ListItemText, { primary: tool.name }), enabledTools[tool.key] && _jsx(Check, { color: "primary" })] }, tool.name))) }) }));
};
//# sourceMappingURL=SelectEnabledToolsPage.js.map