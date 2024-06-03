import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChainSelect } from '../../components/ChainSelect/ChainSelect.js';
import { PageContainer } from '../../components/PageContainer.js';
import { TokenList } from '../../components/TokenList/TokenList.js';
import { useContentHeight } from '../../hooks/useContentHeight.js';
import { useHeader } from '../../hooks/useHeader.js';
import { useNavigateBack } from '../../hooks/useNavigateBack.js';
import { useScrollableOverflowHidden } from '../../hooks/useScrollableContainer.js';
import { useSwapOnly } from '../../hooks/useSwapOnly.js';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
import { SearchTokenInput } from './SearchTokenInput.js';
const minTokenListHeight = 360;
export const SelectTokenPage = ({ formType }) => {
    useScrollableOverflowHidden();
    const { navigateBack } = useNavigateBack();
    const headerRef = useRef(null);
    const contentHeight = useContentHeight();
    const [tokenListHeight, setTokenListHeight] = useState(0);
    const swapOnly = useSwapOnly();
    const { subvariant } = useWidgetConfig();
    const { t } = useTranslation();
    const title = formType === 'from'
        ? subvariant === 'custom'
            ? t(`header.payWith`)
            : t(`header.from`)
        : t(`header.to`);
    useHeader(title);
    useLayoutEffect(() => {
        setTokenListHeight(Math.max(contentHeight - (headerRef.current?.offsetHeight ?? 0), minTokenListHeight));
    }, [contentHeight]);
    const hideChainSelect = swapOnly && formType === 'to';
    return (_jsxs(PageContainer, { disableGutters: true, children: [_jsxs(Box, { pb: 2, px: 3, ref: headerRef, children: [!hideChainSelect ? _jsx(ChainSelect, { formType: formType }) : null, _jsx(Box, { mt: !hideChainSelect ? 2 : 0, children: _jsx(SearchTokenInput, {}) })] }), _jsx(TokenList, { height: tokenListHeight, onClick: navigateBack, formType: formType })] }));
};
//# sourceMappingURL=SelectTokenPage.js.map