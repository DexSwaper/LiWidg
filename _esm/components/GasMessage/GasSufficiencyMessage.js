import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EvStation } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatUnits } from 'viem';
import { AlertMessage } from '../AlertMessage/AlertMessage.js';
export const GasSufficiencyMessage = ({ insufficientGas, }) => {
    const { t } = useTranslation();
    return (_jsxs(AlertMessage, { severity: "warning", icon: _jsx(EvStation, {}), title: _jsx(Typography, { variant: "body2", fontWeight: 700, children: t(`warning.title.insufficientGas`) }), children: [_jsx(Typography, { variant: "body2", px: 2, pt: 1, children: t(`warning.message.insufficientGas`) }), insufficientGas?.map((item, index) => (_jsx(Typography, { variant: "body2", px: 2, pt: 0.5, children: t(`main.tokenOnChainAmount`, {
                    amount: formatUnits(item.insufficientAmount ?? 0n, item.token.decimals),
                    tokenSymbol: item.token.symbol,
                    chainName: item.chain?.name,
                }) }, index)))] }));
};
//# sourceMappingURL=GasSufficiencyMessage.js.map