import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, List, ListItemAvatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useChainSelect } from '../../components/ChainSelect/useChainSelect.js';
import { ListItemButton } from '../../components/ListItemButton.js';
import { ListItemText } from '../../components/ListItemText.js';
import { PageContainer } from '../../components/PageContainer.js';
import { useTokenSelect } from '../../components/TokenList/useTokenSelect.js';
import { useHeader } from '../../hooks/useHeader.js';
import { useNavigateBack } from '../../hooks/useNavigateBack.js';
export const SelectChainPage = ({ formType, selectNativeToken, }) => {
    const { navigateBack } = useNavigateBack();
    const { chains, setCurrentChain } = useChainSelect(formType);
    const selectToken = useTokenSelect(formType, navigateBack);
    const { t } = useTranslation();
    useHeader(t('header.selectChain'));
    const handleClick = async (chain) => {
        if (selectNativeToken) {
            selectToken(chain.nativeToken.address, chain.id);
        }
        else {
            setCurrentChain(chain.id);
            navigateBack();
        }
    };
    return (_jsx(PageContainer, { disableGutters: true, children: _jsx(List, { sx: {
                paddingTop: 0,
                paddingLeft: 1.5,
                paddingRight: 1.5,
                paddingBottom: 1.5,
            }, children: chains?.map((chain) => (_jsxs(ListItemButton, { onClick: () => handleClick(chain), children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { src: chain.logoURI, alt: chain.name, children: chain.name[0] }) }), _jsx(ListItemText, { primary: chain.name })] }, chain.id))) }) }));
};
//# sourceMappingURL=SelectChainPage.js.map