import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ArrowForward, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Badge, Box, Collapse, Step as MuiStep, Stepper, Typography, } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatUnits } from 'viem';
import { useAvailableChains } from '../../hooks/useAvailableChains.js';
import { LiFiToolLogo } from '../../icons/lifi.js';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
import { formatTokenAmount } from '../../utils/format.js';
import { CardIconButton } from '../Card/CardIconButton.js';
import { SmallAvatar } from '../SmallAvatar.js';
import { StepAvatar, StepConnector, StepContent, StepLabel, StepLabelTypography, } from './StepActions.style.js';
import { StepFeeBreakdown } from './StepFeeBreakdown.js';
import { StepFees } from './StepFees.js';
export const StepActions = ({ step, dense, ...other }) => {
    const { t } = useTranslation();
    const { subvariant, subvariantOptions } = useWidgetConfig();
    const [cardExpanded, setCardExpanded] = useState(false);
    const handleExpand = (e) => {
        e.stopPropagation();
        setCardExpanded((expanded) => !expanded);
    };
    // FIXME: step transaction request overrides step tool details, but not included step tool details
    const toolDetails = subvariant === 'custom'
        ? step.includedSteps.find((step) => step.tool === 'custom' && step.toolDetails.key !== 'custom')?.toolDetails || step.toolDetails
        : step.toolDetails;
    return (_jsxs(Box, { ...other, children: [_jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(Badge, { overlap: "circular", anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, badgeContent: _jsx(SmallAvatar, { src: LiFiToolLogo }), children: _jsx(StepAvatar, { variant: "circular", src: toolDetails.logoURI ?? LiFiToolLogo, alt: toolDetails.name, children: toolDetails.name[0] }) }), _jsxs(Box, { flex: 1, children: [_jsx(Typography, { fontSize: 18, fontWeight: 600, lineHeight: 1.3334, ml: 2, children: t(`main.stepDetails`, {
                                    tool: toolDetails.name,
                                }) }), _jsx(Collapse, { timeout: 225, in: dense && !cardExpanded, mountOnEnter: true, unmountOnExit: true, children: _jsx(StepFees, { ml: 2, step: step }) })] }), dense ? (_jsx(CardIconButton, { onClick: handleExpand, size: "small", children: cardExpanded ? _jsx(ExpandLess, {}) : _jsx(ExpandMore, {}) })) : null] }), dense ? (_jsxs(Collapse, { timeout: 225, in: cardExpanded, mountOnEnter: true, unmountOnExit: true, children: [_jsx(IncludedSteps, { step: step, subvariant: subvariant, subvariantOptions: subvariantOptions }), _jsx(StepFeeBreakdown, { step: step })] })) : (_jsx(IncludedSteps, { step: step, subvariant: subvariant, subvariantOptions: subvariantOptions }))] }));
};
export const IncludedSteps = ({ step, subvariant, subvariantOptions, }) => {
    // eslint-disable-next-line react/no-unstable-nested-components
    const StepIconComponent = ({ icon }) => {
        const tool = step.includedSteps?.[Number(icon) - 1];
        return tool ? (_jsx(SmallAvatar, { src: tool.toolDetails.logoURI, alt: tool.toolDetails.name, sx: { width: 20, height: 20 }, children: tool.toolDetails.name[0] })) : null;
    };
    return (_jsx(Box, { mt: 1, children: _jsx(Stepper, { orientation: "vertical", connector: _jsx(StepConnector, {}), activeStep: -1, children: step.includedSteps.map((step, i, includedSteps) => (_jsxs(MuiStep, { expanded: true, children: [_jsx(StepLabel, { StepIconComponent: StepIconComponent, children: step.type === 'custom' && subvariant === 'custom' ? (_jsx(CustomStepDetailsLabel, { step: step, subvariant: subvariant, subvariantOptions: subvariantOptions })) : step.type === 'cross' ? (_jsx(BridgeStepDetailsLabel, { step: step })) : step.type === 'protocol' ? (_jsx(ProtocolStepDetailsLabel, { step: step })) : (_jsx(SwapStepDetailsLabel, { step: step })) }), _jsx(StepContent, { last: i === includedSteps.length - 1, children: _jsx(StepDetailsContent, { step: step }) })] }, step.id))) }) }));
};
export const StepDetailsContent = ({ step }) => {
    const { t } = useTranslation();
    const sameTokenProtocolStep = step.action.fromToken.chainId === step.action.toToken.chainId &&
        step.action.fromToken.address === step.action.toToken.address;
    let fromAmount;
    if (sameTokenProtocolStep) {
        const estimatedFromAmount = BigInt(step.estimate.fromAmount) - BigInt(step.estimate.toAmount);
        fromAmount =
            estimatedFromAmount > 0n
                ? formatUnits(estimatedFromAmount, step.action.fromToken.decimals)
                : formatUnits(BigInt(step.estimate.fromAmount), step.action.fromToken.decimals);
    }
    else {
        fromAmount = formatTokenAmount(BigInt(step.estimate.fromAmount), step.action.fromToken.decimals);
    }
    const showToAmount = step.type !== 'custom' && step.tool !== 'custom' && !sameTokenProtocolStep;
    return (_jsxs(Typography, { fontSize: 12, lineHeight: 1, fontWeight: "500", color: "text.secondary", alignItems: "center", display: "flex", children: [!showToAmount ? (_jsxs(_Fragment, { children: [formatUnits(BigInt(step.estimate.fromAmount), step.action.fromToken.decimals), ' ', step.action.fromToken.symbol, ' - '] })) : null, t('format.number', {
                value: fromAmount,
            }), ' ', step.action.fromToken.symbol, showToAmount ? (_jsxs(_Fragment, { children: [_jsx(ArrowForward, { sx: { fontSize: 18, paddingX: 0.5, height: 12 } }), t('format.number', {
                        value: formatTokenAmount(BigInt(step.execution?.toAmount ?? step.estimate.toAmount), step.execution?.toToken?.decimals ?? step.action.toToken.decimals),
                    }), ' ', step.execution?.toToken?.symbol ?? step.action.toToken.symbol] })) : (` (${t('format.currency', {
                value: parseFloat(fromAmount) * parseFloat(step.action.fromToken.priceUSD),
            })})`)] }));
};
export const CustomStepDetailsLabel = ({ step, subvariant, subvariantOptions, }) => {
    const { t } = useTranslation();
    if (!subvariant) {
        return null;
    }
    // FIXME: step transaction request overrides step tool details, but not included step tool details
    const toolDetails = subvariant === 'custom' &&
        step.includedSteps?.length > 0
        ? step.includedSteps.find((step) => step.tool === 'custom' && step.toolDetails.key !== 'custom')?.toolDetails || step.toolDetails
        : step.toolDetails;
    const stepDetailsKey = (subvariant === 'custom' && subvariantOptions?.custom) || 'checkout';
    return (_jsx(StepLabelTypography, { children: t(`main.${stepDetailsKey}StepDetails`, {
            tool: toolDetails.name,
        }) }));
};
export const BridgeStepDetailsLabel = ({ step }) => {
    const { t } = useTranslation();
    const { getChainById } = useAvailableChains();
    return (_jsx(StepLabelTypography, { children: t('main.bridgeStepDetails', {
            from: getChainById(step.action.fromChainId)?.name,
            to: getChainById(step.action.toChainId)?.name,
            tool: step.toolDetails.name,
        }) }));
};
export const SwapStepDetailsLabel = ({ step }) => {
    const { t } = useTranslation();
    const { getChainById } = useAvailableChains();
    return (_jsx(StepLabelTypography, { children: t('main.swapStepDetails', {
            chain: getChainById(step.action.fromChainId)?.name,
            tool: step.toolDetails.name,
        }) }));
};
export const ProtocolStepDetailsLabel = ({ step }) => {
    const { t } = useTranslation();
    return (_jsx(StepLabelTypography, { children: step.toolDetails.key === 'lifuelProtocol'
            ? t('main.refuelStepDetails', {
                tool: step.toolDetails.name,
            })
            : step.toolDetails.name }));
};
//# sourceMappingURL=StepActions.js.map