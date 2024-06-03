import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SearchOff } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAvailableChains } from '../../hooks/useAvailableChains.js';
import { FormKeyHelper } from '../../stores/form/types.js';
import { useFieldValues } from '../../stores/form/useFieldValues.js';
export const TokenNotFound = ({ formType }) => {
    const { t } = useTranslation();
    const [selectedChainId] = useFieldValues(FormKeyHelper.getChainKey(formType));
    const { getChainById } = useAvailableChains();
    return (_jsxs(Box, { sx: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            flex: 1,
            padding: 3,
        }, children: [_jsx(Typography, { fontSize: 48, lineHeight: 1, children: _jsx(SearchOff, { fontSize: "inherit" }) }), _jsx(Typography, { fontSize: 14, color: "text.secondary", textAlign: "center", mt: 2, px: 2, children: t('info.message.emptyTokenList', {
                    chainName: getChainById(selectedChainId)?.name,
                }) })] }));
};
//# sourceMappingURL=TokenNotFound.js.map