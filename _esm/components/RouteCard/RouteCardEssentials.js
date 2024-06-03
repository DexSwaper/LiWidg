import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AccessTimeFilled, MonetizationOn } from '@mui/icons-material';
import { Box, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatUnits } from 'viem';
import { getFeeCostsBreakdown, getGasCostsBreakdown, } from '../../utils/fees.js';
import { IconTypography } from './RouteCard.style.js';
export const RouteCardEssentials = ({ route, }) => {
    const { t, i18n } = useTranslation();
    const executionTimeMinutes = Math.ceil(route.steps
        .map((step) => step.estimate.executionDuration)
        .reduce((duration, x) => duration + x, 0) / 60);
    const gasCostUSD = parseFloat(route.gasCostUSD ?? '') || 0.01;
    const gasCosts = getGasCostsBreakdown(route);
    const feeCosts = getFeeCostsBreakdown(route, false);
    const fees = gasCostUSD + feeCosts.reduce((sum, feeCost) => sum + feeCost.amountUSD, 0);
    return (_jsxs(Box, { display: "flex", justifyContent: 'space-between', flex: 1, mt: 2, children: [_jsx(Tooltip, { title: _jsxs(Box, { component: "span", children: [t('main.fees.networkEstimated'), getFeeBreakdownTypography(gasCosts, t), feeCosts.length ? (_jsxs(Box, { mt: 1, children: [t('main.fees.providerEstimated'), getFeeBreakdownTypography(feeCosts, t)] })) : null] }), placement: "top", enterDelay: 400, arrow: true, children: _jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(IconTypography, { mr: 0.5, children: _jsx(MonetizationOn, { fontSize: "small" }) }), _jsx(Typography, { fontSize: 14, color: "text.primary", fontWeight: "500", lineHeight: 1, children: t(`format.currency`, {
                                value: fees,
                            }) })] }) }), _jsx(Tooltip, { title: t(`tooltip.estimatedTime`), placement: "top", enterDelay: 400, arrow: true, children: _jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(IconTypography, { mr: 0.5, children: _jsx(AccessTimeFilled, { fontSize: "small" }) }), _jsx(Typography, { fontSize: 14, color: "text.primary", fontWeight: "500", lineHeight: 1, children: new Intl.NumberFormat(i18n.language, {
                                style: 'unit',
                                unit: 'minute',
                                unitDisplay: 'narrow',
                            }).format(executionTimeMinutes) })] }) })] }));
};
const getFeeBreakdownTypography = (fees, t) => fees.map((fee, index) => (_jsxs(Typography, { fontSize: 12, fontWeight: "500", children: [t(`format.currency`, { value: fee.amountUSD }), " (", parseFloat(formatUnits(fee.amount, fee.token.decimals))?.toFixed(9), ' ', fee.token.symbol, ")"] }, `${fee.token.address}${index}`)));
//# sourceMappingURL=RouteCardEssentials.js.map