import { formatUnits } from 'viem';
const buildProcessFromTxHistory = (tx) => {
    const sending = tx.sending;
    const receiving = tx.receiving;
    if (!sending.token?.chainId || !receiving.token?.chainId) {
        return [];
    }
    const processStatus = tx.status === 'DONE' ? 'DONE' : 'FAILED';
    const substatus = processStatus === 'FAILED' ? 'UNKNOWN_ERROR' : 'COMPLETED';
    if (sending.chainId === receiving.chainId) {
        return [
            {
                type: 'SWAP', // operations on same chain will be swaps
                startedAt: sending.timestamp ?? Date.now(),
                message: '',
                status: processStatus,
                txHash: sending.txHash,
                txLink: sending.txLink,
                doneAt: receiving.timestamp ?? Date.now(),
                substatus,
                substatusMessage: '',
            },
        ];
    }
    const process = [
        {
            type: 'CROSS_CHAIN', // first step of bridging, ignoring the approvals
            startedAt: sending.timestamp ?? Date.now(),
            message: '',
            status: processStatus, // can be FAILED
            txHash: sending.txHash,
            txLink: sending.txLink,
            doneAt: sending.timestamp,
        },
        {
            type: 'RECEIVING_CHAIN', // final step of bridging, post swaps
            startedAt: receiving.timestamp ?? Date.now(),
            message: '',
            status: processStatus,
            substatus,
            substatusMessage: '',
            doneAt: receiving.timestamp ?? Date.now(),
            txHash: receiving.txHash,
            txLink: receiving.txLink,
        },
    ];
    return process;
};
export const buildRouteFromTxHistory = (tx, tools) => {
    const sending = tx.sending;
    const receiving = tx.receiving;
    if (!sending.token?.chainId || !receiving.token?.chainId) {
        return;
    }
    const selectedBridge = tools?.bridges.find((bridge) => bridge.key === tx.tool);
    const selectedExchange = tools?.exchanges.find((exchange) => exchange.key === tx.tool);
    const usedTool = {
        key: tx.tool,
        name: selectedBridge?.name ?? selectedExchange?.name ?? tx.tool,
        logoURI: selectedBridge?.logoURI ?? selectedExchange?.logoURI ?? '',
    };
    const fromToken = {
        ...sending.token,
        amount: BigInt(sending.amount ?? 0),
        priceUSD: sending.amountUSD ?? '0',
        symbol: sending.token?.symbol ?? '',
        decimals: sending.token?.decimals ?? 0,
        name: sending.token?.name ?? '',
        chainId: sending.token?.chainId,
    };
    const toToken = {
        ...receiving.token,
        amount: BigInt(receiving.amount ?? 0),
        priceUSD: receiving.amountUSD ?? '0',
        symbol: receiving.token?.symbol ?? '',
        decimals: receiving.token?.decimals ?? 0,
        name: receiving.token?.name ?? '',
        chainId: receiving.token?.chainId,
    };
    const sendingValue = sending.value ? BigInt(sending.value) : 0n;
    const sendingFeeAmount = sending.gasToken.address === sending.token.address && sending.amount
        ? sendingValue - BigInt(sending.amount)
        : sendingValue;
    const sendingFeeAmountUsd = sending.gasToken.priceUSD && sendingFeeAmount
        ? parseFloat(formatUnits(sendingFeeAmount, sending.gasToken.decimals)) *
            parseFloat(sending.gasToken.priceUSD)
        : 0;
    const feeCosts = sendingValue
        ? [
            {
                amount: sendingFeeAmount.toString(),
                amountUSD: sendingFeeAmountUsd.toFixed(2),
                token: sending.gasToken,
                included: false,
                // Not used
                description: '',
                name: '',
                percentage: '',
            },
        ]
        : undefined;
    const routeExecution = {
        status: 1,
        route: {
            id: tx.transactionId,
            fromAddress: tx.fromAddress,
            toAddress: tx.toAddress,
            fromChainId: sending.chainId,
            fromAmount: sending.amount ?? '',
            fromAmountUSD: sending.amountUSD ?? '',
            toAmount: receiving.amount ?? '',
            toAmountMin: receiving.amount ?? '',
            toAmountUSD: receiving.amountUSD ?? '',
            toChainId: receiving.chainId,
            fromToken,
            toToken,
            steps: [
                {
                    id: '',
                    type: 'lifi',
                    tool: tx.tool,
                    toolDetails: usedTool,
                    action: {
                        fromToken: sending.token,
                        fromAmount: sending.amount ?? '',
                        fromChainId: sending.chainId,
                        fromAddress: tx.fromAddress,
                        toToken: receiving.token,
                        toChainId: receiving.chainId,
                        toAddress: tx.toAddress,
                        slippage: 0,
                    },
                    estimate: {
                        tool: tx.tool,
                        approvalAddress: '',
                        fromAmount: sending.amount ?? '',
                        fromAmountUSD: sending.amountUSD ?? '',
                        toAmountMin: receiving.amount ?? '',
                        toAmount: receiving.amount ?? '',
                        toAmountUSD: receiving.amountUSD ?? '',
                        executionDuration: 30,
                    },
                    includedSteps: [
                        {
                            id: '',
                            type: sending.chainId === receiving.chainId ? 'swap' : 'cross',
                            action: {
                                fromChainId: sending.chainId,
                                fromAmount: sending.amount ?? '',
                                fromToken: sending.token,
                                toChainId: receiving.chainId,
                                toToken: receiving.token,
                                slippage: 0,
                                fromAddress: tx.fromAddress,
                                toAddress: tx.toAddress,
                            },
                            estimate: {
                                tool: tx.tool,
                                fromAmount: sending.amount ?? '',
                                toAmount: receiving.amount ?? '',
                                toAmountMin: receiving.amount ?? '',
                                approvalAddress: '',
                                executionDuration: 0,
                            },
                            tool: tx.tool,
                            toolDetails: usedTool,
                        },
                    ],
                    integrator: '',
                    execution: {
                        status: 'DONE', // can be FAILED
                        process: buildProcessFromTxHistory(tx),
                        fromAmount: sending.amount,
                        toAmount: receiving.amount,
                        toToken: receiving.token,
                        gasCosts: [
                            {
                                amount: sending.gasAmount,
                                amountUSD: sending.gasAmountUSD,
                                token: sending.gasToken,
                                estimate: '0',
                                limit: '0',
                                price: '0',
                                type: 'SEND',
                            },
                        ],
                        feeCosts,
                    },
                },
            ],
            insurance: {
                state: 'NOT_INSURABLE',
                feeAmountUsd: '0',
            },
        },
    };
    return routeExecution;
};
//# sourceMappingURL=converters.js.map