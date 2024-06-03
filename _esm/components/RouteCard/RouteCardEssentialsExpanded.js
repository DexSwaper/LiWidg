import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AccessTimeFilled, Layers, MonetizationOn } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatUnits } from 'viem';
import { getFeeCostsBreakdown, getGasCostsBreakdown, } from '../../utils/fees.js';
import { IconTypography } from './RouteCard.style.js';
export const RouteCardEssentialsExpanded = ({ route }) => {
    const { t, i18n } = useTranslation();
    const executionTimeMinutes = Math.ceil(route.steps
        .map((step) => step.estimate.executionDuration)
        .reduce((duration, x) => duration + x, 0) / 60);
    const gasCostUSD = parseFloat(route.gasCostUSD ?? '') || 0.01;
    const gasCosts = getGasCostsBreakdown(route);
    const feeCosts = getFeeCostsBreakdown(route, false);
    const fees = gasCostUSD + feeCosts.reduce((sum, feeCost) => sum + feeCost.amountUSD, 0);
    return (_jsxs(Box, { flex: 1, mt: 2, children: [_jsxs(Box, { children: [_jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(IconTypography, { ml: 1, mr: 3, children: _jsx(MonetizationOn, {}) }), _jsx(Typography, { fontSize: 16, color: "text.primary", fontWeight: "600", lineHeight: 1.125, children: t(`format.currency`, {
                                    value: fees,
                                }) })] }), _jsxs(Box, { mt: 0.5, ml: 7, children: [_jsx(Typography, { fontSize: 12, color: "text.secondary", fontWeight: "500", lineHeight: 1.125, children: t('main.fees.networkEstimated') }), getFeeBreakdownTypography(gasCosts, t), feeCosts.length ? (_jsxs(Box, { mt: 0.5, children: [_jsx(Typography, { fontSize: 12, color: "text.secondary", fontWeight: "500", lineHeight: 1.125, children: t('main.fees.providerEstimated') }), getFeeBreakdownTypography(feeCosts, t)] })) : null] })] }), _jsxs(Box, { mt: 2, children: [_jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(IconTypography, { ml: 1, mr: 3, children: _jsx(Layers, {}) }), _jsx(Typography, { fontSize: 16, color: "text.primary", fontWeight: "600", lineHeight: 1.125, children: route.steps.length })] }), _jsx(Box, { mt: 0.5, ml: 7, children: _jsx(Typography, { fontSize: 12, color: "text.secondary", fontWeight: "500", lineHeight: 1.125, children: t(`tooltip.numberOfSteps`) }) })] }), _jsxs(Box, { display: "flex", alignItems: "center", mt: 2, children: [_jsx(IconTypography, { ml: 1, mr: 3, children: _jsx(AccessTimeFilled, {}) }), _jsx(Typography, { fontSize: 16, color: "text.primary", fontWeight: "600", lineHeight: 1.125, children: new Intl.NumberFormat(i18n.language, {
                            style: 'unit',
                            unit: 'minute',
                            unitDisplay: 'long',
                        }).format(executionTimeMinutes) })] })] }));
};
const getFeeBreakdownTypography = (fees, t) => fees.map((fee, index) => (_jsxs(Typography, { fontSize: 12, fontWeight: "500", color: "text.secondary", children: [t(`format.currency`, { value: fee.amountUSD }), " (", parseFloat(formatUnits(fee.amount, fee.token.decimals))?.toFixed(9), ' ', fee.token.symbol, ")"] }, `${fee.token.address}${index}`)));
//# sourceMappingURL=RouteCardEssentialsExpanded.js.map