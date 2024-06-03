export const getGasCostsBreakdown = (route) => {
    return Object.values(route.steps.reduce((groupedGasCosts, step) => {
        if (step.estimate.gasCosts?.length) {
            const { token, amount: gasCostAmount, amountUSD: gasCostAmountUSD, } = getStepFeeCostsBreakdown(step.estimate.gasCosts);
            const groupedGasCost = groupedGasCosts[token.chainId];
            const amount = groupedGasCost
                ? groupedGasCost.amount + gasCostAmount
                : gasCostAmount;
            const amountUSD = groupedGasCost
                ? groupedGasCost.amountUSD + gasCostAmountUSD
                : gasCostAmountUSD;
            groupedGasCosts[token.chainId] = {
                amount,
                amountUSD,
                token,
            };
            return groupedGasCosts;
        }
        return groupedGasCosts;
    }, {}));
};
export const getFeeCostsBreakdown = (route, included) => {
    return Object.values(route.steps.reduce((groupedFeeCosts, step) => {
        let feeCosts = step.estimate.feeCosts;
        if (typeof included === 'boolean') {
            feeCosts = feeCosts?.filter((feeCost) => feeCost.included === included);
        }
        if (feeCosts?.length) {
            const { token, amount: feeCostAmount, amountUSD: feeCostAmountUSD, } = getStepFeeCostsBreakdown(feeCosts);
            const groupedFeeCost = groupedFeeCosts[token.chainId];
            const amount = groupedFeeCost
                ? groupedFeeCost.amount + feeCostAmount
                : feeCostAmount;
            const amountUSD = groupedFeeCost
                ? groupedFeeCost.amountUSD + feeCostAmountUSD
                : feeCostAmountUSD;
            groupedFeeCosts[token.chainId] = {
                amount,
                amountUSD,
                token,
            };
            return groupedFeeCosts;
        }
        return groupedFeeCosts;
    }, {}));
};
export const getStepFeeCostsBreakdown = (feeCosts) => {
    const token = feeCosts[0].token;
    const amount = feeCosts.reduce((amount, feeCost) => amount + BigInt(feeCost.amount || 0), 0n);
    const amountUSD = feeCosts.reduce((amount, feeCost) => amount + parseFloat(feeCost.amountUSD || '0'), 0);
    return {
        amount,
        amountUSD,
        token,
    };
};
//# sourceMappingURL=fees.js.map