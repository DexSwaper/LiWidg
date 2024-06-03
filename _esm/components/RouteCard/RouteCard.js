import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ExpandLess, ExpandMore, VerifiedUser } from '@mui/icons-material';
import { Box, Collapse, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
import { formatTokenAmount } from '../../utils/format.js';
import { Card } from '../Card/Card.js';
import { CardIconButton } from '../Card/CardIconButton.js';
import { CardLabel, CardLabelTypography } from '../Card/CardLabel.js';
import { StepActions } from '../StepActions/StepActions.js';
import { Token } from '../Token/Token.js';
import { TokenContainer } from './RouteCard.style.js';
import { RouteCardEssentials } from './RouteCardEssentials.js';
import { RouteCardEssentialsExpanded } from './RouteCardEssentialsExpanded.js';
export const RouteCard = ({ route, active, variant = 'default', expanded: defaulExpanded, ...other }) => {
    const { t } = useTranslation();
    const { subvariant } = useWidgetConfig();
    const [cardExpanded, setCardExpanded] = useState(defaulExpanded);
    const handleExpand = (e) => {
        e.stopPropagation();
        setCardExpanded((expanded) => !expanded);
    };
    const insurable = route.insurance?.state === 'INSURABLE';
    const token = subvariant === 'custom'
        ? { ...route.fromToken, amount: BigInt(route.fromAmount) }
        : { ...route.toToken, amount: BigInt(route.toAmount) };
    const tags = route.tags?.filter((tag) => tag === 'CHEAPEST' || tag === 'FASTEST');
    const cardContent = (_jsxs(Box, { flex: 1, children: [subvariant !== 'refuel' && (insurable || route.tags?.length) ? (_jsxs(Box, { display: "flex", alignItems: "center", mb: 2, children: [tags?.length ? (_jsx(CardLabel, { type: active ? 'active' : undefined, children: _jsx(CardLabelTypography, { children: t(`main.tags.${tags[0].toLowerCase()}`) }) })) : null, insurable ? (_jsx(InsuranceTooltip, { insuredAmount: formatTokenAmount(BigInt(route.toAmountMin), route.toToken.decimals), insuredTokenSymbol: route.toToken.symbol, children: _jsxs(CardLabel, { type: 'insurance', children: [_jsx(VerifiedUser, { fontSize: "inherit" }), _jsx(CardLabelTypography, { type: "icon", children: t(`main.tags.insurable`) })] }) })) : null] })) : null, _jsxs(TokenContainer, { children: [_jsx(Token, { token: token, step: route.steps[0], stepVisible: !cardExpanded }), !defaulExpanded ? (_jsx(CardIconButton, { onClick: handleExpand, size: "small", children: cardExpanded ? _jsx(ExpandLess, {}) : _jsx(ExpandMore, {}) })) : null] }), _jsxs(Collapse, { timeout: 225, in: cardExpanded, mountOnEnter: true, unmountOnExit: true, children: [route.steps.map((step) => (_jsx(StepActions, { step: step, mt: 2 }, step.id))), _jsx(RouteCardEssentialsExpanded, { route: route })] }), _jsx(Collapse, { timeout: 225, in: !cardExpanded, mountOnEnter: true, unmountOnExit: true, children: _jsx(RouteCardEssentials, { route: route }) })] }));
    return subvariant === 'refuel' || variant === 'cardless' ? (cardContent) : (_jsx(Card, { type: active ? 'selected' : 'default', selectionColor: "secondary", indented: true, ...other, children: cardContent }));
};
const InsuranceTooltip = ({ insuredAmount, insuredTokenSymbol, children }) => {
    const { t } = useTranslation();
    return (_jsx(Tooltip, { title: _jsxs(Box, { component: "span", children: [_jsx(Typography, { fontSize: 12, fontWeight: "500", children: _jsx(Trans, { i18nKey: "insurance.insure", values: {
                            amount: insuredAmount,
                            tokenSymbol: insuredTokenSymbol,
                        }, components: [_jsx("strong", {})] }) }), _jsxs(Box, { sx: {
                        listStyleType: 'disc',
                        pl: 2,
                    }, children: [_jsx(Typography, { fontSize: 12, fontWeight: "500", display: "list-item", children: t('insurance.bridgeExploits') }), _jsx(Typography, { fontSize: 12, fontWeight: "500", display: "list-item", children: t('insurance.slippageError') })] })] }), placement: "top", enterDelay: 400, arrow: true, children: children }));
};
//# sourceMappingURL=RouteCard.js.map