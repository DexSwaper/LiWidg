import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MonetizationOn } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatUnits } from 'viem';
import { getStepFeeCostsBreakdown } from '../../utils/fees.js';
import { IconTypography } from './StepActions.style.js';
export const StepFeeBreakdown = ({ step }) => {
    const { t } = useTranslation();
    let fees = 0;
    const feeComponents = [];
    const isDone = step.execution?.status === 'DONE';
    const gasCosts = step.execution?.gasCosts ?? step.estimate.gasCosts;
    const feeCosts = step.execution?.feeCosts ?? step.estimate.feeCosts;
    if (gasCosts) {
        const { token, amount, amountUSD } = getStepFeeCostsBreakdown(gasCosts);
        const formattedGasAmount = token
            ? parseFloat(formatUnits(amount, token.decimals))?.toFixed(9)
            : 0;
        fees += amountUSD;
        feeComponents.push(_jsxs(Box, { ml: 7, children: [_jsx(Typography, { fontSize: 12, lineHeight: 2, color: "text.secondary", fontWeight: "500", children: isDone
                        ? t('main.fees.networkPaid')
                        : t('main.fees.networkEstimated') }), _jsxs(Typography, { fontSize: 12, lineHeight: 1, fontWeight: "500", color: "text.secondary", children: [t(`format.currency`, { value: amountUSD }), " (", formattedGasAmount, ' ', token.symbol, ")"] })] }, "network"));
    }
    if (feeCosts) {
        const filteredfeeCosts = feeCosts?.filter((fee) => !fee.included);
        if (filteredfeeCosts?.length) {
            const { token, amount, amountUSD } = getStepFeeCostsBreakdown(filteredfeeCosts);
            const formattedFeeAmount = token
                ? parseFloat(formatUnits(amount, token.decimals))?.toFixed(9)
                : 0;
            fees += amountUSD;
            feeComponents.push(_jsxs(Box, { mt: feeComponents.length ? 0.5 : 0, ml: 7, children: [_jsx(Typography, { fontSize: 12, lineHeight: 2, color: "text.secondary", fontWeight: "500", children: isDone
                            ? t('main.fees.providerPaid')
                            : t('main.fees.providerEstimated') }), _jsxs(Typography, { fontSize: 12, lineHeight: 1, fontWeight: "500", color: "text.secondary", children: [t(`format.currency`, { value: amountUSD }), " (", formattedFeeAmount, ' ', token.symbol, ")"] })] }, "bridge"));
        }
    }
    return (_jsxs(Box, { mt: 1.5, children: [_jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(IconTypography, { ml: 1, mr: 3, height: 24, children: _jsx(MonetizationOn, {}) }), _jsx(Typography, { fontSize: 16, color: "text.primary", fontWeight: "600", lineHeight: 1.125, children: t(`format.currency`, {
                            value: fees,
                        }) })] }), feeComponents] }));
};
//# sourceMappingURL=StepFeeBreakdown.js.map