import { jsx as _jsx } from "react/jsx-runtime";
import { CloseRounded } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDrawer } from '../../AppDrawerContext.js';
import { useHasExternalWalletProvider } from '../../providers/WalletProvider/useHasExternalWalletProvider.js';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
export const CloseDrawerButton = ({ header }) => {
    const { t } = useTranslation();
    const { subvariant } = useWidgetConfig();
    const { closeDrawer } = useDrawer();
    const { hasExternalProvider } = useHasExternalWalletProvider();
    const showInNavigationHeader = header === 'navigation' && (hasExternalProvider || subvariant === 'split');
    const showInWalletHeader = header === 'wallet' && subvariant !== 'split';
    return showInNavigationHeader || showInWalletHeader ? (_jsx(Tooltip, { title: t('button.close'), enterDelay: 400, arrow: true, children: _jsx(IconButton, { size: "medium", onClick: closeDrawer, children: _jsx(CloseRounded, {}) }) })) : null;
};
//# sourceMappingURL=CloseDrawerButton.js.map