import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { VerifiedUser } from '@mui/icons-material';
import { Box, Collapse, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { InsuraceLogo } from '../../icons/InsuraceLogo.js';
import { RouteExecutionStatus } from '../../stores/routes/types.js';
import { Card } from '../Card/Card.js';
import { CardLabel, CardLabelTypography } from '../Card/CardLabel.js';
import { Switch } from '../Switch.js';
export const InsuranceCard = ({ status, feeAmountUsd, insuredAmount, insuredTokenSymbol, insuranceCoverageId, onChange, ...props }) => {
    const { t } = useTranslation();
    const [enabled, setEnabled] = useState(false);
    const handleSwitch = (_, checked) => {
        setEnabled(checked);
        onChange?.(checked);
    };
    return (_jsxs(Card, { selectionColor: "secondary", indented: true, ...props, children: [_jsxs(Box, { display: "flex", alignItems: "center", justifyContent: "space-between", children: [_jsxs(CardLabel, { type: 'insurance', children: [_jsx(VerifiedUser, { fontSize: "inherit" }), _jsx(CardLabelTypography, { type: "icon", children: status === RouteExecutionStatus.Idle
                                    ? t('main.tags.insurance')
                                    : t('main.tags.insured') })] }), _jsx(Switch, { onChange: handleSwitch, value: enabled })] }), _jsx(Collapse, { timeout: 225, in: enabled, mountOnEnter: true, unmountOnExit: true, children: _jsxs(Box, { mt: 2, children: [_jsxs(Box, { display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, children: [_jsx(Typography, { fontSize: 24, fontWeight: 700, lineHeight: 1, children: t('format.currency', {
                                        value: feeAmountUsd,
                                    }) }), _jsx(InsuraceLogo, {})] }), _jsxs(Box, { children: [_jsx(Typography, { fontSize: 14, children: _jsx(Trans, { i18nKey: status === RouteExecutionStatus.Idle
                                            ? 'insurance.insure'
                                            : 'insurance.insured', values: {
                                            amount: insuredAmount,
                                            tokenSymbol: insuredTokenSymbol,
                                        }, components: [_jsx("strong", {})] }) }), _jsx(Collapse, { timeout: 225, in: enabled || status !== RouteExecutionStatus.Idle, mountOnEnter: true, unmountOnExit: true, children: _jsxs(Box, { sx: {
                                            listStyleType: 'disc',
                                            pl: 2,
                                        }, children: [_jsx(Typography, { fontSize: 14, display: "list-item", children: t('insurance.bridgeExploits') }), _jsx(Typography, { fontSize: 14, display: "list-item", children: t('insurance.slippageError') })] }) }), _jsx(Link, { href: status === RouteExecutionStatus.Idle
                                        ? 'https://docs.insurace.io/landing-page/documentation/cover-products/bridge-cover/li.fi'
                                        : `https://app.insurace.io/bridge-cover?search=${insuranceCoverageId}`, target: "_blank", underline: "none", color: "text.primary", children: _jsx(Typography, { pt: 0.5, color: "primary", fontSize: 14, fontWeight: 600, children: status === RouteExecutionStatus.Idle
                                            ? t('button.learnMore')
                                            : t('button.viewCoverage') }) })] })] }) })] }));
};
//# sourceMappingURL=InsuranceCard.js.map