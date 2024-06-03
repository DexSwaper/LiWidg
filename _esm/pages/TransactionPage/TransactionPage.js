import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Delete } from '@mui/icons-material';
import { Box, Button, Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ContractComponent } from '../../components/ContractComponent/ContractComponent.js';
import { GasMessage } from '../../components/GasMessage/GasMessage.js';
import { Insurance } from '../../components/Insurance/Insurance.js';
import { PageContainer } from '../../components/PageContainer.js';
import { getStepList } from '../../components/Step/StepList.js';
import { useHeader } from '../../hooks/useHeader.js';
import { useNavigateBack } from '../../hooks/useNavigateBack.js';
import { useRouteExecution } from '../../hooks/useRouteExecution.js';
import { useWidgetEvents } from '../../hooks/useWidgetEvents.js';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
import { useFieldActions } from '../../stores/form/useFieldActions.js';
import { RouteExecutionStatus } from '../../stores/routes/types.js';
import { WidgetEvent } from '../../types/events.js';
import { formatTokenAmount } from '../../utils/format.js';
import { ExchangeRateBottomSheet } from './ExchangeRateBottomSheet.js';
import { StartInsurableTransactionButton, StartTransactionButton, } from './StartTransactionButton.js';
import { StatusBottomSheet } from './StatusBottomSheet.js';
import { TokenValueBottomSheet, getTokenValueLossThreshold, } from './TokenValueBottomSheet.js';
import { calcValueLoss } from './utils.js';
export const TransactionPage = () => {
    const { t } = useTranslation();
    const { setFieldValue } = useFieldActions();
    const emitter = useWidgetEvents();
    const { navigateBack } = useNavigateBack();
    const { subvariant, insurance, contractSecondaryComponent } = useWidgetConfig();
    const { state } = useLocation();
    const stateRouteId = state?.routeId;
    const [routeId, setRouteId] = useState(stateRouteId);
    const tokenValueBottomSheetRef = useRef(null);
    const exchangeRateBottomSheetRef = useRef(null);
    const onAcceptExchangeRateUpdate = (resolver, data) => {
        exchangeRateBottomSheetRef.current?.open(resolver, data);
    };
    const { route, status, executeRoute, restartRoute, deleteRoute } = useRouteExecution({
        routeId: routeId,
        onAcceptExchangeRateUpdate,
    });
    const getHeaderTitle = () => {
        if (subvariant === 'custom') {
            return t(`header.purchase`);
        }
        else {
            if (route) {
                const transactionType = route.fromChainId === route.toChainId ? 'Swap' : 'Bridge';
                return status === RouteExecutionStatus.Idle
                    ? t(`button.review${transactionType}`)
                    : t(`header.${transactionType.toLowerCase()}`);
            }
        }
        return t(`header.exchange`);
    };
    const title = getHeaderTitle();
    useHeader(title);
    useEffect(() => {
        if (status === RouteExecutionStatus.Idle) {
            emitter.emit(WidgetEvent.ReviewTransactionPageEntered, route);
        }
        // We want to emit event only when the page is mounted
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!route) {
        return null;
    }
    const tokenValueLossThresholdExceeded = getTokenValueLossThreshold(route);
    const handleExecuteRoute = () => {
        if (tokenValueBottomSheetRef.current?.isOpen()) {
            emitter.emit(WidgetEvent.RouteHighValueLoss, {
                fromAmountUsd: route.fromAmountUSD,
                gasCostUSD: route.gasCostUSD,
                toAmountUSD: route.toAmountUSD,
                valueLoss: calcValueLoss(route),
            });
        }
        tokenValueBottomSheetRef.current?.close();
        executeRoute();
        setFieldValue('fromAmount', '');
        if (subvariant === 'custom') {
            setFieldValue('fromToken', '');
            setFieldValue('toToken', '');
        }
    };
    const handleStartClick = async () => {
        if (status === RouteExecutionStatus.Idle) {
            if (tokenValueLossThresholdExceeded && subvariant !== 'custom') {
                tokenValueBottomSheetRef.current?.open();
            }
            else {
                handleExecuteRoute();
            }
        }
        if (status === RouteExecutionStatus.Failed) {
            restartRoute();
        }
    };
    const handleRemoveRoute = () => {
        navigateBack();
        deleteRoute();
    };
    const getButtonText = () => {
        switch (status) {
            case RouteExecutionStatus.Idle:
                switch (subvariant) {
                    case 'custom':
                        return t('button.buyNow');
                    case 'refuel':
                        return t('button.startBridging');
                    default:
                        const transactionType = route.fromChainId === route.toChainId ? 'Swapping' : 'Bridging';
                        return t(`button.start${transactionType}`);
                }
            case RouteExecutionStatus.Failed:
                return t('button.tryAgain');
            default:
                return '';
        }
    };
    const insuredRoute = route.insurance?.state === 'INSURED';
    const insurableRoute = insurance &&
        subvariant !== 'refuel' &&
        status === RouteExecutionStatus.Idle &&
        route.insurance?.state === 'INSURABLE';
    const insuranceAvailable = insuredRoute || insurableRoute;
    const StartButton = insurableRoute
        ? StartInsurableTransactionButton
        : StartTransactionButton;
    const getInsuranceCoverageId = () => route.steps[0].execution?.process
        .filter((process) => process.type !== 'TOKEN_ALLOWANCE')
        .find((process) => process.txHash)?.txHash ?? route.fromAddress;
    return (_jsxs(PageContainer, { bottomGutters: true, children: [getStepList(route, subvariant), subvariant === 'custom' && contractSecondaryComponent ? (_jsx(ContractComponent, { sx: { marginTop: 2 }, children: contractSecondaryComponent })) : null, insuranceAvailable ? (_jsx(Insurance, { status: status, insurableRouteId: stateRouteId, feeAmountUsd: route.insurance.feeAmountUsd, insuredAmount: formatTokenAmount(BigInt(route.toAmountMin), route.toToken.decimals), insuredTokenSymbol: route.toToken.symbol, insuranceCoverageId: getInsuranceCoverageId(), onChange: setRouteId, sx: { marginTop: 2 } })) : null, status === RouteExecutionStatus.Idle ||
                status === RouteExecutionStatus.Failed ? (_jsxs(_Fragment, { children: [_jsx(GasMessage, { mt: 2, route: route }), _jsxs(Box, { mt: 2, display: "flex", children: [_jsx(StartButton, { text: getButtonText(), onClick: handleStartClick, route: route, insurableRouteId: stateRouteId }), status === RouteExecutionStatus.Failed ? (_jsx(Tooltip, { title: t('button.removeTransaction'), placement: "bottom-end", enterDelay: 400, arrow: true, children: _jsx(Button, { onClick: handleRemoveRoute, sx: {
                                        minWidth: 48,
                                        marginLeft: 1,
                                    }, children: _jsx(Delete, {}) }) })) : null] })] })) : null, status ? _jsx(StatusBottomSheet, { status: status, route: route }) : null, tokenValueLossThresholdExceeded && subvariant !== 'custom' ? (_jsx(TokenValueBottomSheet, { route: route, ref: tokenValueBottomSheetRef, onContinue: handleExecuteRoute })) : null, _jsx(ExchangeRateBottomSheet, { ref: exchangeRateBottomSheetRef })] }));
};
//# sourceMappingURL=TransactionPage.js.map