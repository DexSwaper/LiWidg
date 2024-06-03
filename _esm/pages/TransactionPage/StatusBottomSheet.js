import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Done, ErrorRounded, InfoRounded, WarningRounded, } from '@mui/icons-material';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet.js';
import { Token } from '../../components/Token/Token.js';
import { useAvailableChains } from '../../hooks/useAvailableChains.js';
import { useSetContentHeight } from '../../hooks/useContentHeight.js';
import { useNavigateBack } from '../../hooks/useNavigateBack.js';
import { getProcessMessage } from '../../hooks/useProcessMessage.js';
import { useTokenBalance } from '../../hooks/useTokenBalance.js';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
import { useFieldActions } from '../../stores/form/useFieldActions.js';
import { RouteExecutionStatus, } from '../../stores/routes/types.js';
import { getSourceTxHash } from '../../stores/routes/utils.js';
import { hasEnumFlag } from '../../utils/enum.js';
import { formatTokenAmount } from '../../utils/format.js';
import { navigationRoutes } from '../../utils/navigationRoutes.js';
import { shortenAddress } from '../../utils/wallet.js';
import { CenterContainer, IconCircle, MessageSkeletonContainer, } from './StatusBottomSheet.style.js';
const MessageSkeleton = () => (_jsxs(MessageSkeletonContainer, { children: [_jsx(Skeleton, { height: 24, variant: "text", width: "92%" }), _jsx(Skeleton, { height: 24, variant: "text", width: "56%" })] }));
export const StatusBottomSheet = ({ status, route, }) => {
    const ref = useRef(null);
    const onClose = useCallback(() => {
        ref.current?.close();
    }, []);
    useEffect(() => {
        const hasSuccessFlag = hasEnumFlag(status, RouteExecutionStatus.Done);
        const hasFailedFlag = hasEnumFlag(status, RouteExecutionStatus.Failed);
        if ((hasSuccessFlag || hasFailedFlag) && !ref.current?.isOpen()) {
            ref.current?.open();
        }
    }, [status]);
    return (_jsx(BottomSheet, { ref: ref, children: _jsx(StatusBottomSheetContent, { status: status, route: route, onClose: onClose }) }));
};
export const StatusBottomSheetContent = ({ status, route, onClose }) => {
    const { t } = useTranslation();
    const { navigateBack, navigate } = useNavigateBack();
    const queryClient = useQueryClient();
    const { setFieldValue } = useFieldActions();
    const { subvariant, contractSecondaryComponent, contractCompactComponent } = useWidgetConfig();
    const { getChainById } = useAvailableChains();
    const ref = useRef();
    useSetContentHeight(ref);
    const toToken = {
        ...(route.steps.at(-1)?.execution?.toToken ?? route.toToken),
        amount: BigInt(route.steps.at(-1)?.execution?.toAmount ??
            route.steps.at(-1)?.estimate.toAmount ??
            route.toAmount),
    };
    const toChain = getChainById(toToken.chainId);
    const { token, refetch, refetchNewBalance, refetchAllBalances } = useTokenBalance(route.toAddress, toToken, toChain);
    const invalidateQueries = () => {
        refetchAllBalances();
        setFieldValue('fromAmount', '');
        setFieldValue('toAmount', '');
        queryClient.invalidateQueries({ queryKey: ['transaction-history'] });
    };
    const handleDone = () => {
        invalidateQueries();
        navigateBack();
    };
    const handlePartialDone = () => {
        invalidateQueries();
        if (toToken.chainId !== route.toToken.chainId &&
            toToken.address !== route.toToken.address) {
            setFieldValue('fromAmount', formatTokenAmount(toToken.amount, toToken.decimals), { isTouched: true });
            setFieldValue('fromChain', toToken.chainId, { isTouched: true });
            setFieldValue('fromToken', toToken.address, { isTouched: true });
            setFieldValue('toChain', route.toToken.chainId, {
                isTouched: true,
            });
            setFieldValue('toToken', route.toToken.address, {
                isTouched: true,
            });
        }
        navigateBack();
    };
    const handleClose = () => {
        invalidateQueries();
        onClose();
    };
    const handleSeeDetails = () => {
        handleClose();
        const transactionHash = getSourceTxHash(route);
        navigate(navigationRoutes.transactionDetails, {
            state: {
                routeId: route.id,
                transactionHash,
            },
            replace: true,
        });
    };
    const transactionType = route.fromChainId === route.toChainId ? 'swap' : 'bridge';
    let title;
    let primaryMessage;
    let secondaryMessage;
    let handlePrimaryButton = handleDone;
    switch (status) {
        case RouteExecutionStatus.Done: {
            title =
                subvariant === 'custom'
                    ? t('success.title.purchaseSuccessful')
                    : t(`success.title.${transactionType}Successful`);
            if (token) {
                primaryMessage = t('success.message.exchangeSuccessful', {
                    amount: formatTokenAmount(token.amount, token.decimals),
                    tokenSymbol: token.symbol,
                    chainName: toChain?.name,
                    walletAddress: shortenAddress(route.toAddress),
                });
            }
            handlePrimaryButton = handleDone;
            break;
        }
        case RouteExecutionStatus.Done | RouteExecutionStatus.Partial: {
            title = t(`success.title.${transactionType}PartiallySuccessful`);
            primaryMessage = t('success.message.exchangePartiallySuccessful', {
                tool: route.steps.at(-1)?.toolDetails.name,
                tokenSymbol: route.steps.at(-1)?.action.toToken.symbol,
            });
            if (token) {
                secondaryMessage = t('success.message.exchangeSuccessful', {
                    amount: formatTokenAmount(token.amount, token.decimals),
                    tokenSymbol: token.symbol,
                    chainName: toChain?.name,
                    walletAddress: shortenAddress(route.toAddress),
                });
            }
            handlePrimaryButton = handlePartialDone;
            break;
        }
        case RouteExecutionStatus.Done | RouteExecutionStatus.Refunded: {
            title = t('success.title.refundIssued');
            primaryMessage = t('success.message.exchangePartiallySuccessful', {
                tool: route.steps.at(-1)?.toolDetails.name,
                tokenSymbol: route.steps.at(-1)?.action.toToken.symbol,
            });
            if (token) {
                secondaryMessage = t('success.message.exchangeSuccessful', {
                    amount: formatTokenAmount(token.amount, token.decimals),
                    tokenSymbol: token.symbol,
                    chainName: toChain?.name,
                    walletAddress: shortenAddress(route.toAddress),
                });
            }
            break;
        }
        case RouteExecutionStatus.Failed: {
            const step = route.steps.find((step) => step.execution?.status === 'FAILED');
            const process = step?.execution?.process.find((process) => process.status === 'FAILED');
            if (!step || !process) {
                break;
            }
            const processMessage = getProcessMessage(t, getChainById, step, process);
            title = processMessage.title;
            primaryMessage = processMessage.message;
            handlePrimaryButton = handleClose;
            break;
        }
        default:
            break;
    }
    useEffect(() => {
        const hasSuccessFlag = hasEnumFlag(status, RouteExecutionStatus.Done);
        if (hasSuccessFlag) {
            refetchNewBalance();
            refetch();
        }
    }, [refetch, refetchNewBalance, status]);
    const showContractComponent = subvariant === 'custom' &&
        hasEnumFlag(status, RouteExecutionStatus.Done) &&
        (contractCompactComponent || contractSecondaryComponent);
    return (_jsxs(Box, { p: 3, ref: ref, children: [!showContractComponent ? (_jsx(CenterContainer, { children: _jsxs(IconCircle, { status: status, mb: 1, children: [status === RouteExecutionStatus.Idle ? (_jsx(InfoRounded, { color: "primary" })) : null, status === RouteExecutionStatus.Done ? (_jsx(Done, { color: "success" })) : null, hasEnumFlag(status, RouteExecutionStatus.Partial) ||
                            hasEnumFlag(status, RouteExecutionStatus.Refunded) ? (_jsx(WarningRounded, { color: "warning" })) : null, hasEnumFlag(status, RouteExecutionStatus.Failed) ? (_jsx(ErrorRounded, { color: "error" })) : null] }) })) : null, _jsx(CenterContainer, { children: _jsx(Typography, { py: 1, fontSize: 18, fontWeight: 700, children: title }) }), showContractComponent ? (contractCompactComponent || contractSecondaryComponent) : (_jsx(CenterContainer, { children: hasEnumFlag(status, RouteExecutionStatus.Done) ? (_jsx(Token, { token: toToken, py: 1, disableDescription: true })) : null })), !showContractComponent ? (primaryMessage ? (_jsx(Typography, { py: 1, children: primaryMessage })) : (_jsx(MessageSkeleton, {}))) : null, secondaryMessage ? (_jsx(Typography, { py: 1, children: secondaryMessage })) : null, _jsx(Box, { mt: 2, children: _jsxs(Button, { variant: "contained", fullWidth: true, onClick: handlePrimaryButton, children: [status === RouteExecutionStatus.Idle ? t('button.ok') : null, hasEnumFlag(status, RouteExecutionStatus.Done)
                            ? t('button.done')
                            : null, status === RouteExecutionStatus.Failed
                            ? t('button.seeDetails')
                            : null] }) }), hasEnumFlag(status, RouteExecutionStatus.Done) ? (_jsx(Box, { mt: 2, children: _jsx(Button, { variant: "text", onClick: handleSeeDetails, fullWidth: true, children: t('button.seeDetails') }) })) : null] }));
};
//# sourceMappingURL=StatusBottomSheet.js.map