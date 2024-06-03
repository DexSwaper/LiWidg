import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from 'react';
import { StepDivider } from '../../components/StepDivider/StepDivider.js';
import { Step } from './Step.js';
export const getStepList = (route, subvariant) => route?.steps.map((step, index, steps) => {
    const lastIndex = steps.length - 1;
    const fromToken = index === 0
        ? { ...step.action.fromToken, amount: BigInt(step.action.fromAmount) }
        : undefined;
    const toToken = index === lastIndex
        ? {
            ...(step.execution?.toToken ?? step.action?.toToken),
            amount: step.execution?.toAmount
                ? BigInt(step.execution.toAmount)
                : subvariant === 'custom'
                    ? BigInt(route.toAmount)
                    : BigInt(step.estimate.toAmount),
        }
        : undefined;
    const toAddress = index === lastIndex && route.fromAddress !== route.toAddress
        ? route.toAddress
        : undefined;
    return (_jsxs(Fragment, { children: [_jsx(Step, { step: step, fromToken: fromToken, toToken: toToken, toAddress: toAddress }), steps.length > 1 && index !== steps.length - 1 ? (_jsx(StepDivider, {})) : null] }, step.id));
});
//# sourceMappingURL=StepList.js.map